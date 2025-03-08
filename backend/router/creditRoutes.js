const express = require('express');
const router = express.Router();
const {
    getAllCredits,
    createCredit,
    buyCredits,
} = require('../controller/creditController');

// Get all available credits
router.get('/', getAllCredits);

// Create new credits for producers
router.post('/', createCredit);

// Buy credits (consumer purchases from a producer)
router.post('/buy', buyCredits);

module.exports = router;
