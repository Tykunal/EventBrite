import mongoose, {Schema, Document} from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: string; 
  location: string;
  description?: string;
  link: string;
}

const EventSchema: Schema= new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  link: { type: String, required: true }
});

export default mongoose.models?.Event || mongoose.model<IEvent>('Event', EventSchema, "Event");

