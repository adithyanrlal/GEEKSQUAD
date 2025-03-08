const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true },
    walletBalance: {type: Number, default: 0 }, // USD or chosen currency
    creditsAvailable: { type: Number, default: 0 }, // SECs available for sale
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producer', producerSchema);
