const express = require('express');
const consumerController = require('../controller/consumerController');
const { body } = require('express-validator');
const { requireAuth } = require("../middlewares/ConsumerAuth")

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

// Define routes for consumerController
router.get('/',requireAuth, consumerController.getAllConsumers);
router.get('/:id',requireAuth, consumerController.getConsumerById);
router.post('/', requireAuth,consumerController.createConsumer);
// router.put('/:id', consumerController.updateProducer);
// router.delete('/:id', consumerController.deleteProducer);

router.post('/signup', signupValidation, consumerController.signup);
router.post('/login', loginValidation, consumerController.login);


module.exports = router;