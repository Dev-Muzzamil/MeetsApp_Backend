import Event from '../models/Events.js';
import Sme from '../models/Sme.js';

// Get all available events (not yet assigned to SME)
export const getAvailableEvents = async (req, res) => {
  try {
    const events = await Event.find({ sme: null, status: 'pending' })
      .populate('institution', 'name location type')
      .populate('topic', 'name')
      .sort({ date: 1 });

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

// Get relevant events for an SME based on their expertise (Topics)
export const getRelevantEvents = async (req, res) => {
  try {
    const { smeId } = req.params;

    if (!smeId) {
      return res.status(400).json({ success: false, message: 'smeId is required' });
    }

    // Fetch SME with expertise populated to get Topic IDs
    const sme = await Sme.findById(smeId).populate('expertise', '_id name');
    if (!sme) {
      return res.status(404).json({ success: false, message: 'SME not found' });
    }

    const expertiseIds = (sme.expertise || []).map((t) => t._id);

    // Find events where topic is one of SME's expertise and not yet assigned
    const events = await Event.find({
      topic: { $in: expertiseIds },
      sme: null,
      status: 'pending'
    })
      .populate('institution', 'name location type')
      .populate('topic', 'name')
      .sort({ date: 1 });

    return res.status(200).json({ success: true, data: events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message || 'Server Error' });
  }
};

// Register an SME for an event
export const registerEvent = async (req, res) => {
  const { eventid } = req.params;
  const { smeId } = req.body;

  try {
    if (!smeId) {
      return res.status(400).json({
        success: false,
        message: 'SME ID is required'
      });
    }

    // Populate expertise when fetching SME
    const sme = await Sme.findById(smeId).populate('expertise', 'name');
    if (!sme) {
      return res.status(404).json({
        success: false,
        message: 'SME not found'
      });
    }

    const event = await Event.findById(eventid)
      .populate('institution', 'name email')
      .populate('topic', 'name');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.sme) {
      return res.status(400).json({
        success: false,
        message: 'Event is already registered with an SME'
      });
    }

    // Optional: verify SME has matching expertise here

    event.sme = smeId;
    event.status = 'confirmed';
    await event.save();

    res.status(201).json({
      success: true,
      message: 'SME registered successfully for the event',
      data: {
        event,
        sme
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
};