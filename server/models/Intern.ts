import mongoose, { Document, Schema } from 'mongoose';

export interface IIntern extends Document {
  name: string;
  email: string;
  phone?: string;
  university: string;
  program: string;
  departmentId: mongoose.Types.ObjectId;
  supervisorId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  stipend?: number;
  status: 'active' | 'completed' | 'terminated';
  performance?: {
    rating: number;
    feedback: string;
    evaluatedBy: mongoose.Types.ObjectId;
    evaluatedAt: Date;
  };
  documents?: {
    resume?: string;
    coverLetter?: string;
    universityVerification?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const InternSchema: Schema<IIntern> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  university: { type: String, required: true },
  program: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  supervisorId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  stipend: Number,
  status: { 
    type: String, 
    enum: ['active', 'completed', 'terminated'],
    default: 'active'
  },
  performance: {
    rating: Number,
    feedback: String,
    evaluatedBy: Schema.Types.ObjectId,
    evaluatedAt: Date
  },
  documents: {
    resume: String,
    coverLetter: String,
    universityVerification: String
  }
}, { timestamps: true });

InternSchema.index({ email: 1 });
InternSchema.index({ departmentId: 1 });
InternSchema.index({ status: 1 });

export default mongoose.model<IIntern>('Intern', InternSchema);
