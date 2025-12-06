import mongoose, { Document, Schema } from 'mongoose';
import { AppRole } from './UserRole';

export enum AssignmentAction {
  ASSIGN = 'assign',
  REVOKE = 'revoke',
  EXPIRE = 'expire',
  MODIFY = 'modify',
}

export interface IRoleAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  role: AppRole;
  action: AssignmentAction;
  performedBy: mongoose.Types.ObjectId;
  performedAt: Date;
  departmentId?: mongoose.Types.ObjectId;
  reason?: string;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    previousDepartment?: mongoose.Types.ObjectId;
    newDepartment?: mongoose.Types.ObjectId;
    expiresAt?: Date;
  };
}

const RoleAssignmentSchema: Schema<IRoleAssignment> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
      type: String,
      enum: Object.values(AppRole),
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(AssignmentAction),
      required: true,
    },
    performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    performedAt: { type: Date, default: Date.now },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    reason: { type: String },
    metadata: {
      ipAddress: String,
      userAgent: String,
      previousDepartment: Schema.Types.ObjectId,
      newDepartment: Schema.Types.ObjectId,
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

// Indexes for audit queries
RoleAssignmentSchema.index({ userId: 1, performedAt: -1 });
RoleAssignmentSchema.index({ performedBy: 1, performedAt: -1 });
RoleAssignmentSchema.index({ role: 1, action: 1 });
RoleAssignmentSchema.index({ performedAt: -1 });

const RoleAssignment = mongoose.model<IRoleAssignment>('RoleAssignment', RoleAssignmentSchema);

export default RoleAssignment;
