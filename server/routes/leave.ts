import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import LeaveRequest from '../models/LeaveRequest';

const router = express.Router();

// Get all leave requests with filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, employeeId, page = 1, limit = 20 } = req.query;
    
    const query: any = {};
    if (status) query.status = status;
    if (employeeId) query.employeeId = employeeId;
    
    const total = await LeaveRequest.countDocuments(query);
    const leaves = await LeaveRequest.find(query)
      .populate('employeeId', 'name email position departmentId')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    
    res.json({ 
      success: true, 
      data: { 
        leaves, 
        total, 
        page: Number(page), 
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      } 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch leave requests' 
    });
  }
});

// Get single leave request
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id)
      .populate('employeeId', 'name email position departmentId')
      .populate('approvedBy', 'name email');
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found'
      });
    }
    
    res.json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch leave request' 
    });
  }
});

// Create leave request
router.post('/', authMiddleware, async (req, res) => {
  try {
    const leaveData = req.body;
    
    // Validation: end date must be after start date
    if (new Date(leaveData.endDate) <= new Date(leaveData.startDate)) {
      return res.status(400).json({
        success: false,
        error: 'End date must be after start date'
      });
    }
    
    const leave = new LeaveRequest(leaveData);
    await leave.save();
    
    await leave.populate('employeeId', 'name email position departmentId');
    
    res.status(201).json({
      success: true,
      data: leave,
      message: 'Leave request submitted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create leave request' 
    });
  }
});

// Update leave status (approve/reject)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be approved or rejected'
      });
    }
    
    const updateData: any = { 
      status,
      approvedBy: (req as any).user._id,
      approvedAt: new Date()
    };
    
    if (status === 'rejected' && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }
    
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate('employeeId', 'name email position departmentId')
      .populate('approvedBy', 'name email');
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found'
      });
    }
    
    res.json({ 
      success: true, 
      data: leave,
      message: `Leave request ${status} successfully` 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update leave status' 
    });
  }
});

// Delete leave request
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndDelete(req.params.id);
    
    if (!leave) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found'
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Leave request deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete leave request' 
    });
  }
});

export default router;
