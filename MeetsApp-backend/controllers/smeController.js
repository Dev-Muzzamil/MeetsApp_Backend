import Event from '../models/Events.js';
import Sme from '../models/Sme.js';

// Get all available events (not yet assigned to SME)
export const getAvailableEvents = async (req, res) => {
  try {
    const events = await Event.find({ sme: null, status: 'pending' })
      .populate('institution', 'name location type')
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

export const registerEvent = async (req, res) => {
  const { eventid } = req.params;
  const { smeId } = req.body;

  try {
    // Validate smeId
    if (!smeId) {
      return res.status(400).json({
        success: false,
        message: 'SME ID is required'
      });
    }

    // Find the SME
    const sme = await Sme.findById(smeId);
    if (!sme) {
      return res.status(404).json({
        success: false,
        message: 'SME not found'
      });
    }

    // Find the event by ID
    const event = await Event.findById(eventid).populate('institution', 'name email');
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if the SME is already registered for the event
    if (event.sme) {
      return res.status(400).json({
        success: false,
        message: 'Event is already registered with an SME'
      });
    }

    // Update the event with the SME's ID
    event.sme = smeId;
    event.status = 'confirmed';
    await event.save();

    res.status(201).json({
      success: true,
      message: 'SME registered successfully for the event',
      data: {
        event: event,
        sme: sme
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