import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import Employee from '../models/Employee';

const router = express.Router();

// Get all staff with filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { department, status, position, search, page = 1, limit = 10 } = req.query;
    
    const query: any = {};
    if (department) query.departmentId = department;
    if (status) query.status = status;
    if (position) query.position = position;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } }
      ];
    }
    
    const total = await Employee.countDocuments(query);
    const staff = await Employee.find(query)
      .populate('userId', 'name email')
      .populate('departmentId', 'name code')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    
    res.json({
      success: true,
      data: {
        staff,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch staff' });
  }
});

// Get staff by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const staff = await Employee.findById(id)
      .populate('userId', 'name email')
      .populate('departmentId', 'name code');
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch staff member' });
  }
});

// Create staff member
router.post('/', authMiddleware, async (req, res) => {
  try {
    const staffData = req.body;
    
    // Generate employee ID if not provided
    if (!staffData.employeeId) {
      const count = await Employee.countDocuments();
      staffData.employeeId = `EMP${String(count + 1).padStart(5, '0')}`;
    }
    
    const employee = new Employee(staffData);
    await employee.save();
    
    await employee.populate('userId', 'name email');
    await employee.populate('departmentId', 'name code');
    
    res.status(201).json({
      success: true,
      data: employee,
      message: 'Staff member created successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create staff member' 
    });
  }
});

// Update staff member
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const employee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('userId', 'name email')
      .populate('departmentId', 'name code');
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.json({
      success: true,
      data: employee,
      message: 'Staff member updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update staff member' 
    });
  }
});

// Delete staff member
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    const employee = await Employee.findByIdAndDelete(id);
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete staff member' 
    });
  }
});

export default router;
