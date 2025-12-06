import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { loadUserRoles, requireCEO, requireManagement } from '../middleware/roleMiddleware';
import { canManageUser } from '../middleware/permissionMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { roleLimiter } from '../middleware/rateLimitMiddleware';
import {
  assignRole,
  revokeRole,
  getUserRoles,
  getUsersByRole,
  bulkAssignRoles,
  updateRoleAssignment,
} from '../controllers/roleController';
import {
  assignRoleSchema,
  revokeRoleSchema,
  bulkAssignRolesSchema,
  updateRoleSchema,
} from '../validators/roleValidators';

const router = express.Router();

// All routes require authentication and role loading
router.use(protect, loadUserRoles, roleLimiter);

// Assign role to user (CEO or HR only)
router.post(
  '/assign',
  requireManagement,
  canManageUser,
  validate(assignRoleSchema),
  assignRole
);

// Revoke role from user (CEO or HR only)
router.post(
  '/revoke',
  requireManagement,
  canManageUser,
  validate(revokeRoleSchema),
  revokeRole
);

// Get user's roles
router.get('/user/:userId', getUserRoles);

// Get all users with specific role (CEO only)
router.get('/list/:role', requireCEO, getUsersByRole);

// Bulk assign roles (CEO only)
router.post(
  '/bulk-assign',
  requireCEO,
  validate(bulkAssignRolesSchema),
  bulkAssignRoles
);

// Update role assignment (CEO only)
router.put(
  '/:roleId',
  requireCEO,
  validate(updateRoleSchema),
  updateRoleAssignment
);

export default router;
