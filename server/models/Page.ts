import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
  pageType: 'devlab' | 'research' | 'collaboration' | 'internships' | 'arcadeum' | 'careers' | 'ai' | 'robotics' | 'space' | 'web';
  title: string;
  slug: string;
  content: {
    hero?: {
      title: string;
      subtitle: string;
      backgroundImage?: string;
    };
    sections?: Array<{
      id: string;
      type: 'text' | 'cards' | 'grid' | 'feature' | 'pricing';
      title?: string;
      content: any;
      order: number;
    }>;
  };
  metadata: {
    description?: string;
    keywords?: string[];
    author?: string;
    lastModifiedBy?: mongoose.Types.ObjectId;
  };
  images: string[];
  isPublished: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema<IPage> = new Schema(
  {
    pageType: {
      type: String,
      required: true,
      enum: ['devlab', 'research', 'collaboration', 'internships', 'arcadeum', 'careers', 'ai', 'robotics', 'space', 'web'],
      unique: true,
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: {
      hero: {
        title: String,
        subtitle: String,
        backgroundImage: String,
      },
      sections: [
        {
          id: String,
          type: { type: String, enum: ['text', 'cards', 'grid', 'feature', 'pricing'] },
          title: String,
          content: Schema.Types.Mixed,
          order: Number,
        },
      ],
    },
    metadata: {
      description: String,
      keywords: [String],
      author: String,
      lastModifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    images: [String],
    isPublished: { type: Boolean, default: true },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Indexes for performance
PageSchema.index({ pageType: 1 });
PageSchema.index({ slug: 1 });
PageSchema.index({ isPublished: 1 });

const Page = mongoose.model<IPage>('Page', PageSchema);

export default Page;
