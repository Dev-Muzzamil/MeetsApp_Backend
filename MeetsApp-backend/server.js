import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import InstitutionRoutes from './routes/institution.js';
import authRoutes from './routes/auth.js';
import smeRoutes from './routes/sme.js';
import feedbackRoutes from './routes/feedback.js';


connectDB();

const app = express();

// Middleware

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    // Optionally, restrict web origins here if needed
    return callback(null, true);
  },
  credentials: true
}));

// Capture raw request body for debugging malformed JSON
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      req.rawBody = buf && buf.toString('utf8');
    } catch (e) {
      req.rawBody = undefined;
    }
  }
}));

// JSON parse error handler - responds with 400 and helpful message
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', req.rawBody || err.message);
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON payload. Ensure property names are double-quoted and the body is valid JSON.'
    });
  }
  next(err);
});

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRoutes);
app.use('/sme', smeRoutes);
app.use('/institutions', InstitutionRoutes);
app.use('/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Meeting Place Backend Running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

// Listen on all interfaces (0.0.0.0) to allow connections from emulator or LAN
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});