// routes/listings.js
const express = require('express');
const Listing = require('../models/Listing');
const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new listing
router.post('/', async (req, res) => {
  const { producer, price, quantity, location, rating } = req.body;
  const listing = new Listing({ producer, price, quantity, location, rating });
  try {
    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;