
import express from 'express';
import { registerEvent, getAvailableEvents } from '../controllers/smeController.js';
import { protect, authorizeSME } from '../middleware/smeAuthMiddleware.js';

const router = express.Router();

// Protect SME event registration and available events endpoints
router.post('/register/:eventid', protect, authorizeSME, registerEvent);
router.get('/events/available', protect, authorizeSME, getAvailableEvents);
router.get('/')

export default router;
