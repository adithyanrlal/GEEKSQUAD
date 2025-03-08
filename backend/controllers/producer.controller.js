const Producer = require('../models/producer.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      console.log("Producer Signup Request:", req.body);
  
      const existingProducer = await Producer.findOne({ email });
      if (existingProducer) {
        return res.status(400).json({ message: "Producer already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newProducer = new Producer({ name, email, password: hashedPassword });
      await newProducer.save();
  
      const token = jwt.sign({ userId: newProducer._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });
  
      res.status(201).json({ message: "Producer created successfully", token });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("Producer Login Request:", req.body);
  
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Check if producer exists
      const existingProducer = await Producer.findOne({ email });
      if (!existingProducer) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, existingProducer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: existingProducer._id },
        process.env.JWT_SECRET || "your_default_secret", // Ensure a fallback secret
        { expiresIn: "1h" }
      );
  
      // Return response with token and user info
      res.status(200).json({ 
        message: "Login successful", 
        token, 
        user: { id: existingProducer._id, email: existingProducer.email } 
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };