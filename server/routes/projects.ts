import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectProgress
} from '../controllers/projectController';

const router = express.Router();

router.get('/', authMiddleware, getAllProjects);
router.get('/:id', authMiddleware, getProjectById);
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.patch('/:id/progress', authMiddleware, updateProjectProgress);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
