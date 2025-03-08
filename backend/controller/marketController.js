const Consumer = require('../model/Consumer');
const Producer = require('../model/Producer');
// Buy credits at a fixed price
const buyCredits = async (req, res) => {
    const { consumerId, producerId, amount } = req.body; // Amount in SECs
    const FIXED_PRICE_PER_SEC = 0.10;
    try {
        const consumer = await Consumer.findById(consumerId);
        const producer = await Producer.findById(producerId);

        if (!consumer || !producer) {
            return res.status(404).json({ message: 'Consumer or Producer not found' });
        }

        const totalCost = amount * FiXED_PRICE_PER_SEC;

        if (consumer.walletBalance < totalCost) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        if (producer.creditsAvailable < amount) {
            return res.status(400).json({ message: 'Not enough credits available' });
        }

        // Process transaction
        consumer.walletBalance -= totalCost;
        consumer.creditsOwned += amount;

        producer.walletBalance += totalCost;
        producer.creditsAvailable -= amount;

        await consumer.save();
        await producer.save();

        res.status(200).json({ message: 'Transaction successful', amount, totalCost });
    } catch (error) {
        res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
};

module.exports = { buyCredits };
