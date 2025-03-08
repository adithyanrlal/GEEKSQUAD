const express = require('express');
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules for signup
const signupValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation rules for login
const loginValidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/signup', signupValidation, userController.signup);
router.post('/login', loginValidation, userController.login);


module.exports = router;