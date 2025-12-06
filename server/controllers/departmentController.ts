import { Request, Response } from 'express';
import Department from '../models/Department';
import UserRole from '../models/UserRole';
import { asyncHandler } from '../middleware/errorMiddleware';

// Get all departments
export const getAllDepartments = asyncHandler(async (req: Request, res: Response) => {
  const { isActive, page = 1, limit = 20 } = req.query;

  const filter: any = {};
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const skip = (Number(page) - 1) * Number(limit);

  const departments = await Department.find(filter)
    .populate('hodId', 'name email')
    .skip(skip)
    .limit(Number(limit))
    .sort({ name: 1 });

  const total = await Department.countDocuments(filter);

  res.json({
    success: true,
    data: departments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// Get department by ID
export const getDepartmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const department = await Department.findById(id).populate('hodId', 'name email');

  if (!department) {
    res.status(404).json({ success: false, message: 'Department not found' });
    return;
  }

  // Get department statistics
  const employeeCount = await UserRole.countDocuments({
    departmentId: id,
    isActive: true,
  });

  res.json({
    success: true,
    data: {
      ...department.toObject(),
      employeeCount,
    },
  });
});

// Create department
export const createDepartment = asyncHandler(async (req: Request, res: Response) => {
  const { name, code, description, hodId, budget, metadata } = req.body;

  // Check if department code already exists
  const existingDept = await Department.findOne({ code });
  if (existingDept) {
    res.status(400).json({ 
      success: false, 
      message: 'Department code already exists' 
    });
    return;
  }

  const department = new Department({
    name,
    code,
    description,
    hodId,
    budget,
    metadata,
    isActive: true,
  });

  await department.save();

  res.status(201).json({
    success: true,
    message: 'Department created successfully',
    data: department,
  });
});

// Update department
export const updateDepartment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, hodId, budget, metadata, isActive } = req.body;

  const department = await Department.findById(id);

  if (!department) {
    res.status(404).json({ success: false, message: 'Department not found' });
    return;
  }

  if (name !== undefined) department.name = name;
  if (description !== undefined) department.description = description;
  if (hodId !== undefined) department.hodId = hodId;
  if (budget !== undefined) department.budget = budget;
  if (metadata !== undefined) department.metadata = metadata;
  if (isActive !== undefined) department.isActive = isActive;

  await department.save();

  res.json({
    success: true,
    message: 'Department updated successfully',
    data: department,
  });
});

// Delete department
export const deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if department has active employees
  const activeEmployees = await UserRole.countDocuments({
    departmentId: id,
    isActive: true,
  });

  if (activeEmployees > 0) {
    res.status(400).json({ 
      success: false, 
      message: `Cannot delete department with ${activeEmployees} active employees` 
    });
    return;
  }

  const department = await Department.findByIdAndDelete(id);

  if (!department) {
    res.status(404).json({ success: false, message: 'Department not found' });
    return;
  }

  res.json({
    success: true,
    message: 'Department deleted successfully',
  });
});

// Get department employees
export const getDepartmentEmployees = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const employees = await UserRole.find({
    departmentId: id,
    isActive: true,
  })
    .populate('userId', 'name email')
    .skip(skip)
    .limit(Number(limit))
    .sort({ assignedAt: -1 });

  const total = await UserRole.countDocuments({
    departmentId: id,
    isActive: true,
  });

  res.json({
    success: true,
    data: employees,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// Update department budget
export const updateDepartmentBudget = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { total, allocated, spent } = req.body;

  const department = await Department.findById(id);

  if (!department) {
    res.status(404).json({ success: false, message: 'Department not found' });
    return;
  }

  if (total !== undefined) department.budget!.total = total;
  if (allocated !== undefined) department.budget!.allocated = allocated;
  if (spent !== undefined) department.budget!.spent = spent;

  await department.save();

  res.json({
    success: true,
    message: 'Department budget updated successfully',
    data: department,
  });
});
