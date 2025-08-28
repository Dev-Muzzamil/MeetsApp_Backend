
import express from 'express';
const router = express.Router();
import institutionController from '../controllers/institutionController.js';
import eventController from '../controllers/eventController.js';
import { protect, authorizeInstitute } from '../middleware/authMiddleware.js';

// Public routes (no authentication required)
router.get('/', institutionController.getAllInstitutions);

// Protected routes (authentication required)
// Get institution profile
router.get('/:id', protect, authorizeInstitute, institutionController.getInstitutionProfile);

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

export default router;