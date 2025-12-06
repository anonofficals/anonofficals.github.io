import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  description?: string;
  hodId?: mongoose.Types.ObjectId;
  budget?: {
    total: number;
    allocated: number;
    spent: number;
    currency: string;
  };
  isActive: boolean;
  metadata?: {
    location?: string;
    employees?: number;
    projects?: number;
  };
}

const DepartmentSchema: Schema<IDepartment> = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },
    hodId: { type: Schema.Types.ObjectId, ref: 'User' },
    budget: {
      total: { type: Number, default: 0 },
      allocated: { type: Number, default: 0 },
      spent: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    isActive: { type: Boolean, default: true },
    metadata: {
      location: String,
      employees: Number,
      projects: Number,
    },
  },
  { timestamps: true }
);

// Indexes
DepartmentSchema.index({ code: 1 });
DepartmentSchema.index({ hodId: 1 });
DepartmentSchema.index({ isActive: 1 });

const Department = mongoose.model<IDepartment>('Department', DepartmentSchema);

export default Department;
