import mongoose from 'mongoose';

const topicsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Topics = mongoose.model('Topics', topicsSchema);
export default Topics;
