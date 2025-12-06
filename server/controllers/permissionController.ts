import { Request, Response } from 'express';
import Permission, { PermissionCategory, PermissionAction } from '../models/Permission';
import { AppRole } from '../models/UserRole';
import { asyncHandler } from '../middleware/errorMiddleware';

// Get all permissions
export const getAllPermissions = asyncHandler(async (req: Request, res: Response) => {
  const { role, category, isActive } = req.query;

  const filter: any = {};
  if (role) filter.role = role;
  if (category) filter.category = category;
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const permissions = await Permission.find(filter).sort({ role: 1, category: 1 });

  res.json({
    success: true,
    data: permissions,
  });
});

// Get permissions for specific role
export const getRolePermissions = asyncHandler(async (req: Request, res: Response) => {
  const { role } = req.params;

  const permissions = await Permission.find({
    role: role as AppRole,
    isActive: true,
  }).sort({ category: 1, action: 1 });

  res.json({
    success: true,
    data: permissions,
  });
});

// Check if role has permission
export const checkPermission = asyncHandler(async (req: Request, res: Response) => {
  const { role, category, action, resource } = req.query;

  if (!role || !category || !action) {
    res.status(400).json({ 
      success: false, 
      message: 'Role, category, and action are required' 
    });
    return;
  }

  const permission = await Permission.findOne({
    role: role as AppRole,
    category: category as PermissionCategory,
    action: action as PermissionAction,
    ...(resource && { resource: resource as string }),
    isActive: true,
  });

  res.json({
    success: true,
    hasPermission: !!permission,
    data: permission || null,
  });
});

// Create permission
export const createPermission = asyncHandler(async (req: Request, res: Response) => {
  const { role, category, action, resource, conditions, description } = req.body;

  // Check if permission already exists
  const existingPermission = await Permission.findOne({
    role,
    category,
    action,
    resource: resource || { $exists: false },
  });

  if (existingPermission) {
    res.status(400).json({ 
      success: false, 
      message: 'Permission already exists' 
    });
    return;
  }

  const permission = new Permission({
    role,
    category,
    action,
    resource,
    conditions,
    description,
    isActive: true,
  });

  await permission.save();

  res.status(201).json({
    success: true,
    message: 'Permission created successfully',
    data: permission,
  });
});

// Update permission
export const updatePermission = asyncHandler(async (req: Request, res: Response) => {
  const { permissionId } = req.params;
  const { conditions, description, isActive } = req.body;

  const permission = await Permission.findById(permissionId);

  if (!permission) {
    res.status(404).json({ success: false, message: 'Permission not found' });
    return;
  }

  if (conditions !== undefined) permission.conditions = conditions;
  if (description !== undefined) permission.description = description;
  if (isActive !== undefined) permission.isActive = isActive;

  await permission.save();

  res.json({
    success: true,
    message: 'Permission updated successfully',
    data: permission,
  });
});

// Delete permission
export const deletePermission = asyncHandler(async (req: Request, res: Response) => {
  const { permissionId } = req.params;

  const permission = await Permission.findByIdAndDelete(permissionId);

  if (!permission) {
    res.status(404).json({ success: false, message: 'Permission not found' });
    return;
  }

  res.json({
    success: true,
    message: 'Permission deleted successfully',
  });
});

// Get user's effective permissions (based on all their roles)
export const getUserPermissions = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Get user's active roles
  const UserRole = (await import('../models/UserRole')).default;
  const userRoles = await UserRole.find({
    userId,
    isActive: true,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: new Date() } }
    ]
  });

  const roles = userRoles.map(ur => ur.role);

  // Get all permissions for these roles
  const permissions = await Permission.find({
    role: { $in: roles },
    isActive: true,
  }).sort({ category: 1, action: 1 });

  // Group permissions by category
  const groupedPermissions = permissions.reduce((acc: any, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push({
      action: perm.action,
      resource: perm.resource,
      role: perm.role,
    });
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      roles,
      permissions: groupedPermissions,
      raw: permissions,
    },
  });
});
