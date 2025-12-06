import { Request, Response } from 'express';
import Project from '../models/Project';
import mongoose from 'mongoose';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { department, status, priority, page = 1, limit = 10, search } = req.query;
    
    const query: any = {};
    if (department) query.departmentId = department;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Project.countDocuments(query);
    
    const projects = await Project.find(query)
      .populate('departmentId', 'name')
      .populate('managerId', 'name email')
      .populate('teamMembers', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: projects,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid project ID' });
    }

    const project = await Project.findById(id)
      .populate('departmentId', 'name')
      .populate('managerId', 'name email')
      .populate('teamMembers', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    projectData.managerId = req.userId;

    const project = await Project.create(projectData);
    const populatedProject = await Project.findById(project._id)
      .populate('departmentId', 'name')
      .populate('managerId', 'name email')
      .populate('teamMembers', 'name email');

    res.status(201).json({
      success: true,
      data: populatedProject
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid project ID' });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('departmentId', 'name')
      .populate('managerId', 'name email')
      .populate('teamMembers', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid project ID' });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
};

export const updateProjectProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid project ID' });
    }

    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      return res.status(400).json({ success: false, error: 'Progress must be between 0 and 100' });
    }

    const updateData: any = { progress };
    if (progress === 100) {
      updateData.status = 'completed';
      updateData.completionDate = new Date();
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ success: false, error: 'Failed to update progress' });
  }
};
