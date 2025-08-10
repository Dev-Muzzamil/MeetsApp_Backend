require('dotenv').config();
// import connectDB from './config/db.js';
let connectDB =require("./config/db.js");
const express=require("express");
// import mongoose from 'mongoose';
let mongoose=require("mongoose");
// import Institution from './models/Institution';
let Institution=require("./models/Institution");
// import Event from './models/Events';
let Event = require("./models/Events");
// import InstitutionRoutes from './routes/institution.js';
let InstitutionRoutes = require("./routes/institution.js");
// import authRoutes from './routes/auth.js';
let authRoutes = require("./routes/auth.js");
let dotenv = require('dotenv');
let cors=require("cors");
const app = express();
dotenv.config();
connectDB();


// Middleware
app.use(cors({
    origin: '*',
    credentials: true
  }));

app.use('/auth', authRoutes);

app.use('/instituitions', InstitutionRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// const PORT = 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});