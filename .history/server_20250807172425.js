require('dotenv').config();
import connectDB from './config/db.js';
const mongoose = require('mongoose');
const Institution = require('./models/Institution');
const Event = require('./models/Events');

