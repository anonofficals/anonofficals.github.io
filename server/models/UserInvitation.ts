import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';
import { AppRole } from './UserRole';

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
}

export interface IUserInvitation extends Document {
  email: string;
  role: AppRole;
  departmentId?: mongoose.Types.ObjectId;
  invitedBy: mongoose.Types.ObjectId;
  invitedAt: Date;
  token: string;
  expiresAt: Date;
  status: InvitationStatus;
  acceptedAt?: Date;
  acceptedUserId?: mongoose.Types.ObjectId;
  metadata?: {
    message?: string;
    permissions?: string[];
  };
  generateToken(): string;
  isExpired(): boolean;
}

const UserInvitationSchema: Schema<IUserInvitation> = new Schema(
  {
    email: { type: String, required: true, lowercase: true },
    role: {
      type: String,
      enum: Object.values(AppRole),
      required: true,
    },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    invitedAt: { type: Date, default: Date.now },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(InvitationStatus),
      default: InvitationStatus.PENDING,
    },
    acceptedAt: { type: Date },
    acceptedUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    metadata: {
      message: String,
      permissions: [String],
    },
  },
  { timestamps: true }
);

// Indexes
UserInvitationSchema.index({ email: 1, status: 1 });
UserInvitationSchema.index({ token: 1 });
UserInvitationSchema.index({ invitedBy: 1 });
UserInvitationSchema.index({ expiresAt: 1 });

// Methods
UserInvitationSchema.methods.generateToken = function (): string {
  this.token = crypto.randomBytes(32).toString('hex');
  return this.token;
};

UserInvitationSchema.methods.isExpired = function (): boolean {
  return Date.now() > this.expiresAt.getTime();
};

// Pre-save hook to set expiration date (7 days from now)
UserInvitationSchema.pre<IUserInvitation>('save', function (next) {
  if (this.isNew && !this.expiresAt) {
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  next();
});

const UserInvitation = mongoose.model<IUserInvitation>('UserInvitation', UserInvitationSchema);

export default UserInvitation;
