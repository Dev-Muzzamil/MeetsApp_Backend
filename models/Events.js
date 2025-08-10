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
  sme: { type: mongoose.Schema.Types.ObjectId, ref: 'Sme', default: null },
});

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;
// export default Events;