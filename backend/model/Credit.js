const mongoose = require('mongoose');
const CreditSchema = new mongoose.Schema({
    producerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer',
        required: true,
    },

    pricePerSEC: {
        type: Number,
        required: true,
        default: 0.1, // Fixed price for now
    },
    creditsAvailable: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

module.exports = mongoose.models.Credit || mongoose.model('Credit', CreditSchema);
