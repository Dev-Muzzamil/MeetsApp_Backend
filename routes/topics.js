import express from 'express';
import Topics from '../models/Topics.js';

const router = express.Router();

// Create a new topic
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const topic = new Topics({ name, description });
    await topic.save();
    res.status(201).json({ success: true, data: topic });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topics.find();
    res.status(200).json({ success: true, data: topics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
