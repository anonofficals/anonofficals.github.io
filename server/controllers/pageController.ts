import { Request, Response } from 'express';
import Page from '../models/Page';

// Get all public pages
export const getAllPages = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find({ isPublished: true })
      .select('-__v')
      .sort({ pageType: 1 });
    
    res.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pages',
    });
  }
};

// Get page by type
export const getPageByType = async (req: Request, res: Response) => {
  try {
    const { pageType } = req.params;
    
    const page = await Page.findOne({ pageType, isPublished: true });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        error: 'Page not found',
      });
    }
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch page',
    });
  }
};

// Update page content (CEO/Content Manager only)
export const updatePageContent = async (req: Request, res: Response) => {
  try {
    const { pageType } = req.params;
    const { title, content, metadata, images } = req.body;
    const userId = (req as any).user?.id;
    
    const page = await Page.findOne({ pageType });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        error: 'Page not found',
      });
    }
    
    // Update fields
    if (title) page.title = title;
    if (content) page.content = { ...page.content, ...content };
    if (metadata) page.metadata = { ...page.metadata, ...metadata, lastModifiedBy: userId };
    if (images) page.images = images;
    
    page.version += 1;
    await page.save();
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update page',
    });
  }
};

// Create new page (Admin only)
export const createPage = async (req: Request, res: Response) => {
  try {
    const { pageType, title, slug, content, metadata } = req.body;
    const userId = (req as any).user?.id;
    
    const existingPage = await Page.findOne({ pageType });
    if (existingPage) {
      return res.status(400).json({
        success: false,
        error: 'Page already exists for this type',
      });
    }
    
    const page = new Page({
      pageType,
      title,
      slug,
      content,
      metadata: {
        ...metadata,
        lastModifiedBy: userId,
      },
    });
    
    await page.save();
    
    res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create page',
    });
  }
};

// Toggle page publish status
export const togglePublishStatus = async (req: Request, res: Response) => {
  try {
    const { pageType } = req.params;
    
    const page = await Page.findOne({ pageType });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        error: 'Page not found',
      });
    }
    
    page.isPublished = !page.isPublished;
    await page.save();
    
    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to toggle publish status',
    });
  }
};
