import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { loadUserRoles, requireManagement, requireCEO } from '../middleware/roleMiddleware';
import {
  getAuditLogs,
  getUserAuditHistory,
  getAuditStatistics,
  getRecentActivity,
  exportAuditLogs,
} from '../controllers/auditController';

const router = express.Router();

// All routes require authentication and role loading
router.use(protect, loadUserRoles);

// Get all audit logs (Management only)
router.get('/', requireManagement, getAuditLogs);

// Get user audit history (Management only)
router.get('/user/:userId', requireManagement, getUserAuditHistory);

// Get audit statistics (CEO only)
router.get('/statistics', requireCEO, getAuditStatistics);

// Get recent activity (Management only)
router.get('/recent', requireManagement, getRecentActivity);

// Export audit logs (CEO only)
router.get('/export', requireCEO, exportAuditLogs);

export default router;
