const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institutionController');
const eventController = require('../controllers/eventController');
router.get('/', institutionController.getAllInstitutions);

// Get institution profile
router.get('/:id', institutionController.getInstitutionProfile);

// Get all events for institution
router.get('/:id/events', eventController.getInstitutionEvents);

// Create new event
router.post('/:id/events', eventController.createInstitutionEvent);

// Get single event detail
router.get('/:id/events/:eventId', eventController.getInstitutionEventDetail);

export default router;