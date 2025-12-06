import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  departmentId: mongoose.Types.ObjectId;
  managerId: mongoose.Types.ObjectId;
  teamMembers: mongoose.Types.ObjectId[];
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  budget?: number;
  startDate: Date;
  endDate?: Date;
  completionDate?: Date;
  progress: number;
  milestones?: Array<{
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
    completedAt?: Date;
  }>;
  documents?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  managerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { 
    type: String, 
    enum: ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  budget: Number,
  startDate: { type: Date, required: true },
  endDate: Date,
  completionDate: Date,
  progress: { type: Number, default: 0, min: 0, max: 100 },
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: { type: Boolean, default: false },
    completedAt: Date
  }],
  documents: [String],
  tags: [String]
}, { timestamps: true });

ProjectSchema.index({ departmentId: 1 });
ProjectSchema.index({ managerId: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ priority: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
