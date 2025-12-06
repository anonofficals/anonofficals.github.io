import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getPageContent,
  createContentBlock,
  updateContentBlock,
  deleteContentBlock,
  reorderContentBlocks,
} from '../controllers/contentController';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/page/:pageId', getPageContent);
router.post('/', createContentBlock);
router.put('/:blockId', updateContentBlock);
router.delete('/:blockId', deleteContentBlock);
router.post('/reorder', reorderContentBlocks);

export default router;
