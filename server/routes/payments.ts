import express from 'express';
import Payment from '../models/Payment';
import Notification from '../models/Notification';

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const { userId, applicationId, status, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (userId) query.userId = userId;
    if (applicationId) query.applicationId = applicationId;
    if (status) query.status = status;

    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate('userId', 'name email')
      .populate('applicationId');

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
});

// Get single payment
router.get('/:id', async (req, res) => {
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
});

// Create payment
router.post('/', async (req, res) => {
  try {
    const { userId, applicationId, amount, currency, paymentMethod, paymentData } = req.body;

    const payment = new Payment({
      userId,
      applicationId,
      amount,
      currency: currency || 'USD',
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
});

// Update payment status
router.patch('/:id/status', async (req, res) => {
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

    const payment = await Payment.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
    }

    // Create notification
    if (payment.userId) {
      await Notification.create({
        userId: payment.userId,
        type: status === 'completed' ? 'payment_received' : 'payment_failed',
        title: status === 'completed' ? 'Payment Successful' : 'Payment Failed',
        message:
          status === 'completed'
            ? `Payment of ${payment.amount} ${payment.currency} received successfully`
            : 'Payment processing failed. Please try again.',
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
      error: error instanceof Error ? error.message : 'Failed to update payment',
    });
  }
});

// Get payment statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query: any = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate as string);
      if (endDate) query.createdAt.$lte = new Date(endDate as string);
    }

    const stats = await Payment.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const totalRevenue = await Payment.aggregate([
      { $match: { ...query, status: 'completed' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        statusBreakdown: stats,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment statistics',
    });
  }
});

export default router;
