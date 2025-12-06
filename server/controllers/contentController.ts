import { Request, Response } from 'express';
import ContentBlock from '../models/Content';

// Get content blocks for a page
export const getPageContent = async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    
    const contentBlocks = await ContentBlock.find({ pageId, isActive: true })
      .sort({ order: 1 })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    
    res.json({
      success: true,
      data: contentBlocks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch content blocks',
    });
  }
};

// Create content block
export const createContentBlock = async (req: Request, res: Response) => {
  try {
    const { pageId, blockType, title, content, images, order } = req.body;
    const userId = (req as any).user?.id;
    
    const contentBlock = new ContentBlock({
      pageId,
      blockType,
      title,
      content,
      images: images || [],
      order: order || 0,
      createdBy: userId,
      updatedBy: userId,
    });
    
    await contentBlock.save();
    
    res.status(201).json({
      success: true,
      data: contentBlock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create content block',
    });
  }
};

// Update content block
export const updateContentBlock = async (req: Request, res: Response) => {
  try {
    const { blockId } = req.params;
    const { title, content, images, order, isActive } = req.body;
    const userId = (req as any).user?.id;
    
    const contentBlock = await ContentBlock.findById(blockId);
    
    if (!contentBlock) {
      return res.status(404).json({
        success: false,
        error: 'Content block not found',
      });
    }
    
    if (title !== undefined) contentBlock.title = title;
    if (content !== undefined) contentBlock.content = content;
    if (images !== undefined) contentBlock.images = images;
    if (order !== undefined) contentBlock.order = order;
    if (isActive !== undefined) contentBlock.isActive = isActive;
    
    contentBlock.updatedBy = userId;
    await contentBlock.save();
    
    res.json({
      success: true,
      data: contentBlock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update content block',
    });
  }
};

// Delete content block
export const deleteContentBlock = async (req: Request, res: Response) => {
  try {
    const { blockId } = req.params;
    
    const contentBlock = await ContentBlock.findByIdAndDelete(blockId);
    
    if (!contentBlock) {
      return res.status(404).json({
        success: false,
        error: 'Content block not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Content block deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete content block',
    });
  }
};

// Reorder content blocks
export const reorderContentBlocks = async (req: Request, res: Response) => {
  try {
    const { pageId, blockOrders } = req.body; // blockOrders: [{ blockId, order }]
    
    const updates = blockOrders.map((item: any) =>
      ContentBlock.findByIdAndUpdate(item.blockId, { order: item.order })
    );
    
    await Promise.all(updates);
    
    res.json({
      success: true,
      message: 'Content blocks reordered successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to reorder content blocks',
    });
  }
};
