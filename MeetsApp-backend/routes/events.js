import express from 'express';
const router = express.Router();
import eventController from '../controllers/eventController.js';


// Public route to get all events from all institutions
router.get('/events/public', eventController.getAllPublicEvents);

// Public route to get all events for a specific institution (no authentication required)
router.get('/:id/events/public', eventController.getInstitutionEvents);

// Get all events for institution (protected)
router.get('/:id/events', protect, authorizeInstitute, eventController.getInstitutionEvents);

// Create new event
router.post('/:id/events', protect, authorizeInstitute, eventController.createInstitutionEvent);

// Get single event detail
router.get('/:id/events/:eventId', protect, authorizeInstitute, eventController.getInstitutionEventDetail);

// Update event (new route)
router.put('/:id/events/:eventId', protect, authorizeInstitute, eventController.updateInstitutionEvent);

// Delete event (new route)
router.delete('/:id/events/:eventId', protect, authorizeInstitute, eventController.deleteInstitutionEvent);
