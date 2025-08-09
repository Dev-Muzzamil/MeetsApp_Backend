require('dotenv').config();
import connectDB from './config/db.js';
const mongoose = require('mongoose');
const Institution = require('./models/Institution');
const Event = require('./models/Events');
const InstitutionRoutes=require('./routes/institution.js')

connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
  }));

app.use('/auth',)

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