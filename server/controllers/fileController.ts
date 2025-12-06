import { Request, Response } from 'express';
import File from '../models/File';
import fs from 'fs';
import path from 'path';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    const fileData = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: (req as any).user?._id,
      relatedTo: req.body.relatedModel && req.body.relatedId
        ? {
            model: req.body.relatedModel,
            id: req.body.relatedId,
          }
        : undefined,
    });

    await fileData.save();

    res.status(201).json({
      success: true,
      data: fileData,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file',
    });
  }
};

export const uploadMultipleFiles = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded',
      });
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileData = new File({
          filename: file.filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          uploadedBy: (req as any).user?._id,
          relatedTo: req.body.relatedModel && req.body.relatedId
            ? {
                model: req.body.relatedModel,
                id: req.body.relatedId,
              }
            : undefined,
        });

        await fileData.save();
        return fileData;
      })
    );

    res.status(201).json({
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} files uploaded successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload files',
    });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  try {
    const file = await File.findById(req.params.id).populate('uploadedBy', 'name email');

    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    res.json({
      success: true,
      data: file,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch file',
    });
  }
};

export const getRelatedFiles = async (req: Request, res: Response) => {
  try {
    const { model, id } = req.params;

    const files = await File.find({
      'relatedTo.model': model,
      'relatedTo.id': id,
    })
      .populate('uploadedBy', 'name email')
      .sort({ uploadedAt: -1 });

    res.json({
      success: true,
      data: files,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch related files',
    });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    // Delete physical file from filesystem
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    await file.deleteOne();

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete file',
    });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found',
      });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({
        success: false,
        error: 'Physical file not found',
      });
    }

    res.download(file.path, file.originalName);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to download file',
    });
  }
};
