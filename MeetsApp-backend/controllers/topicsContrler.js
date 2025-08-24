import Topic from '../models/Topic.js';

// Create a new topic
export const createTopic = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Topic name is required' });
    }

    // Check for duplicate
    const existing = await Topic.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Topic already exists' });
    }

    const topic = new Topic({ name: name.trim() });
    await topic.save();

    res.status(201).json({ success: true, message: 'Topic created', data: topic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all topics
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ name: 1 }); // Alphabetical
    res.status(200).json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  createTopic,
  getAllTopics
};
