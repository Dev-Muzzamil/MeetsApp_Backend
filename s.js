require('dotenv').config();
const mongoose = require('mongoose');
const Institution = require('./models/Institution');
const Event = require('./models/Events');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seed = async () => {
  try {
    await Institution.deleteMany({});
    await Event.deleteMany({});

    // Create one sample institution
    const institution = await Institution.create({
      name: 'Green Valley School',
      email: 'contact@greenvalley.edu',
      password: 'password',
      location: 'Delhi',
      type: 'School',
      description: 'A top school in Delhi focused on holistic development.',
    });

    // Create sample events for the institution
    await Event.create([
      {
        title: 'Career Guidance Seminar',
        topic: 'Career Guidance',
        description: 'Session on career choices after 10th grade.',
        date: '2025-09-10',
        time: '11:00 AM - 1:00 PM',
        location: 'Green Valley School Auditorium',
        participants: { type: 'High School Students', count: 80 },
        institution: institution._id,
        status: 'pending',
        volunteer: null,
      },
      {
        title: 'Soft Skills Workshop',
        topic: 'Soft Skills',
        description: 'Improving communication and teamwork among students.',
        date: '2025-09-15',
        time: '9:00 AM - 12:00 PM',
        location: 'Green Valley School Hall',
        participants: { type: 'High School Students', count: 65 },
        institution: institution._id,
        status: 'confirmed',
        volunteer: 'smekumar@example.com',
      }
    ]);

    console.log('Institution and events seeded');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
};

seed();