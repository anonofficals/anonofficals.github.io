import { Request, Response, NextFunction } from 'express';
import UserRole, { AppRole } from '../models/UserRole';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: string;
      userRoles?: AppRole[];
    }
  }
}

// Load user roles and attach to request
export const loadUserRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return next();
    }

    const roles = await UserRole.find({
      userId: req.userId,
      isActive: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: new Date() } }
      ]
    });

    req.userRoles = roles.map(r => r.role);
    next();
  } catch (error) {
    console.error('Error loading user roles:', error);
    next();
  }
};

// Check if user has specific role
export const requireRole = (...roles: AppRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userRoles || req.userRoles.length === 0) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: No roles assigned' 
      });
    }

    const hasRole = roles.some(role => req.userRoles?.includes(role));
    
    if (!hasRole) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied: Required roles - ${roles.join(', ')}` 
      });
    }

    next();
  };
};

// CEO-only access
export const requireCEO = requireRole(AppRole.CEO);

// Management roles (CEO, HOD, Manager)
export const requireManagement = requireRole(
  AppRole.CEO,
  AppRole.HOD,
  AppRole.PROJECT_MANAGER,
  AppRole.CONTENT_MANAGER,
  AppRole.FINANCE_MANAGER,
  AppRole.HR
);

// Content management access
export const requireContentAccess = requireRole(
  AppRole.CEO,
  AppRole.CONTENT_MANAGER
);

// Finance management access
export const requireFinanceAccess = requireRole(
  AppRole.CEO,
  AppRole.FINANCE_MANAGER
);

// HR access
export const requireHRAccess = requireRole(
  AppRole.CEO,
  AppRole.HR
);

// Check if user has any of the specified roles
export const hasAnyRole = (userRoles: AppRole[], ...roles: AppRole[]): boolean => {
  return roles.some(role => userRoles.includes(role));
};

// Check if user has all specified roles
export const hasAllRoles = (userRoles: AppRole[], ...roles: AppRole[]): boolean => {
  return roles.every(role => userRoles.includes(role));
};
