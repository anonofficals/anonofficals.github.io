# Middleware Documentation

## Overview
Authentication and authorization middleware for the multi-user role system.

---

## 1. Enhanced Auth Middleware

**File**: `server/middleware/authMiddleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import UserRole, { AppRole } from '../models/UserRole';

interface JwtPayload {
  id: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userRoles?: AppRole[];
      userId?: string;
    }
  }
}

/**
 * Protect routes - requires valid JWT token
 */
export const protect = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'secret'
      ) as JwtPayload;
      
      // Get user from DB
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        res.status(401).json({ 
          success: false,
          message: 'User not found' 
        });
        return;
      }

      // Get user's active roles
      const userRoles = await UserRole.find({
        userId: user._id,
        isActive: true,
        $or: [
          { expiresAt: { $exists: false } },
          { expiresAt: { $gt: new Date() } }
        ]
      });

      // Attach to request
      req.user = user;
      req.userId = user._id.toString();
      req.userRoles = userRoles.map(ur => ur.role);
      
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ 
        success: false,
        message: 'Not authorized, token failed' 
      });
      return;
    }
  } else {
    res.status(401).json({ 
      success: false,
      message: 'Not authorized, no token' 
    });
    return;
  }
};

/**
 * Optional auth - doesn't fail if no token
 */
export const optionalAuth = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      await protect(req, res, next);
    } catch (error) {
      // Continue without auth
      next();
    }
  } else {
    next();
  }
};
```

---

## 2. Role-Based Authorization Middleware

**File**: `server/middleware/roleMiddleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import { AppRole } from '../models/UserRole';

/**
 * Require specific role(s)
 * @param roles - Single role or array of roles
 */
export const requireRole = (...roles: AppRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
      return;
    }

    const hasRole = req.userRoles.some(role => roles.includes(role));

    if (!hasRole) {
      res.status(403).json({ 
        success: false,
        message: 'Insufficient permissions',
        required: roles,
        current: req.userRoles
      });
      return;
    }

    next();
  };
};

/**
 * Require ALL specified roles
 */
export const requireAllRoles = (...roles: AppRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
      return;
    }

    const hasAllRoles = roles.every(role => req.userRoles!.includes(role));

    if (!hasAllRoles) {
      res.status(403).json({ 
        success: false,
        message: 'All required roles not present',
        required: roles,
        current: req.userRoles
      });
      return;
    }

    next();
  };
};

/**
 * Check if user is CEO (highest authority)
 */
export const requireCEO = requireRole(AppRole.CEO);

/**
 * Check if user is in management (CEO, HOD, HR, Finance Manager)
 */
export const requireManagement = requireRole(
  AppRole.CEO,
  AppRole.HOD,
  AppRole.HR,
  AppRole.FINANCE_MANAGER
);

/**
 * Check if user can manage staff (CEO, HOD, HR)
 */
export const requireStaffManager = requireRole(
  AppRole.CEO,
  AppRole.HOD,
  AppRole.HR
);
```

---

## 3. Permission-Based Authorization Middleware

**File**: `server/middleware/permissionMiddleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import Permission, { PermissionCategory, PermissionAction } from '../models/Permission';
import UserRole from '../models/UserRole';

/**
 * Check if user has specific permission
 */
export const requirePermission = (
  category: PermissionCategory,
  action: PermissionAction,
  options?: {
    resource?: string;
    checkDepartment?: boolean;
  }
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user || !req.userRoles) {
      res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
      return;
    }

    try {
      // Check if any of user's roles have the required permission
      const permissions = await Permission.find({
        role: { $in: req.userRoles },
        category: category,
        action: action,
        isActive: true,
        ...(options?.resource && { resource: options.resource })
      });

      if (permissions.length === 0) {
        res.status(403).json({ 
          success: false,
          message: 'Permission denied',
          required: { category, action }
        });
        return;
      }

      // Check department restrictions if needed
      if (options?.checkDepartment) {
        const userRoles = await UserRole.find({
          userId: req.user._id,
          role: { $in: req.userRoles },
          isActive: true
        });

        const departmentPermission = permissions.find(p => {
          if (!p.conditions?.departmentOnly) return true;
          
          // Check if user has role in the same department
          return userRoles.some(ur => 
            ur.departmentId?.toString() === req.params.departmentId
          );
        });

        if (!departmentPermission) {
          res.status(403).json({ 
            success: false,
            message: 'Department access denied' 
          });
          return;
        }
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error checking permissions' 
      });
      return;
    }
  };
};

/**
 * Check if user can manage specific user
 * CEO can manage all, HOD can manage in their department, etc.
 */
export const canManageUser = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  if (!req.user || !req.userRoles) {
    res.status(401).json({ 
      success: false,
      message: 'Authentication required' 
    });
    return;
  }

  const targetUserId = req.params.userId || req.body.userId;

  try {
    // CEO can manage anyone
    if (req.userRoles.includes('ceo' as any)) {
      next();
      return;
    }

    // Get current user's roles with department info
    const currentUserRoles = await UserRole.find({
      userId: req.user._id,
      isActive: true
    });

    // Get target user's roles
    const targetUserRoles = await UserRole.find({
      userId: targetUserId,
      isActive: true
    });

    // HOD can manage users in their department
    const isHOD = currentUserRoles.some(r => r.role === 'hod' as any);
    if (isHOD) {
      const hodDepartments = currentUserRoles
        .filter(r => r.role === 'hod' as any)
        .map(r => r.departmentId?.toString());

      const targetInDepartment = targetUserRoles.some(r =>
        hodDepartments.includes(r.departmentId?.toString() || '')
      );

      if (targetInDepartment) {
        next();
        return;
      }
    }

    // HR can manage non-management roles
    const isHR = req.userRoles.includes('hr' as any);
    if (isHR) {
      const managementRoles = ['ceo', 'hod', 'finance-manager'];
      const targetIsManagement = targetUserRoles.some(r =>
        managementRoles.includes(r.role)
      );

      if (!targetIsManagement) {
        next();
        return;
      }
    }

    res.status(403).json({ 
      success: false,
      message: 'Cannot manage this user' 
    });
    return;
  } catch (error) {
    console.error('Can manage user check error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error checking management permissions' 
    });
    return;
  }
};
```

---

## 4. Department Authorization Middleware

**File**: `server/middleware/departmentMiddleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import UserRole from '../models/UserRole';
import Department from '../models/Department';

/**
 * Require user to belong to specific department
 */
export const requireDepartment = (departmentCode: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ 
        success: false,
        message: 'Authentication required' 
      });
      return;
    }

    try {
      const department = await Department.findOne({ 
        code: departmentCode.toUpperCase(),
        isActive: true 
      });

      if (!department) {
        res.status(404).json({ 
          success: false,
          message: 'Department not found' 
        });
        return;
      }

      const userRole = await UserRole.findOne({
        userId: req.user._id,
        departmentId: department._id,
        isActive: true
      });

      if (!userRole) {
        res.status(403).json({ 
          success: false,
          message: 'Not a member of this department' 
        });
        return;
      }

      // Attach department to request
      (req as any).department = department;
      
      next();
    } catch (error) {
      console.error('Department check error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error checking department access' 
      });
      return;
    }
  };
};

/**
 * Check if user is HOD of a department
 */
export const requireHODOfDepartment = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ 
      success: false,
      message: 'Authentication required' 
    });
    return;
  }

  const departmentId = req.params.departmentId || req.body.departmentId;

  try {
    const department = await Department.findById(departmentId);

    if (!department) {
      res.status(404).json({ 
        success: false,
        message: 'Department not found' 
      });
      return;
    }

    if (department.hodId?.toString() !== req.user._id.toString()) {
      res.status(403).json({ 
        success: false,
        message: 'Not the HOD of this department' 
      });
      return;
    }

    (req as any).department = department;
    next();
  } catch (error) {
    console.error('HOD check error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error checking HOD status' 
    });
    return;
  }
};
```

---

## Usage Examples

### Protect a Route
```typescript
import { protect } from './middleware/authMiddleware';
import { requireRole } from './middleware/roleMiddleware';
import { AppRole } from './models/UserRole';

// Only authenticated users
router.get('/profile', protect, getProfile);

// Only HR can access
router.get('/employees', protect, requireRole(AppRole.HR), getEmployees);

// CEO or HR can access
router.post('/hire', protect, requireRole(AppRole.CEO, AppRole.HR), hireEmployee);
```

### Permission-Based Route
```typescript
import { requirePermission } from './middleware/permissionMiddleware';
import { PermissionCategory, PermissionAction } from './models/Permission';

router.post('/users', 
  protect, 
  requirePermission(PermissionCategory.USERS, PermissionAction.CREATE),
  createUser
);
```

### Department-Specific Route
```typescript
import { requireDepartment } from './middleware/departmentMiddleware';

router.get('/department/ai-dev/projects', 
  protect,
  requireDepartment('AI-DEV'),
  getDepartmentProjects
);
```
