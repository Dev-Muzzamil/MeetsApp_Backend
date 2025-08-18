import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Events', required: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institutions', required: true },
  sme: { type: mongoose.Schema.Types.ObjectId, ref: 'Sme', required: true },
  
  // Institution feedback about SME
  institutionFeedback: {
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    photos: [String], // URLs to uploaded photos
    submitted: { type: Boolean, default: false }
  },
  
  // SME feedback about institution
  smeFeedback: {
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    arrangements: {
      venue: { type: Number, min: 1, max: 5 },
      participants: { type: Number, min: 1, max: 5 },
      organization: { type: Number, min: 1, max: 5 }
    },
    submitted: { type: Boolean, default: false }
  },
  
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;