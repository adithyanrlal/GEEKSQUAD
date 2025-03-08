const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect( "mongodb://127.0.0.1:27017/Bidding", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/listings', require('./routes/listings'));
app.use('/api/bids', require('./routes/bids'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));