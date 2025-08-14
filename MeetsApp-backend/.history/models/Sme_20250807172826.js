const mongoose = require('mongoose');

//subject matter experts
const smeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {typeLString,
  password: String,
  type: String, // School, College, etc.
  description: String,
});

module.exports = mongoose.model('Sme', smeSchema);