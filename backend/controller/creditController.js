const Consumer = require("../model/Consumer");
const Credit = require("../model/Credit");
const Producer = require("../model/Producer");



const FIXED_PRICE_PER_SEC = 0.1;

const getAllCredits = async (req, res) => {
    try {
        const credits = await Credit.find();
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch credits', error: error.message });
    }
};

const buyCredits = async (req, res) => {
    const { consumerId, creditId, amount } = req.body;

    try {
        const consumer = await Consumer.findById(consumerId);
        const credit = await Credit.findById(creditId);
        const producer = await Producer.findById(credit.producerId);

        if (!consumer || !credit || !producer) {
            return res.status(404).json({ message: 'Consumer, Credit, or Producer not found' });
        }

        const totalCost = amount * credit.pricePerSEC;
        console.log(credit.creditsAvailable, amount);

        if (consumer.walletBalance < totalCost) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        if (credit.creditsAvailable < amount) {
            return res.status(400).json({ message: 'Not enough credits available' });
        }

        // Update balances
        consumer.walletBalance -= totalCost;
        consumer.creditsOwned += amount;

        producer.walletBalance += totalCost;
        credit.creditsAvailable -= amount;

        await consumer.save();
        await producer.save();
        if (credit.creditsAvailable === 0) {
            await credit.remove();
            return res.status(200).json({ message: 'Transaction successful', amount, totalCost });
        }
        await credit.save();

        res.status(200).json({ message: 'Transaction successful', amount, totalCost });
    } catch (error) {
        res.status(500).json({ message: 'Transaction failed', error: error.message });
    }
};

const createCredit = async (req, res) => {
    const { producerId, creditsAvailable, pricePerSEC } = req.body;

    try {
        const newCredit = new Credit({
            producerId,

            creditsAvailable,
            pricePerSEC: pricePerSEC || FIXED_PRICE_PER_SEC,
        });

        await newCredit.save();
        res.status(201).json(newCredit);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create credit', error: error.message });
    }
};
module.exports = {
    getAllCredits, createCredit, buyCredits
}