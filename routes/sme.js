

import express from 'express';
import { registerEvent, getAvailableEvents, getRelevantEvents } from '../controllers/smeController.js';
import { protect, authorizeSME } from '../middleware/smeAuthMiddleware.js';

const router = express.Router();

// Protect SME event registration and available events endpoints
router.post('/register/:eventid', protect, authorizeSME, registerEvent);
router.get('/events/available', protect, getAvailableEvents);

// Get relevant events for an SME based on expertise topics
// Route: GET /sme/:smeId/relevant/events
router.get('/:smeId/relevant/events', protect, authorizeSME, getRelevantEvents);

export default router;
