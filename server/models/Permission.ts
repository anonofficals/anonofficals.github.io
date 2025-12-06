import mongoose, { Document, Schema } from 'mongoose';
import { AppRole } from './UserRole';

export enum PermissionCategory {
  USERS = 'users',
  ROLES = 'roles',
  DEPARTMENTS = 'departments',
  APPLICATIONS = 'applications',
  CONTENT = 'content',
  PAGES = 'pages',
  PRICING = 'pricing',
  PAYMENTS = 'payments',
  PROJECTS = 'projects',
  ANALYTICS = 'analytics',
  AUDIT = 'audit',
  FILES = 'files',
}

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
  APPROVE = 'approve',
  REJECT = 'reject',
  EXPORT = 'export',
}

export interface IPermission extends Document {
  role: AppRole;
  category: PermissionCategory;
  action: PermissionAction;
  resource?: string;
  conditions?: Record<string, any>;
  description?: string;
  isActive: boolean;
}

const PermissionSchema: Schema<IPermission> = new Schema(
  {
    role: {
      type: String,
      enum: Object.values(AppRole),
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(PermissionCategory),
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(PermissionAction),
      required: true,
    },
    resource: { type: String },
    conditions: { type: Schema.Types.Mixed },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes
PermissionSchema.index({ role: 1, category: 1 });
PermissionSchema.index({ role: 1, category: 1, action: 1 });
PermissionSchema.index({ isActive: 1 });

// Compound unique index
PermissionSchema.index(
  { role: 1, category: 1, action: 1, resource: 1 },
  { unique: true }
);

const Permission = mongoose.model<IPermission>('Permission', PermissionSchema);

export default Permission;
