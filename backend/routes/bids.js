// routes/bids.js
const express = require('express');
const Bid = require('../models/Bid');
const Listing = require('../models/Listing');
const router = express.Router();

// Place a bid
router.post('/', async (req, res) => {
  const { consumer, price, quantity, listingId, expiration } = req.body;
  const bid = new Bid({ consumer, price, quantity, listingId, expiration });
  try {
    const savedBid = await bid.save();
    res.status(201).json(savedBid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Accept a bid
router.put('/:id/accept', async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    bid.status = 'accepted';
    await bid.save();
    res.json(bid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Counter a bid
router.put('/:id/counter', async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    bid.status = 'countered';
    bid.counterPrice = req.body.counterPrice;
    await bid.save();
    res.json(bid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reject a bid
router.put('/:id/reject', async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    bid.status = 'rejected';
    await bid.save();
    res.json(bid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;