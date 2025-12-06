import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { loadUserRoles, requireCEO } from '../middleware/roleMiddleware';
import {
  getAllPermissions,
  getRolePermissions,
  checkPermission,
  createPermission,
  updatePermission,
  deletePermission,
  getUserPermissions,
} from '../controllers/permissionController';

const router = express.Router();

// All routes require authentication and role loading
router.use(protect, loadUserRoles);

// Public permission checks (authenticated users)
router.get('/check', checkPermission);
router.get('/role/:role', getRolePermissions);
router.get('/user/:userId', getUserPermissions);

// CEO-only permission management
router.get('/', requireCEO, getAllPermissions);
router.post('/', requireCEO, createPermission);
router.put('/:permissionId', requireCEO, updatePermission);
router.delete('/:permissionId', requireCEO, deletePermission);

export default router;
