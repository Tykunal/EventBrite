import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
  email: string;
  eventId: mongoose.Types.ObjectId; 
  subscribedAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Timestamp when the subscription is created
  },
});

export default mongoose.models?.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema, "Subscription");
