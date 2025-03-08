const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Signup request received:", req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
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

        // Generate JWT Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });

        res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const consumer = await User.findOne({ email });
        if (!consumer) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, consumer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { consumerId: consumer._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};