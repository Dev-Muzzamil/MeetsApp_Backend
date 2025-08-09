const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  topic: String,
  description: String,
  date: String,
  time: String,
  location: String,
  participants: {
    type: { type: String },
    count: Number,
  },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institutions' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  volunteer: { type: String, default: null },
  sme
});

const Events = mongoose.model('Events', eventSchema);

export default Events;