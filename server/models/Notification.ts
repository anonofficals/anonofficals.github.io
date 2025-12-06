import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  message: string;
  relatedTo?: {
    model: string;
    id: mongoose.Types.ObjectId;
  };
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'application_received',
        'application_reviewed',
        'application_accepted',
        'application_rejected',
        'payment_received',
        'payment_failed',
        'deadline_reminder',
        'system_announcement',
        'other',
      ],
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedTo: {
      model: String,
      id: Schema.Types.ObjectId,
    },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
