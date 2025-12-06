import express from 'express';
import { healthCheck, readinessCheck, livenessCheck, getMetrics } from '../utils/monitoring';

const router = express.Router();

router.get('/health', healthCheck);
router.get('/ready', readinessCheck);
router.get('/live', livenessCheck);
router.get('/metrics', getMetrics);

export default router;
