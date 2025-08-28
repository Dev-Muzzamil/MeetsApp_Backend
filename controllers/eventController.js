import Event from '../models/Events.js';
import Institution from '../models/Institution.js';

// Archived: getAllPublicEvents (public event browsing logic removed)

// Get all events for institution
export const getInstitutionEvents = async (req, res) => {
  try {
    const events = await Event.find({ institution: req.params.id });
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

    const event = new Event({ ...req.body, institution: institution._id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single event detail
export const getInstitutionEventDetail = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId, institution: req.params.id })
      .populate({
        path: 'institution',
        select: 'name email location type description coordinates',
      });
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
    );
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
  getInstitutionEvents,
  createInstitutionEvent,
  getInstitutionEventDetail,
  updateInstitutionEvent,
  deleteInstitutionEvent
};