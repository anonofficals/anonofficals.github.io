import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaveRequest extends Document {
  employeeId: mongoose.Types.ObjectId;
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'other';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  documents?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema: Schema<ILeaveRequest> = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { 
    type: String, 
    enum: ['sick', 'vacation', 'personal', 'maternity', 'other'],
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedAt: Date,
  rejectionReason: String,
  documents: [String]
}, { timestamps: true });

LeaveRequestSchema.index({ employeeId: 1 });
LeaveRequestSchema.index({ status: 1 });
LeaveRequestSchema.index({ startDate: 1 });

export default mongoose.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema);
