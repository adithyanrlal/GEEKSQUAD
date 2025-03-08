import mongoose from 'mongoose';

const CreditSchema = new mongoose.Schema({
    producerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producer',
        required: true,
    },
    producerName: {
        type: String,
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

export default mongoose.models.Credit || mongoose.model('Credit', CreditSchema);
