import { Request, Response } from 'express';
import Intern from '../models/Intern';
import mongoose from 'mongoose';

export const getAllInterns = async (req: Request, res: Response) => {
  try {
    const { department, status, page = 1, limit = 10, search } = req.query;
    
    const query: any = {};
    if (department) query.departmentId = department;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { university: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Intern.countDocuments(query);
    
    const interns = await Intern.find(query)
      .populate('departmentId', 'name')
      .populate('supervisorId', 'userId')
      .populate({
        path: 'supervisorId',
        populate: { path: 'userId', select: 'name email' }
      })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: interns,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Get interns error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch interns' });
  }
};

export const getInternById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid intern ID' });
    }

    const intern = await Intern.findById(id)
      .populate('departmentId', 'name')
      .populate('supervisorId', 'userId')
      .populate({
        path: 'supervisorId',
        populate: { path: 'userId', select: 'name email' }
      });

    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }

    res.json({ success: true, data: intern });
  } catch (error) {
    console.error('Get intern error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch intern' });
  }
};

export const createIntern = async (req: Request, res: Response) => {
  try {
    const internData = req.body;

    const intern = await Intern.create(internData);
    const populatedIntern = await Intern.findById(intern._id)
      .populate('departmentId', 'name')
      .populate('supervisorId', 'userId')
      .populate({
        path: 'supervisorId',
        populate: { path: 'userId', select: 'name email' }
      });

    res.status(201).json({
      success: true,
      data: populatedIntern
    });
  } catch (error) {
    console.error('Create intern error:', error);
    res.status(500).json({ success: false, error: 'Failed to create intern' });
  }
};

export const updateIntern = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid intern ID' });
    }

    const intern = await Intern.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('departmentId', 'name')
      .populate('supervisorId', 'userId')
      .populate({
        path: 'supervisorId',
        populate: { path: 'userId', select: 'name email' }
      });

    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }

    res.json({ success: true, data: intern });
  } catch (error) {
    console.error('Update intern error:', error);
    res.status(500).json({ success: false, error: 'Failed to update intern' });
  }
};

export const deleteIntern = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid intern ID' });
    }

    const intern = await Intern.findByIdAndDelete(id);

    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }

    res.json({ success: true, message: 'Intern deleted successfully' });
  } catch (error) {
    console.error('Delete intern error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete intern' });
  }
};

export const evaluateIntern = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, feedback } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid intern ID' });
    }

    const intern = await Intern.findByIdAndUpdate(
      id,
      { 
        $set: { 
          performance: {
            rating,
            feedback,
            evaluatedBy: req.userId,
            evaluatedAt: new Date()
          }
        }
      },
      { new: true }
    );

    if (!intern) {
      return res.status(404).json({ success: false, error: 'Intern not found' });
    }

    res.json({ success: true, data: intern });
  } catch (error) {
    console.error('Evaluate intern error:', error);
    res.status(500).json({ success: false, error: 'Failed to evaluate intern' });
  }
};
