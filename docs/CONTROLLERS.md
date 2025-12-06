# Controllers Documentation

## Overview
Complete API controllers for role management, permissions, invitations, and audit logging.

---

## 1. Role Management Controller

**File**: `server/controllers/roleController.ts`

```typescript
import { Request, Response } from 'express';
import UserRole, { AppRole } from '../models/UserRole';
import RoleAssignment, { AssignmentAction } from '../models/RoleAssignment';
import User from '../models/User';
import Department from '../models/Department';

/**
 * Assign role to a user
 * POST /api/roles/assign
 */
export const assignRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role, departmentId, reason, expiresAt } = req.body;

    // Validate input
    if (!userId || !role) {
      res.status(400).json({ 
        success: false,
        message: 'User ID and role are required' 
      });
      return;
    }

    // Check if user exists
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
      return;
    }

    // Check if role already exists
    const existingRole = await UserRole.findOne({
      userId,
      role,
      isActive: true
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
      expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      metadata: {
        reason,
        ipAddress: req.ip
      }
    });

    await userRole.save();

    // Create audit log
    const auditLog = new RoleAssignment({
      userId,
      role,
      action: AssignmentAction.ASSIGNED,
      performedBy: req.userId,
      departmentId,
      reason,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        expiresAt: expiresAt ? new Date(expiresAt) : undefined
      }
    });

    await auditLog.save();

    // Populate response
    await userRole.populate('userId', 'name email');
    await userRole.populate('departmentId', 'name code');

    res.status(201).json({
      success: true,
      message: 'Role assigned successfully',
      data: userRole
    });
  } catch (error) {
    console.error('Assign role error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error assigning role' 
    });
  }
};

/**
 * Revoke role from a user
 * POST /api/roles/revoke
 */
export const revokeRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, role, reason } = req.body;

    // Validate input
    if (!userId || !role) {
      res.status(400).json({ 
        success: false,
        message: 'User ID and role are required' 
      });
      return;
    }

    // Find and deactivate role
    const userRole = await UserRole.findOne({
      userId,
      role,
      isActive: true
    });

    if (!userRole) {
      res.status(404).json({ 
        success: false,
        message: 'Role not found or already revoked' 
      });
      return;
    }

    userRole.isActive = false;
    await userRole.save();

    // Create audit log
    const auditLog = new RoleAssignment({
      userId,
      role,
      action: AssignmentAction.REVOKED,
      performedBy: req.userId,
      departmentId: userRole.departmentId,
      reason,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      }
    });

    await auditLog.save();

    res.json({
      success: true,
      message: 'Role revoked successfully',
      data: userRole
    });
  } catch (error) {
    console.error('Revoke role error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error revoking role' 
    });
  }
};

/**
 * Get user's roles
 * GET /api/roles/user/:userId
 */
export const getUserRoles = async (req: Request, res: Response): Promise<void> => {
  try {
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
      data: roles
    });
  } catch (error) {
    console.error('Get user roles error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching user roles' 
    });
  }
};

/**
 * Get available roles based on current user's permissions
 * GET /api/roles/available
 */
export const getAvailableRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRoles = req.userRoles || [];
    let availableRoles: AppRole[] = [];

    if (userRoles.includes(AppRole.CEO)) {
      // CEO can assign all roles
      availableRoles = Object.values(AppRole);
    } else if (userRoles.includes(AppRole.HR)) {
      // HR can assign most roles except CEO and HOD
      availableRoles = Object.values(AppRole).filter(
        role => ![AppRole.CEO, AppRole.HOD, AppRole.FINANCE_MANAGER].includes(role)
      );
    } else if (userRoles.includes(AppRole.HOD)) {
      // HOD can assign department-level roles
      availableRoles = [
        AppRole.EMPLOYEE,
        AppRole.INTERN,
        AppRole.PROJECT_MANAGER
      ];
    } else {
      availableRoles = [];
    }

    res.json({
      success: true,
      data: availableRoles.map(role => ({
        value: role,
        label: role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }))
    });
  } catch (error) {
    console.error('Get available roles error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching available roles' 
    });
  }
};

/**
 * Bulk assign roles
 * POST /api/roles/bulk-assign
 */
export const bulkAssignRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assignments } = req.body; // Array of { userId, role, departmentId, reason }

    if (!Array.isArray(assignments) || assignments.length === 0) {
      res.status(400).json({ 
        success: false,
        message: 'Invalid assignments array' 
      });
      return;
    }

    const results = {
      successful: [] as any[],
      failed: [] as any[]
    };

    for (const assignment of assignments) {
      try {
        const { userId, role, departmentId, reason } = assignment;

        // Check if role already exists
        const existingRole = await UserRole.findOne({
          userId,
          role,
          isActive: true
        });

        if (existingRole) {
          results.failed.push({
            userId,
            role,
            reason: 'Role already exists'
          });
          continue;
        }

        // Create role
        const userRole = new UserRole({
          userId,
          role,
          departmentId,
          assignedBy: req.userId,
          metadata: {
            reason,
            ipAddress: req.ip
          }
        });

        await userRole.save();

        // Create audit log
        await RoleAssignment.create({
          userId,
          role,
          action: AssignmentAction.ASSIGNED,
          performedBy: req.userId,
          departmentId,
          reason,
          metadata: {
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
          }
        });

        results.successful.push({
          userId,
          role,
          roleId: userRole._id
        });
      } catch (error) {
        results.failed.push({
          userId: assignment.userId,
          role: assignment.role,
          reason: 'Internal error'
        });
      }
    }

    res.json({
      success: true,
      message: `Assigned ${results.successful.length} roles, ${results.failed.length} failed`,
      data: results
    });
  } catch (error) {
    console.error('Bulk assign roles error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error bulk assigning roles' 
    });
  }
};
```

---

## 2. Permission Management Controller

**File**: `server/controllers/permissionController.ts`

```typescript
import { Request, Response } from 'express';
import Permission, { PermissionCategory, PermissionAction } from '../models/Permission';
import { AppRole } from '../models/UserRole';

/**
 * Get permissions for a role
 * GET /api/permissions/role/:role
 */
export const getRolePermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.params;

    const permissions = await Permission.find({
      role: role as AppRole,
      isActive: true
    }).sort({ category: 1, action: 1 });

    res.json({
      success: true,
      data: permissions
    });
  } catch (error) {
    console.error('Get role permissions error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching role permissions' 
    });
  }
};

/**
 * Get all permissions for a user (across all their roles)
 * GET /api/permissions/user/:userId
 */
export const getUserPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Get user's roles
    const UserRole = (await import('../models/UserRole')).default;
    const userRoles = await UserRole.find({
      userId,
      isActive: true
    });

    const roles = userRoles.map(ur => ur.role);

    // Get permissions for all roles
    const permissions = await Permission.find({
      role: { $in: roles },
      isActive: true
    }).sort({ category: 1, action: 1 });

    // Group by category
    const grouped = permissions.reduce((acc, perm) => {
      const category = perm.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        action: perm.action,
        resource: perm.resource,
        conditions: perm.conditions,
        description: perm.description
      });
      return acc;
    }, {} as Record<string, any[]>);

    res.json({
      success: true,
      data: {
        roles,
        permissions: grouped,
        raw: permissions
      }
    });
  } catch (error) {
    console.error('Get user permissions error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching user permissions' 
    });
  }
};

/**
 * Check if user has specific permission
 * POST /api/permissions/check
 */
export const checkPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, category, action, resource } = req.body;

    // Get user's roles
    const UserRole = (await import('../models/UserRole')).default;
    const userRoles = await UserRole.find({
      userId,
      isActive: true
    });

    const roles = userRoles.map(ur => ur.role);

    // Check permission
    const permission = await Permission.findOne({
      role: { $in: roles },
      category: category as PermissionCategory,
      action: action as PermissionAction,
      ...(resource && { resource }),
      isActive: true
    });

    res.json({
      success: true,
      data: {
        hasPermission: !!permission,
        permission: permission || null
      }
    });
  } catch (error) {
    console.error('Check permission error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error checking permission' 
    });
  }
};
```

---

## 3. Invitation Management Controller

**File**: `server/controllers/invitationController.ts`

```typescript
import { Request, Response } from 'express';
import UserInvitation, { InvitationStatus } from '../models/UserInvitation';
import User from '../models/User';
import UserRole from '../models/UserRole';
import { AppRole } from '../models/UserRole';

/**
 * Send invitation
 * POST /api/invitations/send
 */
export const sendInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, role, departmentId, message } = req.body;

    // Validate input
    if (!email || !role) {
      res.status(400).json({ 
        success: false,
        message: 'Email and role are required' 
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
      return;
    }

    // Check for pending invitations
    const pendingInvitation = await UserInvitation.findOne({
      email: email.toLowerCase(),
      status: InvitationStatus.PENDING,
      expiresAt: { $gt: new Date() }
    });

    if (pendingInvitation) {
      res.status(400).json({ 
        success: false,
        message: 'Pending invitation already exists for this email' 
      });
      return;
    }

    // Create invitation
    const invitation = new UserInvitation({
      email: email.toLowerCase(),
      role: role as AppRole,
      departmentId,
      invitedBy: req.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      metadata: {
        message
      }
    });

    invitation.generateToken();
    await invitation.save();

    // TODO: Send email with invitation link
    const invitationLink = `${process.env.FRONTEND_URL}/invitations/accept?token=${invitation.token}`;

    res.status(201).json({
      success: true,
      message: 'Invitation sent successfully',
      data: {
        invitationId: invitation._id,
        email: invitation.email,
        role: invitation.role,
        expiresAt: invitation.expiresAt,
        invitationLink // Remove in production, send via email only
      }
    });
  } catch (error) {
    console.error('Send invitation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error sending invitation' 
    });
  }
};

/**
 * Validate invitation token
 * GET /api/invitations/:token
 */
export const validateInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;

    const invitation = await UserInvitation.findOne({
      token,
      status: InvitationStatus.PENDING
    }).populate('invitedBy', 'name email');

    if (!invitation || invitation.isExpired()) {
      res.status(404).json({ 
        success: false,
        message: 'Invalid or expired invitation' 
      });
      return;
    }

    res.json({
      success: true,
      data: {
        email: invitation.email,
        role: invitation.role,
        invitedBy: invitation.invitedBy,
        expiresAt: invitation.expiresAt,
        message: invitation.metadata?.message
      }
    });
  } catch (error) {
    console.error('Validate invitation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error validating invitation' 
    });
  }
};

/**
 * Accept invitation and create account
 * POST /api/invitations/accept
 */
export const acceptInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, name, password } = req.body;

    // Validate input
    if (!token || !name || !password) {
      res.status(400).json({ 
        success: false,
        message: 'Token, name, and password are required' 
      });
      return;
    }

    // Find invitation
    const invitation = await UserInvitation.findOne({
      token,
      status: InvitationStatus.PENDING
    });

    if (!invitation || invitation.isExpired()) {
      res.status(404).json({ 
        success: false,
        message: 'Invalid or expired invitation' 
      });
      return;
    }

    // Create user
    const user = new User({
      name,
      email: invitation.email,
      password // Will be hashed by pre-save hook
    });

    await user.save();

    // Assign role
    const userRole = new UserRole({
      userId: user._id,
      role: invitation.role,
      departmentId: invitation.departmentId,
      assignedBy: invitation.invitedBy,
      metadata: {
        reason: 'Invitation accepted',
        ipAddress: req.ip
      }
    });

    await userRole.save();

    // Update invitation status
    invitation.status = InvitationStatus.ACCEPTED;
    invitation.acceptedAt = new Date();
    invitation.acceptedUserId = user._id;
    await invitation.save();

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        role: userRole.role,
        token
      }
    });
  } catch (error) {
    console.error('Accept invitation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error accepting invitation' 
    });
  }
};

/**
 * Get all invitations (for admins)
 * GET /api/invitations
 */
export const getInvitations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const invitations = await UserInvitation.find(query)
      .populate('invitedBy', 'name email')
      .populate('departmentId', 'name code')
      .sort({ invitedAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await UserInvitation.countDocuments(query);

    res.json({
      success: true,
      data: invitations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get invitations error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching invitations' 
    });
  }
};
```

---

## 4. Audit Log Controller

**File**: `server/controllers/auditController.ts`

```typescript
import { Request, Response } from 'express';
import RoleAssignment from '../models/RoleAssignment';

/**
 * Get role assignment audit logs
 * GET /api/audit/role-assignments
 */
export const getRoleAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      userId, 
      performedBy, 
      action, 
      startDate, 
      endDate,
      page = 1,
      limit = 50 
    } = req.query;

    const query: any = {};

    if (userId) query.userId = userId;
    if (performedBy) query.performedBy = performedBy;
    if (action) query.action = action;
    
    if (startDate || endDate) {
      query.performedAt = {};
      if (startDate) query.performedAt.$gte = new Date(startDate as string);
      if (endDate) query.performedAt.$lte = new Date(endDate as string);
    }

    const logs = await RoleAssignment.find(query)
      .populate('userId', 'name email')
      .populate('performedBy', 'name email')
      .populate('departmentId', 'name code')
      .sort({ performedAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await RoleAssignment.countDocuments(query);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get role assignments error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching audit logs' 
    });
  }
};

/**
 * Get audit log for specific user
 * GET /api/audit/user/:userId
 */
export const getUserAuditLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const logs = await RoleAssignment.find({ userId })
      .populate('performedBy', 'name email')
      .populate('departmentId', 'name code')
      .sort({ performedAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await RoleAssignment.countDocuments({ userId });

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get user audit log error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching user audit log' 
    });
  }
};
```

---

## Usage in Routes

```typescript
import { protect } from '../middleware/authMiddleware';
import { requireRole, requireCEO } from '../middleware/roleMiddleware';
import * as roleController from '../controllers/roleController';

router.post('/assign', protect, requireRole(AppRole.CEO, AppRole.HR), roleController.assignRole);
router.post('/revoke', protect, requireRole(AppRole.CEO, AppRole.HR), roleController.revokeRole);
router.get('/user/:userId', protect, roleController.getUserRoles);
```
