import { Request, Response } from 'express';
import Payment from '../models/Payment';
import Notification from '../models/Notification';

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const { userId, applicationId, status, page = 1, limit = 20 } = req.query;

    const query: any = {};
    if (userId) query.userId = userId;
    if (applicationId) query.applicationId = applicationId;
    if (status) query.status = status;

    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .populate('userId', 'name email')
      .populate('applicationId')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      success: true,
      data: {
        payments,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payments',
    });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('applicationId');

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment',
    });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { userId, applicationId, amount, currency, paymentMethod, paymentData } = req.body;

    const payment = new Payment({
      userId,
      applicationId,
      amount,
      currency,
      paymentMethod,
      paymentData,
      status: 'pending',
    });

    await payment.save();

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment initiated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create payment',
    });
  }
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { status, transactionId, paymentGateway } = req.body;

    const updateData: any = {
      status,
      transactionId,
      paymentGateway,
    };

    if (status === 'completed') {
      updateData.paidAt = new Date();
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('userId', 'name email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
    }

    // Create notification for user
    if (payment.userId) {
      await Notification.create({
        userId: payment.userId,
        type: status === 'completed' ? 'payment_received' : 'payment_failed',
        title: status === 'completed' ? 'Payment Received' : 'Payment Failed',
        message: status === 'completed'
          ? `Your payment of ${payment.amount} ${payment.currency} has been processed successfully.`
          : `Your payment of ${payment.amount} ${payment.currency} has failed. Please try again.`,
        relatedTo: {
          model: 'Payment',
          id: payment._id,
        },
      });
    }

    res.json({
      success: true,
      data: payment,
      message: 'Payment status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update payment status',
    });
  }
};

export const getPaymentStats = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter: any = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) dateFilter.createdAt.$gte = new Date(startDate as string);
      if (endDate) dateFilter.createdAt.$lte = new Date(endDate as string);
    }

    const [statusBreakdown, revenueData] = await Promise.all([
      Payment.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            total: { $sum: '$amount' },
          },
        },
      ]),
      Payment.aggregate([
        { $match: { ...dateFilter, status: 'completed' } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const stats = {
      byStatus: statusBreakdown.reduce((acc: any, item: any) => {
        acc[item._id] = {
          count: item.count,
          total: item.total,
        };
        return acc;
      }, {}),
      totalRevenue: revenueData[0]?.totalRevenue || 0,
      completedPayments: revenueData[0]?.count || 0,
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment statistics',
    });
  }
};
