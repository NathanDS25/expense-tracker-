require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const transactionRoutes = require('./routes/transactions');
const budgetRoutes = require('./routes/budgets');
const goalRoutes = require('./routes/goals');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/goals', goalRoutes);

// Database Connection
let isConnected = false;
let connectionError = null;

const connectDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) {
    connectionError = "MONGODB_URI is not defined in Environment Variables";
    console.error(connectionError);
    return;
  }
  
  try {
    // serverSelectionTimeoutMS makes it fail fast if IP is not whitelisted
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    connectionError = null;
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    connectionError = err.message;
    console.error('Failed to connect to MongoDB', err);
  }
};

// Connect before handling requests in serverless environments
app.use(async (req, res, next) => {
  await connectDB();
  if (!isConnected) {
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: connectionError,
      hint: !process.env.MONGODB_URI 
        ? "Please add MONGODB_URI to Vercel Environment Variables." 
        : "Check if your MongoDB Atlas Network Access allows Vercel (add 0.0.0.0/0)"
    });
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', connected: isConnected });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

// Export the app for Vercel Serverless Functions
module.exports = app;
