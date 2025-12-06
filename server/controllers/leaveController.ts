import { Request, Response } from 'express';
import LeaveRequest from '../models/LeaveRequest';
import mongoose from 'mongoose';

export const getAllLeaveRequests = async (req: Request, res: Response) => {
  try {
    const { employee, status, type, page = 1, limit = 10 } = req.query;
    
    const query: any = {};
    if (employee) query.employeeId = employee;
    if (status) query.status = status;
    if (type) query.type = type;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await LeaveRequest.countDocuments(query);
    
    const leaveRequests = await LeaveRequest.find(query)
      .populate('employeeId', 'userId employeeId position')
      .populate({
        path: 'employeeId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate('approvedBy', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leaveRequests,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Get leave requests error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch leave requests' });
  }
};

export const getLeaveRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid leave request ID' });
    }

    const leaveRequest = await LeaveRequest.findById(id)
      .populate('employeeId', 'userId employeeId position')
      .populate({
        path: 'employeeId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate('approvedBy', 'name email');

    if (!leaveRequest) {
      return res.status(404).json({ success: false, error: 'Leave request not found' });
    }

    res.json({ success: true, data: leaveRequest });
  } catch (error) {
    console.error('Get leave request error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch leave request' });
  }
};

export const createLeaveRequest = async (req: Request, res: Response) => {
  try {
    const leaveData = req.body;

    // Validate dates
    if (new Date(leaveData.startDate) > new Date(leaveData.endDate)) {
      return res.status(400).json({ 
        success: false, 
        error: 'End date must be after start date' 
      });
    }

    const leaveRequest = await LeaveRequest.create(leaveData);
    const populatedLeave = await LeaveRequest.findById(leaveRequest._id)
      .populate('employeeId', 'userId employeeId position')
      .populate({
        path: 'employeeId',
        populate: { path: 'userId', select: 'name email' }
      });

    res.status(201).json({
      success: true,
      data: populatedLeave
    });
  } catch (error) {
    console.error('Create leave request error:', error);
    res.status(500).json({ success: false, error: 'Failed to create leave request' });
  }
};

export const approveLeaveRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid leave request ID' });
    }

    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      id,
      { 
        $set: { 
          status: 'approved',
          approvedBy: req.userId,
          approvedAt: new Date()
        }
      },
      { new: true }
    )
      .populate('employeeId', 'userId employeeId position')
      .populate({
        path: 'employeeId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate('approvedBy', 'name email');

    if (!leaveRequest) {
      return res.status(404).json({ success: false, error: 'Leave request not found' });
    }

    res.json({ success: true, data: leaveRequest });
  } catch (error) {
    console.error('Approve leave error:', error);
    res.status(500).json({ success: false, error: 'Failed to approve leave request' });
  }
};

export const rejectLeaveRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid leave request ID' });
    }

    if (!rejectionReason) {
      return res.status(400).json({ 
        success: false, 
        error: 'Rejection reason is required' 
      });
    }

    const leaveRequest = await LeaveRequest.findByIdAndUpdate(
      id,
      { 
        $set: { 
          status: 'rejected',
          approvedBy: req.userId,
          approvedAt: new Date(),
          rejectionReason
        }
      },
      { new: true }
    )
      .populate('employeeId', 'userId employeeId position')
      .populate({
        path: 'employeeId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate('approvedBy', 'name email');

    if (!leaveRequest) {
      return res.status(404).json({ success: false, error: 'Leave request not found' });
    }

    res.json({ success: true, data: leaveRequest });
  } catch (error) {
    console.error('Reject leave error:', error);
    res.status(500).json({ success: false, error: 'Failed to reject leave request' });
  }
};

export const deleteLeaveRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid leave request ID' });
    }

    const leaveRequest = await LeaveRequest.findByIdAndDelete(id);

    if (!leaveRequest) {
      return res.status(404).json({ success: false, error: 'Leave request not found' });
    }

    res.json({ success: true, message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error('Delete leave error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete leave request' });
  }
};
