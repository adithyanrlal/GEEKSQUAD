// models/Bid.js
const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  consumer: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'countered'], default: 'pending' },
  counterPrice: { type: Number },
  expiration: { type: Date, required: true },
});

module.exports = mongoose.model('Bid', BidSchema);