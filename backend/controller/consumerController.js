const Consumer = require('../model/Consumer');
const Credit = require('../model/Credit');
const User = require("../model/Consumer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


// User sign up
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};