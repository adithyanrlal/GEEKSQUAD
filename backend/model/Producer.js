const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletBalance: { type: Number, default: 0 }, // USD or chosen currency
    creditsAvailable: { type: Number, default: 0 }, // SECs available for sale
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producer', producerSchema);
