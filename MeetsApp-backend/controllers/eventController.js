const Event = require('../models/Events');
const Institution = require('../models/Institution');

// Get all events for institution
exports.getInstitutionEvents = async (req, res) => {
  try {
    const events = await Event.find({ institution: req.params.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new event for institution
exports.createInstitutionEvent = async (req, res) => {
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
exports.getInstitutionEventDetail = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId, institution: req.params.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};