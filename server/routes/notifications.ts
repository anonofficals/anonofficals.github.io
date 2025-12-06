import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification,
  getUnreadCount
} from '../controllers/notificationController';

const router = express.Router();

// Get user notifications
router.get('/user/:userId', authMiddleware, getUserNotifications);

// Mark notification as read
router.patch('/:id/read', authMiddleware, markAsRead);

// Mark all notifications as read
router.patch('/user/:userId/read-all', authMiddleware, markAllAsRead);

// Create notification (admin)
router.post('/', authMiddleware, createNotification);

// Delete notification
router.delete('/:id', authMiddleware, deleteNotification);

// Get unread count
router.get('/user/:userId/unread-count', authMiddleware, getUnreadCount);

export default router;
