const mongoose = require('mongoose');

//subject matter experts
const smeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {type:String, unique: true, required: true},
  password:{type:String, required: true},
  expertise: [{ type: String, required: true }],
  qualifications:[{ type: String, required: true }],
});

module.exports = mongoose.model('Sme', smeSchema);