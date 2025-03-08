const express = require('express');
const producerController = require('../controllers/producer.controller');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules for signup
const signupValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation rules for login
const loginValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/signup', signupValidation, producerController.signup);
router.post('/login', loginValidation, producerController.login);


module.exports = router;