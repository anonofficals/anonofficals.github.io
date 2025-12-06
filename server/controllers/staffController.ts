import { Request, Response } from 'express';
import Employee from '../models/Employee';
import User from '../models/User';
import mongoose from 'mongoose';

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const { department, status, position, search, page = 1, limit = 10 } = req.query;
    
    const query: any = {};
    if (department) query.departmentId = department;
    if (status) query.status = status;
    if (position) query.position = { $regex: position, $options: 'i' };
    
    if (search) {
      const users = await User.find({
        name: { $regex: search, $options: 'i' }
      }).select('_id');
      
      query.$or = [
        { userId: { $in: users.map(u => u._id) } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Employee.countDocuments(query);
    
    const staff = await Employee.find(query)
      .populate('userId', 'name email')
      .populate('departmentId', 'name')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: staff,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch staff' });
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid staff ID' });
    }

    const staff = await Employee.findById(id)
      .populate('userId', 'name email')
      .populate('departmentId', 'name');

    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }

    res.json({ success: true, data: staff });
  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch staff member' });
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staffData = req.body;
    
    // Check if user exists
    const user = await User.findById(staffData.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Generate employee ID if not provided
    if (!staffData.employeeId) {
      const count = await Employee.countDocuments();
      staffData.employeeId = `EMP${String(count + 1).padStart(5, '0')}`;
    }

    const staff = await Employee.create(staffData);
    const populatedStaff = await Employee.findById(staff._id)
      .populate('userId', 'name email')
      .populate('departmentId', 'name');

    res.status(201).json({
      success: true,
      data: populatedStaff
    });
  } catch (error) {
    console.error('Create staff error:', error);
    res.status(500).json({ success: false, error: 'Failed to create staff member' });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid staff ID' });
    }

    const staff = await Employee.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('userId', 'name email')
      .populate('departmentId', 'name');

    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }

    res.json({ success: true, data: staff });
  } catch (error) {
    console.error('Update staff error:', error);
    res.status(500).json({ success: false, error: 'Failed to update staff member' });
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid staff ID' });
    }

    const staff = await Employee.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }

    res.json({ success: true, message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Delete staff error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete staff member' });
  }
};

export const updateStaffPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comments } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid staff ID' });
    }

    const review = {
      date: new Date(),
      rating,
      comments,
      reviewerId: req.userId
    };

    const staff = await Employee.findByIdAndUpdate(
      id,
      { 
        $set: { 'performance.rating': rating },
        $push: { 'performance.reviews': review }
      },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }

    res.json({ success: true, data: staff });
  } catch (error) {
    console.error('Update performance error:', error);
    res.status(500).json({ success: false, error: 'Failed to update performance' });
  }
};
