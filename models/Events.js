import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  topic: { type: String, required: true }, // ensure no ref or ObjectId
  description: String,
  date: String,
  time: String,
  location: String,
  participants: {
    type: Number,
    required: false
  },
  participantsType: {
    type: String,
    required: false,
    default: ''
  },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institutions' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  volunteer: { type: String, default: null },
  sme: { type: mongoose.Schema.Types.ObjectId, ref: 'Sme', default: null },
});

const Events = mongoose.model('Events', eventSchema);

export default Events;