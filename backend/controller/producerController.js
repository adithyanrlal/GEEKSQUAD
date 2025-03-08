const Producer = require('../model/Producer');
const Credit = require('../model/Credit');
const User = require("../model/Producer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



