const mongoose = require('mongoose');

//subject materexperts
const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  location: String,
  type: String, // School, College, etc.
  description: String,
});

module.exports = mongoose.model('Institution', institutionSchema);