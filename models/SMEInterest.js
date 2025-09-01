import mongoose from 'mongoose';

const smeInterestSchema = new mongoose.Schema({
  sme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sme',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institutions',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'on_hold'],
    default: 'pending'
  },
  message: {
    type: String,
    default: ''
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institutions'
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
smeInterestSchema.index({ sme: 1, event: 1 }, { unique: true }); // One interest per SME per event
smeInterestSchema.index({ event: 1, status: 1 }); // Filter by event and status
smeInterestSchema.index({ institution: 1, status: 1 }); // Institution's pending interests
smeInterestSchema.index({ sme: 1, status: 1 }); // SME's interest status

const SMEInterest = mongoose.model('SMEInterest', smeInterestSchema);

export default SMEInterest;
