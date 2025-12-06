import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  userId: mongoose.Types.ObjectId;
  employeeId: string;
  departmentId: mongoose.Types.ObjectId;
  position: string;
  salary?: number;
  joinDate: Date;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  performance?: {
    rating: number;
    reviews: Array<{
      date: Date;
      rating: number;
      comments: string;
      reviewerId: mongoose.Types.ObjectId;
    }>;
  };
  status: 'active' | 'on_leave' | 'inactive' | 'terminated';
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema<IEmployee> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true, unique: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  position: { type: String, required: true },
  salary: { type: Number },
  joinDate: { type: Date, required: true },
  phone: String,
  address: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  performance: {
    rating: { type: Number, min: 0, max: 5 },
    reviews: [{
      date: Date,
      rating: Number,
      comments: String,
      reviewerId: Schema.Types.ObjectId
    }]
  },
  status: { 
    type: String, 
    enum: ['active', 'on_leave', 'inactive', 'terminated'],
    default: 'active'
  }
}, { timestamps: true });

EmployeeSchema.index({ userId: 1 });
EmployeeSchema.index({ departmentId: 1 });
EmployeeSchema.index({ employeeId: 1 });
EmployeeSchema.index({ status: 1 });

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
