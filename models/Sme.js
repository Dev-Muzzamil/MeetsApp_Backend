import mongoose from 'mongoose';

// Subject Matter Experts
const smeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  expertise: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Topics', required: true }
  ],
  qualifications: {
    type: [String],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0
  },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institutions', required: false },
  createdAt: { type: Date, default: Date.now }
});

const Sme = mongoose.model('Sme', smeSchema);
export default Sme;