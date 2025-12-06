import { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';

export const healthCheck = async (req: Request, res: Response) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbState];

    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStatus,
        connected: dbState === 1
      },
      system: {
        platform: os.platform(),
        nodeVersion: process.version,
        memory: {
          total: os.totalmem(),
          free: os.freemem(),
          used: os.totalmem() - os.freemem()
        },
        cpu: os.cpus().length
      },
      environment: process.env.NODE_ENV || 'development'
    };

    const statusCode = dbState === 1 ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const readinessCheck = async (req: Request, res: Response) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready' });
  }
};

export const livenessCheck = (req: Request, res: Response) => {
  res.status(200).json({ status: 'alive' });
};

export const getMetrics = (req: Request, res: Response) => {
  const metrics = {
    timestamp: new Date().toISOString(),
    process: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage()
    },
    system: {
      loadAverage: os.loadavg(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem()
    }
  };

  res.json(metrics);
};
