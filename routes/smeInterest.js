import express from 'express';
import {
  createInterest,
  getInstitutionInterests,
  getSMEInterests,
  reviewInterest,
  getInterestDetails
} from '../controllers/smeInterestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// SME routes
router.post('/apply', createInterest); // SME applies for event
router.get('/my-interests', getSMEInterests); // SME views their applications

// Institution routes
router.get('/institution', getInstitutionInterests); // Institution views applications
router.put('/:interestId/review', reviewInterest); // Institution approves/rejects

// Common routes
router.get('/:interestId', getInterestDetails); // View interest details

export default router;
