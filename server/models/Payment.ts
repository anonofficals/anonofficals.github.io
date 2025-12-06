import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  userId?: mongoose.Types.ObjectId;
  applicationId?: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'other';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentGateway?: string;
  paymentData?: Record<string, any>;
  paidAt?: Date;
}

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: { type: String },
    paymentGateway: { type: String },
    paymentData: { type: Schema.Types.Mixed },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ applicationId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
