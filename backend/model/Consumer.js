const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    walletBalance: { type: Number, default: 0 }, // USD or chosen currency
    creditsOwned: { type: Number, default: 0 }, // SECs owned
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consumer', consumerSchema);
