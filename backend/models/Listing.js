// models/Listing.js
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  producer: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Listing', ListingSchema);