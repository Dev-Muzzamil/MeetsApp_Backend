import Event from '../models/Events.js';
import Institution from '../models/Institution.js';

// Get all public events (no authentication required)
export const getAllPublicEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('institution', 'name location type')
      .populate('topic', 'name') // ✅ populate topic field
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all events for institution
export const getInstitutionEvents = async (req, res) => {
  try {
    const events = await Event.find({ institution: req.params.id })
      .populate('topic', 'name'); // ✅ populate topic field
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new event for institution
export const createInstitutionEvent = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: 'Institution not found' });

    // You might want to validate that topic ID exists here (optional)
    const event = new Event({ ...req.body, institution: institution._id });
    await event.save();

    // Re-populate topic after save if needed
    const populatedEvent = await Event.findById(event._id)
      .populate('institution', 'name location type')
      .populate('topic', 'name');

    res.status(201).json(populatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single event detail
export const getInstitutionEventDetail = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId, institution: req.params.id })
      .populate('institution', 'name location type')
      .populate('topic', 'name'); // ✅ populate topic field

    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update event for institution
export const updateInstitutionEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.eventId, institution: req.params.id },
      req.body,
      { new: true }
    )
      .populate('institution', 'name location type')
      .populate('topic', 'name'); // ✅ populate topic field

    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete event for institution
export const deleteInstitutionEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.eventId, institution: req.params.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getAllPublicEvents,
  getInstitutionEvents,
  createInstitutionEvent,
  getInstitutionEventDetail,
  updateInstitutionEvent,
  deleteInstitutionEvent
};
