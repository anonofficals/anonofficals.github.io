import { Request, Response, NextFunction } from 'express';
import Permission, { PermissionCategory, PermissionAction } from '../models/Permission';
import { AppRole } from '../models/UserRole';

// Check if user has specific permission
export const requirePermission = (category: PermissionCategory, action: PermissionAction, resource?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.userRoles || req.userRoles.length === 0) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied: No permissions' 
        });
      }

      // CEO has all permissions
      if (req.userRoles.includes(AppRole.CEO)) {
        return next();
      }

      // Check if any of user's roles has the required permission
      const hasPermission = await Permission.findOne({
        role: { $in: req.userRoles },
        category,
        action,
        ...(resource && { resource }),
        isActive: true
      });

      if (!hasPermission) {
        return res.status(403).json({ 
          success: false, 
          message: `Access denied: Missing permission - ${category}:${action}` 
        });
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({ success: false, message: 'Permission check failed' });
    }
  };
};

// Check if user can manage another user (prevent privilege escalation)
export const canManageUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetUserId = req.params.userId || req.body.userId;
    
    if (!targetUserId) {
      return res.status(400).json({ success: false, message: 'User ID required' });
    }

    // CEO can manage anyone
    if (req.userRoles?.includes(AppRole.CEO)) {
      return next();
    }

    // Get target user's roles
    const UserRole = (await import('../models/UserRole')).default;
    const targetUserRoles = await UserRole.find({
      userId: targetUserId,
      isActive: true
    });

    const targetRoles = targetUserRoles.map(r => r.role);

    // Cannot manage users with CEO role (unless you are CEO)
    if (targetRoles.includes(AppRole.CEO)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Cannot manage CEO users' 
      });
    }

    // HR can manage employees, interns, students
    if (req.userRoles?.includes(AppRole.HR)) {
      const managableRoles = [AppRole.EMPLOYEE, AppRole.INTERN, AppRole.STUDENT, AppRole.USER];
      const canManage = targetRoles.every(role => managableRoles.includes(role));
      
      if (canManage) {
        return next();
      }
    }

    // HOD can manage department members
    if (req.userRoles?.includes(AppRole.HOD)) {
      // TODO: Add department check
      const managableRoles = [AppRole.EMPLOYEE, AppRole.INTERN, AppRole.PROJECT_MANAGER];
      const canManage = targetRoles.every(role => managableRoles.includes(role));
      
      if (canManage) {
        return next();
      }
    }

    res.status(403).json({ 
      success: false, 
      message: 'Insufficient permissions to manage this user' 
    });
  } catch (error) {
    console.error('User management check error:', error);
    res.status(500).json({ success: false, message: 'Authorization check failed' });
  }
};

// Check if user can access department data
export const requireDepartmentAccess = (departmentIdParam: string = 'departmentId') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId = req.params[departmentIdParam] || req.body.departmentId;

      // CEO has access to all departments
      if (req.userRoles?.includes(AppRole.CEO)) {
        return next();
      }

      // Get user's department assignments
      const UserRole = (await import('../models/UserRole')).default;
      const userDepartments = await UserRole.find({
        userId: req.userId,
        isActive: true,
        departmentId: { $exists: true }
      });

      const hasAccess = userDepartments.some(
        ur => ur.departmentId?.toString() === departmentId
      );

      if (!hasAccess) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied: Not authorized for this department' 
        });
      }

      next();
    } catch (error) {
      console.error('Department access check error:', error);
      res.status(500).json({ success: false, message: 'Authorization check failed' });
    }
  };
};
