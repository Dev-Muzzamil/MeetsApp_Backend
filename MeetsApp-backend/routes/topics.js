import express from 'express';
import topicController from '../controllers/topicController.js';

const router = express.Router();

router.post('/', topicController.createTopic);
router.get('/', topicController.getAllTopics);

export default router;
