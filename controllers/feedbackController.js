import Feedback from '../models/Feedback.js';
import Event from '../models/Events.js';

// Create or update institution feedback
export const submitInstitutionFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { institutionId, rating, review, photos } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    let feedback = await Feedback.findOne({ event: eventId });
    
    if (!feedback) {
      feedback = new Feedback({
        event: eventId,
        institution: institutionId,
        sme: event.sme
      });
    }

    feedback.institutionFeedback = {
      rating,
      review,
      photos: photos || [],
      submitted: true
    };

    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'Institution feedback submitted successfully',
      data: feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Create or update SME feedback
export const submitSMEFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { smeId, rating, review, arrangements } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    let feedback = await Feedback.findOne({ event: eventId });
    
    if (!feedback) {
      feedback = new Feedback({
        event: eventId,
        institution: event.institution,
        sme: smeId
      });
    }

    feedback.smeFeedback = {
      rating,
      review,
      arrangements: arrangements || {},
      submitted: true
    };

    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'SME feedback submitted successfully',
      data: feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Get feedback for an event
export const getEventFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;

    const feedback = await Feedback.findOne({ event: eventId })
      .populate('event', 'title topic date')
      .populate('institution', 'name')
      .populate('sme', 'name');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'No feedback found for this event'
      });
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Get completed events for institution (for feedback)
export const getCompletedEventsForInstitution = async (req, res) => {
  try {
    const { institutionId } = req.params;

    const events = await Event.find({ 
      institution: institutionId, 
      status: 'completed',
      sme: { $ne: null }
    }).populate('sme', 'name expertise');

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};

// Get completed events for SME (for feedback)
export const getCompletedEventsForSME = async (req, res) => {
  try {
    const { smeId } = req.params;

    const events = await Event.find({ 
      sme: smeId, 
      status: 'completed'
    }).populate('institution', 'name location');

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};