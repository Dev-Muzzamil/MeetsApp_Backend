import SMEInterest from '../models/SMEInterest.js';
import Events from '../models/Events.js';
import Sme from '../models/Sme.js';
import Institutions from '../models/Institution.js';
import { sendEmail, emailTemplates } from '../utils/emailService.js';

// SME shows interest in an event
export const createInterest = async (req, res) => {
  try {
    const { eventId, message } = req.body;
    const smeId = req.user.id; // From JWT middleware

    // Check if event exists and is still available
    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if SME already applied for this event
    const existingInterest = await SMEInterest.findOne({ sme: smeId, event: eventId });
    if (existingInterest) {
      return res.status(400).json({ message: 'You have already applied for this event' });
    }

    // Check if SME has required expertise
    const sme = await Sme.findById(smeId);
    if (!sme.expertise.includes(event.topic)) {
      return res.status(400).json({ message: 'You do not have the required expertise for this event' });
    }

    // Create interest
    const interest = new SMEInterest({
      sme: smeId,
      event: eventId,
      institution: event.institution,
      message: message || ''
    });

    await interest.save();

    // Send email to institution
    const institution = await Institutions.findById(event.institution);
    if (institution && institution.email) {
      await sendEmail({
        to: institution.email,
        subject: `New SME Interest: ${event.title}`,
        html: `
          <h2>New SME Interest for Your Event</h2>
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>SME:</strong> ${sme.name}</p>
          <p><strong>Expertise:</strong> ${sme.expertise.join(', ')}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          <p>Please review this application in your dashboard.</p>
          <a href="${process.env.FRONTEND_URL}/dashboard">Review Applications</a>
        `
      });
    }

    res.status(201).json({
      message: 'Interest submitted successfully',
      interest: {
        _id: interest._id,
        status: interest.status,
        appliedAt: interest.appliedAt
      }
    });
  } catch (error) {
    console.error('Create interest error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all interests for an institution
export const getInstitutionInterests = async (req, res) => {
  try {
    const institutionId = req.user.id;
    const { status } = req.query;

    const query = { institution: institutionId };
    if (status) {
      query.status = status;
    }

    const interests = await SMEInterest.find(query)
      .populate('sme', 'name email expertise qualifications')
      .populate('event', 'title topic date time location')
      .sort({ appliedAt: -1 });

    res.json(interests);
  } catch (error) {
    console.error('Get institution interests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get SME's own interests
export const getSMEInterests = async (req, res) => {
  try {
    const smeId = req.user.id;

    const interests = await SMEInterest.find({ sme: smeId })
      .populate('event', 'title topic date time location status')
      .populate('institution', 'name email')
      .sort({ appliedAt: -1 });

    res.json(interests);
  } catch (error) {
    console.error('Get SME interests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve or reject SME interest
export const reviewInterest = async (req, res) => {
  try {
    const { interestId } = req.params;
    const { action, message } = req.body; // action: 'approve', 'reject', or 'on_hold'
    const institutionId = req.user.id;

    const interest = await SMEInterest.findById(interestId)
      .populate('sme', 'name email')
      .populate('event', 'title');

    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    if (interest.institution.toString() !== institutionId) {
      return res.status(403).json({ message: 'Not authorized to review this interest' });
    }

    if (interest.status !== 'pending' && interest.status !== 'on_hold') {
      return res.status(400).json({ message: 'Interest has already been reviewed' });
    }

    // Update interest status
    interest.status = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'on_hold';
    interest.reviewedAt = new Date();
    interest.reviewedBy = institutionId;
    if (message) {
      interest.message = message;
    }

    await interest.save();

    // Send email to SME based on action
    let statusText = '';
    let emailTemplate = null;

    if (action === 'approve') {
      statusText = 'approved';
      emailTemplate = emailTemplates.interestApproved(interest.event, await Institutions.findById(interest.institution), message);
    } else if (action === 'reject') {
      statusText = 'rejected';
      emailTemplate = emailTemplates.interestRejected(interest.event, await Institutions.findById(interest.institution), message);
    } else if (action === 'on_hold') {
      statusText = 'on hold';
      emailTemplate = emailTemplates.interestOnHold(interest.event, await Institutions.findById(interest.institution), message);
    }

    if (emailTemplate) {
      await sendEmail({
        to: interest.sme.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html
      });
    }

    res.json({
      message: `Interest ${statusText} successfully`,
      interest
    });
  } catch (error) {
    console.error('Review interest error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single interest details
export const getInterestDetails = async (req, res) => {
  try {
    const { interestId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const interest = await SMEInterest.findById(interestId)
      .populate('sme', 'name email expertise qualifications')
      .populate('event', 'title topic date time location description')
      .populate('institution', 'name email location')
      .populate('reviewedBy', 'name');

    if (!interest) {
      return res.status(404).json({ message: 'Interest not found' });
    }

    // Check if user has permission to view this interest
    if (userRole === 'institution' && interest.institution.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (userRole === 'sme' && interest.sme._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(interest);
  } catch (error) {
    console.error('Get interest details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
