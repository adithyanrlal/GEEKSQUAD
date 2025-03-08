const Consumer = require('../model/Consumer');
const Credit = require('../model/Credit');

// Get all consumers
exports.getAllConsumers = async (req, res) => {
    try {
        const consumers = await Consumer.find();
        res.status(200).json(consumers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch consumers', error: error.message });
    }
};

exports.createConsumer = async (req, res) => {
    const { name, email, walletBalance, creditsOwned } = req.body;
    try {
        const consumer = await Consumer.create({ name, email, walletBalance, creditsOwned });
        res.status(201).json(consumer);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create consumer', error: error.message });
    }
}

// Get a specific consumer by ID
exports.getConsumerById = async (req, res) => {
    try {
        const consumer = await Consumer.findById(req.params.id);
        if (!consumer) {
            return res.status(404).json({ message: 'Consumer not found' });
        }
        res.status(200).json(consumer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch consumer', error: error.message });
    }
};

// Get credits listed by a specific consumer
exports.getConsumerCredits = async (req, res) => {
    try {
        const credits = await Credit.find({ consumerId: req.params.id });
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch consumer credits', error: error.message });
    }
};

// Update consumer wallet balance
exports.updateConsumerWallet = async (req, res) => {
    try {
        const { walletBalance } = req.body;
        const consumer = await Consumer.findByIdAndUpdate(req.params.id, { walletBalance }, { new: true });
        if (!consumer) {
            return res.status(404).json({ message: 'Consumer not found' });
        }
        res.status(200).json(consumer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update wallet', error: error.message });
    }
};

// Delete a specific consumer by ID
exports.deleteConsumer = async (req, res) => {
    try {
        const consumer = await Consumer.findByIdAndDelete(req.params.id);
        if (!consumer) {
            return res.status(404).json({ message: 'Consumer not found' });
        }
        res.status(200).json({ message: 'Consumer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete consumer', error: error.message });
    }
};

// Update consumer details
exports.updateConsumerDetails = async (req, res) => {
    try {
        const { name, email } = req.body;
        const consumer = await Consumer.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!consumer) {
            return res.status(404).json({ message: 'Consumer not found' });
        }
        res.status(200).json(consumer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update consumer details', error: error.message });
    }
};

// Get all credits
exports.getAllCredits = async (req, res) => {
    try {
        const credits = await Credit.find();
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch credits', error: error.message });
    }
};