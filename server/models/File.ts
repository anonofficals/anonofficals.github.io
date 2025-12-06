import mongoose, { Document, Schema } from 'mongoose';

export interface IFile extends Document {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedBy?: mongoose.Types.ObjectId;
  relatedTo?: {
    model: string;
    id: mongoose.Types.ObjectId;
  };
  uploadedAt: Date;
}

const FileSchema: Schema<IFile> = new Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    path: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    relatedTo: {
      model: String,
      id: Schema.Types.ObjectId,
    },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FileSchema.index({ uploadedBy: 1 });
FileSchema.index({ 'relatedTo.model': 1, 'relatedTo.id': 1 });

const File = mongoose.model<IFile>('File', FileSchema);

export default File;
