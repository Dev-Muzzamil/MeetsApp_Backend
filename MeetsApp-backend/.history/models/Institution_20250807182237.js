const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  location: String,
  type: String, // School, College, etc.
  description: String,
});

const Institution = mongoose.model('Institution', institutionSchema);