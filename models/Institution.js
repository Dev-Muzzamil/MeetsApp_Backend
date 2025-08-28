import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  password: String,
  location: String,
  type: String, // School, College, etc.
  description: String,
  // coordinates removed
});

const Institutions = mongoose.model('Institutions', institutionSchema);

export default Institutions;