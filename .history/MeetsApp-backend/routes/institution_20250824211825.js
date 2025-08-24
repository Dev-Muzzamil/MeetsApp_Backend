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

export default router;