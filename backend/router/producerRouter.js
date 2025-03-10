const express = require('express');
const producerController = require('../controller/producerController');
const { body } = require('express-validator');
const { requireAuth } = require("../middlewares/ProducerAuth")

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

// Define routes for producerController
router.get('/', requireAuth, producerController.getAllProducers);
router.get('/:id', producerController.getProducerCredits);
router.post('/', requireAuth, producerController.createProducer);
router.patch('/:id', producerController.updateProducer);
// router.delete('/:id', producerController.deleteProducer);

router.post('/signup', signupValidation, producerController.signup);
router.post('/login', loginValidation, producerController.login);

module.exports = router;