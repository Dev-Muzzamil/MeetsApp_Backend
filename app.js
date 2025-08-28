
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const topicsRoutes = require('./routes/topics');

const app = express();
const allowedOrigins = [
  "http://192.168.206.81:8081", // Metro Bundler (React Native)
  "http://192.168.206.81:19006", // Expo Web
  "http://localhost:8081",       // For emulators/simulators
  "http://localhost:19006"
];
app.use(cors());
app.use(express.json());


app.use('/api/institutions', require('./routes/institution'));
app.use('/api/topics', topicsRoutes);

app.get('/', (req, res) => res.send('Meeting Place Backend Running'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log('Server started'));
  })
  .catch((err) => console.error('DB Error', err));