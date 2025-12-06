import mongoose, { Document, Schema } from 'mongoose';

export interface IContentBlock extends Document {
  pageId: mongoose.Types.ObjectId;
  blockType: 'hero' | 'section' | 'card' | 'pricing' | 'team' | 'project' | 'research';
  title?: string;
  content: {
    text?: string;
    html?: string;
    data?: any;
  };
  images: string[];
  order: number;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentBlockSchema: Schema<IContentBlock> = new Schema(
  {
    pageId: { type: Schema.Types.ObjectId, ref: 'Page', required: true },
    blockType: {
      type: String,
      required: true,
      enum: ['hero', 'section', 'card', 'pricing', 'team', 'project', 'research'],
    },
    title: String,
    content: {
      text: String,
      html: String,
      data: Schema.Types.Mixed,
    },
    images: [String],
    order: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Indexes
ContentBlockSchema.index({ pageId: 1, order: 1 });
ContentBlockSchema.index({ blockType: 1 });
ContentBlockSchema.index({ isActive: 1 });

const ContentBlock = mongoose.model<IContentBlock>('ContentBlock', ContentBlockSchema);

export default ContentBlock;
