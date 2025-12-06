import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { loadUserRoles, requireManagement } from '../middleware/roleMiddleware';
import {
  sendInvitation,
  getAllInvitations,
  getInvitationByToken,
  acceptInvitation,
  revokeInvitation,
  resendInvitation,
} from '../controllers/invitationController';

const router = express.Router();

// Public route - get invitation details by token
router.get('/token/:token', getInvitationByToken);

// Public route - accept invitation
router.post('/accept/:token', acceptInvitation);

// Protected routes
router.use(protect, loadUserRoles);

// Send invitation (Management only)
router.post('/', requireManagement, sendInvitation);

// Get all invitations (Management only)
router.get('/', requireManagement, getAllInvitations);

// Revoke invitation (Management only)
router.delete('/:invitationId', requireManagement, revokeInvitation);

// Resend invitation (Management only)
router.post('/:invitationId/resend', requireManagement, resendInvitation);

export default router;
