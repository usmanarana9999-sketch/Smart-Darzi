const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const measurementRoutes = require('./routes/measurements');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({message: 'Smart Darzi backend running'});
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/measurements', measurementRoutes);

app.use((req, res) => {
  res.status(404).json({message: 'Endpoint not found'});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: 'Server error', details: err.message});
});

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

const start = async () => {
  await connectDB();
  app.listen(port, host, () => {
    console.log(`Smart Darzi backend listening on http://${host}:${port}`);
  });
};

start();
