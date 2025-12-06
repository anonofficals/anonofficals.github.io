import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  getAllPricing,
  getPricingByCategory,
  updatePricing,
  addPricingItem,
  updatePricingItem,
  deletePricingItem,
} from '../controllers/pricingController';

const router = express.Router();

// Public routes
router.get('/', getAllPricing);
router.get('/:category', getPricingByCategory);

// Protected routes (Finance Manager)
router.put('/:category', protect, updatePricing);
router.post('/:category/items', protect, addPricingItem);
router.put('/:category/items/:itemId', protect, updatePricingItem);
router.delete('/:category/items/:itemId', protect, deletePricingItem);

export default router;
