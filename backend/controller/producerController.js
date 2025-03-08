const Producer = require('../model/Producer');
const Credit = require('../model/Credit');

// Get all producers
exports.getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.find();
        res.status(200).json(producers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch producers', error: error.message });
    }
};

exports.createProducer = async (req, res) => {
    const { name, email, walletBalance, creditsAvailable } = req.body;
    try {
        const producer = await
            Producer.create({ name, email, walletBalance, creditsAvailable });
        res.status(201).json(producer);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create producer', error: error.message });
    }
}

// Get a specific producer by ID
exports.getProducerById = async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.status(200).json(producer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch producer', error: error.message });
    }
};

// Get credits listed by a specific producer
exports.getProducerCredits = async (req, res) => {
    try {
        const credits = await Credit.find({ producerId: req.params.id });
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch producer credits', error: error.message });
    }
};

// Update producer wallet balance
exports.updateProducerWallet = async (req, res) => {
    try {
        const { walletBalance } = req.body;
        const producer = await Producer.findByIdAndUpdate(req.params.id, { walletBalance }, { new: true });
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.status(200).json(producer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update wallet', error: error.message });
    }
};
