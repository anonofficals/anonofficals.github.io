import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getAllPages,
  getPageByType,
  updatePageContent,
  createPage,
  togglePublishStatus,
} from '../controllers/pageController';

const router = express.Router();

// Public routes
router.get('/public', getAllPages);
router.get('/public/:pageType', getPageByType);

// Protected routes (CEO, Content Manager)
router.put('/:pageType', protect, updatePageContent);
router.post('/', protect, createPage);
router.patch('/:pageType/publish', protect, togglePublishStatus);

export default router;
