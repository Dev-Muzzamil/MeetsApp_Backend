import express from 'express';
const router = express.Router();
import eventController from '../controllers/eventController.js';


// Public route to get all events from all institutions
router.get('/events/public', eventController.getAllPublicEvents);

// Public route to get all events for a specific institution (no authentication required)
router.get('/:id/events/public', eventController.getInstitutionEvents);
