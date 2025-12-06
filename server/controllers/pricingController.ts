import { Request, Response } from 'express';
import Pricing from '../models/Pricing';

// Get all pricing
export const getAllPricing = async (req: Request, res: Response) => {
  try {
    const pricing = await Pricing.find()
      .populate('metadata.lastUpdatedBy', 'name email')
      .sort({ category: 1 });
    
    res.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing',
    });
  }
};

// Get pricing by category
export const getPricingByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    
    const pricing = await Pricing.findOne({ category })
      .populate('metadata.lastUpdatedBy', 'name email');
    
    if (!pricing) {
      return res.status(404).json({
        success: false,
        error: 'Pricing not found for this category',
      });
    }
    
    res.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing',
    });
  }
};

// Update pricing (Finance Manager only)
export const updatePricing = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { items, notes } = req.body;
    const userId = (req as any).user?.id;
    
    let pricing = await Pricing.findOne({ category });
    
    if (!pricing) {
      // Create new pricing if it doesn't exist
      pricing = new Pricing({
        category,
        items: items || [],
        metadata: {
          lastUpdatedBy: userId,
          notes,
        },
      });
    } else {
      // Update existing pricing
      if (items) pricing.items = items;
      pricing.metadata = {
        lastUpdatedBy: userId,
        notes: notes || pricing.metadata.notes,
      };
    }
    
    await pricing.save();
    
    res.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update pricing',
    });
  }
};

// Add pricing item
export const addPricingItem = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { name, description, price, currency, billingPeriod, features, isPopular } = req.body;
    const userId = (req as any).user?.id;
    
    let pricing = await Pricing.findOne({ category });
    
    if (!pricing) {
      pricing = new Pricing({
        category,
        items: [],
        metadata: { lastUpdatedBy: userId },
      });
    }
    
    pricing.items.push({
      name,
      description,
      price,
      currency: currency || 'USD',
      billingPeriod: billingPeriod || 'one-time',
      features: features || [],
      isPopular: isPopular || false,
      isActive: true,
    });
    
    pricing.metadata.lastUpdatedBy = userId;
    await pricing.save();
    
    res.status(201).json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add pricing item',
    });
  }
};

// Update pricing item
export const updatePricingItem = async (req: Request, res: Response) => {
  try {
    const { category, itemId } = req.params;
    const updates = req.body;
    const userId = (req as any).user?.id;
    
    const pricing = await Pricing.findOne({ category });
    
    if (!pricing) {
      return res.status(404).json({
        success: false,
        error: 'Pricing not found',
      });
    }
    
    const item = pricing.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Pricing item not found',
      });
    }
    
    Object.assign(item, updates);
    pricing.metadata.lastUpdatedBy = userId;
    await pricing.save();
    
    res.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update pricing item',
    });
  }
};

// Delete pricing item
export const deletePricingItem = async (req: Request, res: Response) => {
  try {
    const { category, itemId } = req.params;
    const userId = (req as any).user?.id;
    
    const pricing = await Pricing.findOne({ category });
    
    if (!pricing) {
      return res.status(404).json({
        success: false,
        error: 'Pricing not found',
      });
    }
    
    pricing.items = pricing.items.filter((item: any) => item._id.toString() !== itemId);
    pricing.metadata.lastUpdatedBy = userId;
    await pricing.save();
    
    res.json({
      success: true,
      data: pricing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete pricing item',
    });
  }
};
