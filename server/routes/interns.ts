import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getAllInterns,
  getInternById,
  createIntern,
  updateIntern,
  deleteIntern,
  evaluateIntern
} from '../controllers/internController';

const router = express.Router();

router.get('/', authMiddleware, getAllInterns);
router.get('/:id', authMiddleware, getInternById);
router.post('/', authMiddleware, createIntern);
router.put('/:id', authMiddleware, updateIntern);
router.patch('/:id/evaluate', authMiddleware, evaluateIntern);
router.delete('/:id', authMiddleware, deleteIntern);

export default router;
