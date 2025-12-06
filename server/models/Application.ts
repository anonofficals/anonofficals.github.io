import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  formType: string;
  targetId?: string;
  targetTitle?: string;
  applicantData: Record<string, any>;
  status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  reviewNotes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  submittedAt: Date;
  files?: Array<{
    fieldName: string;
    fileId: mongoose.Types.ObjectId;
  }>;
}

const ApplicationSchema: Schema<IApplication> = new Schema(
  {
    formType: {
      type: String,
      required: true,
      enum: [
        'internship',
        'hackathon',
        'challenge',
        'collaboration',
        'fellowship',
        'research_grant',
        'startup_incubation',
        'tech_partnership',
        'global_exchange',
        'other_opportunity',
      ],
    },
    targetId: { type: String },
    targetTitle: { type: String },
    applicantData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'under_review', 'shortlisted', 'accepted', 'rejected'],
      default: 'pending',
    },
    reviewNotes: { type: String },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    submittedAt: { type: Date, default: Date.now },
    files: [
      {
        fieldName: String,
        fileId: { type: Schema.Types.ObjectId, ref: 'File' },
      },
    ],
  },
  { timestamps: true }
);

ApplicationSchema.index({ formType: 1, status: 1 });
ApplicationSchema.index({ submittedAt: -1 });
ApplicationSchema.index({ 'applicantData.email': 1 });

const Application = mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
