// Script to migrate Events.topic from string to ObjectId reference to Topics
// Usage: node migrate-event-topics.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Events from './models/Events.js';
import Topics from './models/Topics.js';

const MONGO_URI = process.env.MONGO_URI;

async function migrateTopics() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const events = await Events.find({});
  let updated = 0;

  for (const event of events) {
    if (typeof event.topic === 'string') {
      // Try to find a topic by name (case-insensitive)
      const topicDoc = await Topics.findOne({ name: new RegExp('^' + event.topic + '$', 'i') });
      if (topicDoc) {
        event.topic = topicDoc._id;
        await event.save();
        updated++;
        console.log(`Updated event ${event._id} topic to ${topicDoc._id}`);
      } else {
        console.warn(`No matching topic found for event ${event._id} with topic string '${event.topic}'`);
      }
    }
  }

  console.log(`Migration complete. Updated ${updated} events.`);
  await mongoose.disconnect();
}

migrateTopics().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
