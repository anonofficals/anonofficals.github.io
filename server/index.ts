import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db';
import { swaggerSpec } from './config/swagger';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import { apiLimiter, authLimiter } from './middleware/rateLimitMiddleware';
import { sanitizeInput } from './middleware/validationMiddleware';

// Routes
import authRoutes from './routes/auth';
import rolesRoutes from './routes/roles';
import permissionsRoutes from './routes/permissions';
import invitationsRoutes from './routes/invitations';
import auditRoutes from './routes/audit';
import dashboardRoutes from './routes/dashboard';
import projectRoutes from './routes/projects';
import departmentRoutes from './routes/departments';
import staffRoutes from './routes/staff';
import analyticsRoutes from './routes/analytics';
import internRoutes from './routes/interns';
import pagesRoutes from './routes/pages';
import contentRoutes from './routes/content';
import pricingRoutes from './routes/pricing';
import applicationsRoutes from './routes/applications';
import fileRoutes from './routes/files';
import leaveRoutes from './routes/leave';
import healthRoutes from './routes/health';
import notificationRoutes from './routes/notifications';
import paymentRoutes from './routes/payments';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// API routes with rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/roles', apiLimiter, rolesRoutes);
app.use('/api/permissions', apiLimiter, permissionsRoutes);
app.use('/api/invitations', apiLimiter, invitationsRoutes);
app.use('/api/audit', apiLimiter, auditRoutes);
app.use('/api/applications', apiLimiter, applicationsRoutes);
app.use('/api/dashboard', apiLimiter, dashboardRoutes);
app.use('/api/projects', apiLimiter, projectRoutes);
app.use('/api/departments', apiLimiter, departmentRoutes);
app.use('/api/staff', apiLimiter, staffRoutes);
app.use('/api/analytics', apiLimiter, analyticsRoutes);
app.use('/api/interns', apiLimiter, internRoutes);
app.use('/api/pages', apiLimiter, pagesRoutes);
app.use('/api/content', apiLimiter, contentRoutes);
app.use('/api/pricing', apiLimiter, pricingRoutes);
app.use('/api/files', apiLimiter, fileRoutes);
app.use('/api/leave', apiLimiter, leaveRoutes);
app.use('/api/notifications', apiLimiter, notificationRoutes);
app.use('/api/payments', apiLimiter, paymentRoutes);
app.use('/health', healthRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
});
