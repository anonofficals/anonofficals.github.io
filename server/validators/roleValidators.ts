import { z } from 'zod';
import { AppRole } from '../models/UserRole';

export const assignRoleSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    role: z.nativeEnum(AppRole, { errorMap: () => ({ message: 'Invalid role' }) }),
    departmentId: z.string().optional(),
    reason: z.string().optional(),
    expiresAt: z.string().datetime().optional(),
  }),
});

export const revokeRoleSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    role: z.nativeEnum(AppRole, { errorMap: () => ({ message: 'Invalid role' }) }),
    reason: z.string().optional(),
  }),
});

export const bulkAssignRolesSchema = z.object({
  body: z.object({
    assignments: z.array(
      z.object({
        userId: z.string().min(1),
        role: z.nativeEnum(AppRole),
        departmentId: z.string().optional(),
      })
    ).min(1, 'At least one assignment required'),
    reason: z.string().optional(),
  }),
});

export const updateRoleSchema = z.object({
  body: z.object({
    departmentId: z.string().optional(),
    expiresAt: z.string().datetime().optional().nullable(),
    isActive: z.boolean().optional(),
  }),
});
