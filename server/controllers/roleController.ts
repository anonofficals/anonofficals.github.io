import { Request, Response } from 'express';
import UserRole, { AppRole } from '../models/UserRole';
import RoleAssignment, { AssignmentAction } from '../models/RoleAssignment';
import User from '../models/User';
import { asyncHandler } from '../middleware/errorMiddleware';

// Assign role to user
export const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const { userId, role, departmentId, reason, expiresAt } = req.body;

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  // Check if role already exists and is active
  const existingRole = await UserRole.findOne({
    userId,
    role,
    isActive: true,
    ...(departmentId && { departmentId }),
  });

  if (existingRole) {
    res.status(400).json({ 
      success: false, 
      message: 'User already has this role' 
    });
    return;
  }

  // Create new role assignment
  const userRole = new UserRole({
    userId,
    role,
    departmentId,
    assignedBy: req.userId,
    assignedAt: new Date(),
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    isActive: true,
    metadata: {
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      reason,
    },
  });

  await userRole.save();

  // Create audit log
  const auditLog = new RoleAssignment({
    userId,
    role,
    action: AssignmentAction.ASSIGN,
    performedBy: req.userId,
    departmentId,
    reason,
    metadata: {
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    },
  });

  await auditLog.save();

  res.status(201).json({
    success: true,
    message: 'Role assigned successfully',
    data: userRole,
  });
});

// Revoke role from user
export const revokeRole = asyncHandler(async (req: Request, res: Response) => {
  const { userId, role, reason } = req.body;

  const userRole = await UserRole.findOne({
    userId,
    role,
    isActive: true,
  });

  if (!userRole) {
    res.status(404).json({ 
      success: false, 
      message: 'Role assignment not found' 
    });
    return;
  }

  userRole.isActive = false;
  await userRole.save();

  // Create audit log
  const auditLog = new RoleAssignment({
    userId,
    role,
    action: AssignmentAction.REVOKE,
    performedBy: req.userId,
    reason,
    metadata: {
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  await auditLog.save();

  res.json({
    success: true,
    message: 'Role revoked successfully',
  });
});

// Get user roles
export const getUserRoles = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const roles = await UserRole.find({
    userId,
    isActive: true,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  })
    .populate('departmentId', 'name code')
    .populate('assignedBy', 'name email')
    .sort({ assignedAt: -1 });

  res.json({
    success: true,
    data: roles,
  });
});

// Get all users with specific role
export const getUsersByRole = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.params;
  const { page = 1, limit = 20 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const roleAssignments = await UserRole.find({
    role: role as AppRole,
    isActive: true,
  })
    .populate('userId', 'name email')
    .populate('departmentId', 'name code')
    .skip(skip)
    .limit(Number(limit))
    .sort({ assignedAt: -1 });

  const total = await UserRole.countDocuments({
    role: role as AppRole,
    isActive: true,
  });

  res.json({
    success: true,
    data: roleAssignments,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// Bulk assign roles
export const bulkAssignRoles = asyncHandler(async (req: Request, res: Response) => {
  const { assignments, reason } = req.body;

  const results = {
    success: [] as any[],
    failed: [] as any[],
  };

  for (const assignment of assignments) {
    try {
      const { userId, role, departmentId } = assignment;

      // Check if role already exists
      const existingRole = await UserRole.findOne({
        userId,
        role,
        isActive: true,
      });

      if (existingRole) {
        results.failed.push({
          userId,
          role,
          reason: 'Role already assigned',
        });
        continue;
      }

      const userRole = new UserRole({
        userId,
        role,
        departmentId,
        assignedBy: req.userId,
        metadata: {
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          reason,
        },
      });

      await userRole.save();

      // Create audit log
      const auditLog = new RoleAssignment({
        userId,
        role,
        action: AssignmentAction.ASSIGN,
        performedBy: req.userId,
        departmentId,
        reason,
      });

      await auditLog.save();

      results.success.push({ userId, role });
    } catch (error: any) {
      results.failed.push({
        userId: assignment.userId,
        role: assignment.role,
        reason: error.message,
      });
    }
  }

  res.json({
    success: true,
    message: 'Bulk role assignment completed',
    data: results,
  });
});

// Update role assignment
export const updateRoleAssignment = asyncHandler(async (req: Request, res: Response) => {
  const { roleId } = req.params;
  const { departmentId, expiresAt, isActive } = req.body;

  const userRole = await UserRole.findById(roleId);

  if (!userRole) {
    res.status(404).json({ success: false, message: 'Role assignment not found' });
    return;
  }

  const previousDepartment = userRole.departmentId;

  if (departmentId !== undefined) userRole.departmentId = departmentId;
  if (expiresAt !== undefined) userRole.expiresAt = expiresAt ? new Date(expiresAt) : undefined;
  if (isActive !== undefined) userRole.isActive = isActive;

  await userRole.save();

  // Create audit log
  const auditLog = new RoleAssignment({
    userId: userRole.userId,
    role: userRole.role,
    action: AssignmentAction.MODIFY,
    performedBy: req.userId,
    departmentId: userRole.departmentId,
    metadata: {
      previousDepartment,
      newDepartment: userRole.departmentId,
      expiresAt: userRole.expiresAt,
    },
  });

  await auditLog.save();

  res.json({
    success: true,
    message: 'Role assignment updated successfully',
    data: userRole,
  });
});
