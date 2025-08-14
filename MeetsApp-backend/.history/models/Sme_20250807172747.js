const mongoose = require('mongoose');

//subject matter experts
const sme = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  location: String,
  type: String, // School, College, etc.
  description: String,
});

module.exports = mongoose.model('Institution', institutionSchema);