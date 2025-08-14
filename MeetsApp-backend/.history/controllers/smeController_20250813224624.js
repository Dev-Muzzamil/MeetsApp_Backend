import Event from '../models/Event.js';
import Sme from '../models/Sme.js';

export const registerEvent=async (req, res) => {
  const { eventid } = req.params;
  const { smeId, smeName, smeEmail } = req.body;

  try {
    // Find the event by ID
    const event = await Event.findById(eventid);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    // Check if the SME is already registered for the event
    const existingRegistration = await Event.findOne({


    res.status(201).json({
      success: true,
      message: 'SME registered successfully',
      data: registration
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
}