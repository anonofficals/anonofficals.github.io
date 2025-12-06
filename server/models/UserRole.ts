import mongoose, { Document, Schema } from 'mongoose';

export enum AppRole {
  CEO = 'ceo',
  CONTENT_MANAGER = 'content_manager',
  FINANCE_MANAGER = 'finance_manager',
  HR = 'hr',
  HOD = 'hod',
  PROJECT_MANAGER = 'project_manager',
  AUDITOR = 'auditor',
  EMPLOYEE = 'employee',
  INTERN = 'intern',
  STUDENT = 'student',
  CLIENT = 'client',
  RESEARCH_COLLABORATOR = 'research_collaborator',
  USER = 'user',
}

export interface IUserRole extends Document {
  userId: mongoose.Types.ObjectId;
  role: AppRole;
  departmentId?: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    reason?: string;
    notes?: string;
  };
}

const UserRoleSchema: Schema<IUserRole> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
      type: String,
      enum: Object.values(AppRole),
      required: true,
    },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
    metadata: {
      ipAddress: String,
      userAgent: String,
      reason: String,
      notes: String,
    },
  },
  { timestamps: true }
);

// Indexes for performance
UserRoleSchema.index({ userId: 1, role: 1 });
UserRoleSchema.index({ userId: 1, isActive: 1 });
UserRoleSchema.index({ role: 1 });
UserRoleSchema.index({ departmentId: 1 });
UserRoleSchema.index({ expiresAt: 1 });

// Compound unique index to prevent duplicate active roles
UserRoleSchema.index(
  { userId: 1, role: 1, departmentId: 1 },
  { 
    unique: true, 
    partialFilterExpression: { isActive: true } 
  }
);

const UserRole = mongoose.model<IUserRole>('UserRole', UserRoleSchema);

export default UserRole;
