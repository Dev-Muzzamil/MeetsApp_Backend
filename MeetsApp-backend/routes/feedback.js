import express from 'express';
import {
  submitInstitutionFeedback,
  submitSMEFeedback,
  getEventFeedback,
  getCompletedEventsForInstitution,
  getCompletedEventsForSME
} from '../controllers/feedbackController.js';

const router = express.Router();

// Feedback submission
router.post('/institution/:eventId', submitInstitutionFeedback);
router.post('/sme/:eventId', submitSMEFeedback);

// Get feedback
router.get('/event/:eventId', getEventFeedback);

// Get completed events for feedback
router.get('/institution/:institutionId/completed', getCompletedEventsForInstitution);
router.get('/sme/:smeId/completed', getCompletedEventsForSME);

export default router;