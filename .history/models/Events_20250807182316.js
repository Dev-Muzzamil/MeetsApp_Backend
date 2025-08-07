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
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  volunteer: { type: String, default: null },
});

const  = mongoose.model('Event', eventSchema);