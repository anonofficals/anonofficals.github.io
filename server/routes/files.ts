import express from 'express';
import multer from 'multer';
import path from 'path';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  uploadFile,
  uploadMultipleFiles,
  getFileById,
  getRelatedFiles,
  deleteFile,
  downloadFile
} from '../controllers/fileController';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt|png|jpg|jpeg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, PNG, JPG allowed.'));
    }
  },
});

// Upload single file
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

// Upload multiple files
router.post('/upload-multiple', authMiddleware, upload.array('files', 10), uploadMultipleFiles);

// Get file by ID
router.get('/:id', authMiddleware, getFileById);

// Get files related to a specific model
router.get('/related/:model/:id', authMiddleware, getRelatedFiles);

// Delete file
router.delete('/:id', authMiddleware, deleteFile);

// Download file
router.get('/:id/download', authMiddleware, downloadFile);

export default router;
