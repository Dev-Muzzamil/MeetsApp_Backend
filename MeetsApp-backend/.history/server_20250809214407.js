require('dotenv').config();
import connectDB from './config/db.js';import mongoose from 'mongoose';
import Institution from './models/Institution';
import Event from './models/Events';
import InstitutionRoutes from './routes/institution.js';
import authRoutes from './routes/auth.js';

connectDB();

const app = express();

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});