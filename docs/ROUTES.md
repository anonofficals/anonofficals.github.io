# API Routes Documentation

## Overview
Complete API route definitions for the multi-user role system.

---

## 1. Role Management Routes

**File**: `server/routes/roles.ts`

```typescript
import express from 'express';
import * as roleController from '../controllers/roleController';
import { protect } from '../middleware/authMiddleware';
import { requireRole, requireStaffManager } from '../middleware/roleMiddleware';
import { canManageUser } from '../middleware/permissionMiddleware';
import { AppRole } from '../models/UserRole';

const router = express.Router();

/**
 * @route   POST /api/roles/assign
 * @desc    Assign a role to a user
 * @access  CEO, HR, HOD (limited)
 */
router.post(
  '/assign',
  protect,
  requireStaffManager,
  canManageUser,
  roleController.assignRole
);

/**
 * @route   POST /api/roles/revoke
 * @desc    Revoke a role from a user
 * @access  CEO, HR, HOD (limited)
 */
router.post(
  '/revoke',
  protect,
  requireStaffManager,
  canManageUser,
  roleController.revokeRole
);

/**
 * @route   GET /api/roles/user/:userId
 * @desc    Get all roles for a user
 * @access  Authenticated
 */
router.get(
  '/user/:userId',
  protect,
  roleController.getUserRoles
);

/**
 * @route   GET /api/roles/available
 * @desc    Get roles available for assignment based on current user
 * @access  Authenticated
 */
router.get(
  '/available',
  protect,
  roleController.getAvailableRoles
);

/**
 * @route   POST /api/roles/bulk-assign
 * @desc    Assign roles to multiple users
 * @access  CEO, HR
 */
router.post(
  '/bulk-assign',
  protect,
  requireRole(AppRole.CEO, AppRole.HR),
  roleController.bulkAssignRoles
);

export default router;
```

---

## 2. Permission Routes

**File**: `server/routes/permissions.ts`

```typescript
import express from 'express';
import * as permissionController from '../controllers/permissionController';
import { protect } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { AppRole } from '../models/UserRole';

const router = express.Router();

/**
 * @route   GET /api/permissions/role/:role
 * @desc    Get permissions for a specific role
 * @access  Authenticated
 */
router.get(
  '/role/:role',
  protect,
  permissionController.getRolePermissions
);

/**
 * @route   GET /api/permissions/user/:userId
 * @desc    Get all permissions for a user across all their roles
 * @access  Authenticated
 */
router.get(
  '/user/:userId',
  protect,
  permissionController.getUserPermissions
);

/**
 * @route   POST /api/permissions/check
 * @desc    Check if a user has a specific permission
 * @access  Authenticated
 */
router.post(
  '/check',
  protect,
  permissionController.checkPermission
);

export default router;
```

---

## 3. Invitation Routes

**File**: `server/routes/invitations.ts`

```typescript
import express from 'express';
import * as invitationController from '../controllers/invitationController';
import { protect } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { AppRole } from '../models/UserRole';

const router = express.Router();

/**
 * @route   POST /api/invitations/send
 * @desc    Send an invitation to join with a pre-assigned role
 * @access  CEO, HR, HOD (limited)
 */
router.post(
  '/send',
  protect,
  requireRole(AppRole.CEO, AppRole.HR, AppRole.HOD),
  invitationController.sendInvitation
);

/**
 * @route   GET /api/invitations/:token
 * @desc    Validate and get invitation details
 * @access  Public
 */
router.get(
  '/:token',
  invitationController.validateInvitation
);

/**
 * @route   POST /api/invitations/accept
 * @desc    Accept invitation and create account
 * @access  Public
 */
router.post(
  '/accept',
  invitationController.acceptInvitation
);

/**
 * @route   GET /api/invitations
 * @desc    Get all invitations (for admins)
 * @access  CEO, HR
 */
router.get(
  '/',
  protect,
  requireRole(AppRole.CEO, AppRole.HR),
  invitationController.getInvitations
);

export default router;
```

---

## 4. Audit Routes

**File**: `server/routes/audit.ts`

```typescript
import express from 'express';
import * as auditController from '../controllers/auditController';
import { protect } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { AppRole } from '../models/UserRole';

const router = express.Router();

/**
 * @route   GET /api/audit/role-assignments
 * @desc    Get role assignment audit logs with filters
 * @access  CEO, HR, Auditor
 */
router.get(
  '/role-assignments',
  protect,
  requireRole(AppRole.CEO, AppRole.HR, AppRole.AUDITOR),
  auditController.getRoleAssignments
);

/**
 * @route   GET /api/audit/user/:userId
 * @desc    Get audit log for a specific user
 * @access  CEO, HR, Auditor
 */
router.get(
  '/user/:userId',
  protect,
  requireRole(AppRole.CEO, AppRole.HR, AppRole.AUDITOR),
  auditController.getUserAuditLog
);

export default router;
```

---

## 5. Department Routes

**File**: `server/routes/departments.ts`

```typescript
import express from 'express';
import Department from '../models/Department';
import { protect } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/roleMiddleware';
import { AppRole } from '../models/UserRole';

const router = express.Router();

/**
 * @route   GET /api/departments
 * @desc    Get all departments
 * @access  Authenticated
 */
router.get('/', protect, async (req, res) => {
  try {
    const { isActive } = req.query;
    
    const query: any = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const departments = await Department.find(query)
      .populate('hodId', 'name email')
      .sort({ name: 1 });

    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching departments' 
    });
  }
});

/**
 * @route   POST /api/departments
 * @desc    Create a new department
 * @access  CEO
 */
router.post('/', protect, requireRole(AppRole.CEO), async (req, res) => {
  try {
    const { name, code, description, hodId, budget } = req.body;

    if (!name || !code) {
      res.status(400).json({ 
        success: false,
        message: 'Name and code are required' 
      });
      return;
    }

    // Check if department already exists
    const existing = await Department.findOne({ 
      $or: [{ code: code.toUpperCase() }, { name }]
    });

    if (existing) {
      res.status(400).json({ 
        success: false,
        message: 'Department with this name or code already exists' 
      });
      return;
    }

    const department = new Department({
      name,
      code: code.toUpperCase(),
      description,
      hodId,
      budget
    });

    await department.save();

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    });
  } catch (error) {
    console.error('Create department error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating department' 
    });
  }
});

/**
 * @route   PUT /api/departments/:id
 * @desc    Update a department
 * @access  CEO
 */
router.put('/:id', protect, requireRole(AppRole.CEO), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const department = await Department.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('hodId', 'name email');

    if (!department) {
      res.status(404).json({ 
        success: false,
        message: 'Department not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    console.error('Update department error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating department' 
    });
  }
});

export default router;
```

---

## 6. Main Server Integration

**File**: `server/index.ts` (Updated sections)

```typescript
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

// Import routes
import authRoutes from './routes/auth';
import roleRoutes from './routes/roles';
import permissionRoutes from './routes/permissions';
import invitationRoutes from './routes/invitations';
import auditRoutes from './routes/audit';
import departmentRoutes from './routes/departments';
import applicationRoutes from './routes/applications';
import fileRoutes from './routes/files';
import paymentRoutes from './routes/payments';
import notificationRoutes from './routes/notifications';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Complete API Endpoint Summary

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Role Management
- `POST /api/roles/assign` - Assign role to user
- `POST /api/roles/revoke` - Revoke role from user
- `GET /api/roles/user/:userId` - Get user's roles
- `GET /api/roles/available` - Get assignable roles
- `POST /api/roles/bulk-assign` - Bulk assign roles

### Permissions
- `GET /api/permissions/role/:role` - Get role permissions
- `GET /api/permissions/user/:userId` - Get user permissions
- `POST /api/permissions/check` - Check permission

### Invitations
- `POST /api/invitations/send` - Send invitation
- `GET /api/invitations/:token` - Validate invitation
- `POST /api/invitations/accept` - Accept invitation
- `GET /api/invitations` - List all invitations

### Audit Logs
- `GET /api/audit/role-assignments` - Get role assignment logs
- `GET /api/audit/user/:userId` - Get user audit log

### Departments
- `GET /api/departments` - List departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - List applications
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id/status` - Update application status

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files/:id` - Get file details
- `DELETE /api/files/:id` - Delete file

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get payment details

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
