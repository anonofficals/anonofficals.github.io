import { Request, Response } from 'express';
import RoleAssignment, { AssignmentAction } from '../models/RoleAssignment';
import { AppRole } from '../models/UserRole';
import { asyncHandler } from '../middleware/errorMiddleware';

// Get all audit logs
export const getAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { 
    userId, 
    role, 
    action, 
    performedBy,
    startDate,
    endDate,
    page = 1, 
    limit = 50 
  } = req.query;

  const filter: any = {};
  
  if (userId) filter.userId = userId;
  if (role) filter.role = role;
  if (action) filter.action = action;
  if (performedBy) filter.performedBy = performedBy;
  
  if (startDate || endDate) {
    filter.performedAt = {};
    if (startDate) filter.performedAt.$gte = new Date(startDate as string);
    if (endDate) filter.performedAt.$lte = new Date(endDate as string);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const logs = await RoleAssignment.find(filter)
    .populate('userId', 'name email')
    .populate('performedBy', 'name email')
    .populate('departmentId', 'name code')
    .skip(skip)
    .limit(Number(limit))
    .sort({ performedAt: -1 });

  const total = await RoleAssignment.countDocuments(filter);

  res.json({
    success: true,
    data: logs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// Get user audit history
export const getUserAuditHistory = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const logs = await RoleAssignment.find({ userId })
    .populate('performedBy', 'name email')
    .populate('departmentId', 'name code')
    .skip(skip)
    .limit(Number(limit))
    .sort({ performedAt: -1 });

  const total = await RoleAssignment.countDocuments({ userId });

  res.json({
    success: true,
    data: logs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// Get audit statistics
export const getAuditStatistics = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  const filter: any = {};
  
  if (startDate || endDate) {
    filter.performedAt = {};
    if (startDate) filter.performedAt.$gte = new Date(startDate as string);
    if (endDate) filter.performedAt.$lte = new Date(endDate as string);
  }

  // Count by action
  const actionStats = await RoleAssignment.aggregate([
    { $match: filter },
    { $group: { _id: '$action', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Count by role
  const roleStats = await RoleAssignment.aggregate([
    { $match: filter },
    { $group: { _id: '$role', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Most active users (who performed actions)
  const activeUsers = await RoleAssignment.aggregate([
    { $match: filter },
    { $group: { _id: '$performedBy', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        count: 1,
        name: '$user.name',
        email: '$user.email',
      },
    },
  ]);

  // Recent activity timeline (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const timeline = await RoleAssignment.aggregate([
    {
      $match: {
        performedAt: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$performedAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    data: {
      actionStats,
      roleStats,
      activeUsers,
      timeline,
      totalLogs: await RoleAssignment.countDocuments(filter),
    },
  });
});

// Get recent activity
export const getRecentActivity = asyncHandler(async (req: Request, res: Response) => {
  const { limit = 20 } = req.query;

  const recentLogs = await RoleAssignment.find()
    .populate('userId', 'name email')
    .populate('performedBy', 'name email')
    .populate('departmentId', 'name code')
    .limit(Number(limit))
    .sort({ performedAt: -1 });

  res.json({
    success: true,
    data: recentLogs,
  });
});

// Export audit logs (for compliance)
export const exportAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate, format = 'json' } = req.query;

  const filter: any = {};
  
  if (startDate || endDate) {
    filter.performedAt = {};
    if (startDate) filter.performedAt.$gte = new Date(startDate as string);
    if (endDate) filter.performedAt.$lte = new Date(endDate as string);
  }

  const logs = await RoleAssignment.find(filter)
    .populate('userId', 'name email')
    .populate('performedBy', 'name email')
    .populate('departmentId', 'name code')
    .sort({ performedAt: -1 })
    .lean();

  if (format === 'csv') {
    // TODO: Convert to CSV format
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=audit-logs.csv');
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=audit-logs.json');
  }

  res.json({
    success: true,
    data: logs,
    exportedAt: new Date(),
    filter,
  });
});
