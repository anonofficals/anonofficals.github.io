import mongoose, { Document, Schema } from 'mongoose';

export interface IPricingItem {
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod?: 'one-time' | 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
}

export interface IPricing extends Document {
  category: 'features' | 'collaboration' | 'internships' | 'hackathons' | 'opportunities' | 'arcadeum';
  items: IPricingItem[];
  metadata: {
    lastUpdatedBy: mongoose.Types.ObjectId;
    notes?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PricingItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  billingPeriod: { type: String, enum: ['one-time', 'monthly', 'yearly'], default: 'one-time' },
  features: [String],
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

const PricingSchema: Schema<IPricing> = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['features', 'collaboration', 'internships', 'hackathons', 'opportunities', 'arcadeum'],
      unique: true,
    },
    items: [PricingItemSchema],
    metadata: {
      lastUpdatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      notes: String,
    },
  },
  { timestamps: true }
);

// Indexes
PricingSchema.index({ category: 1 });

const Pricing = mongoose.model<IPricing>('Pricing', PricingSchema);

export default Pricing;
