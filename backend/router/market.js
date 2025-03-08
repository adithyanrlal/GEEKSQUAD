const express = require('express');
const router = express.Router();
const { buyCredits } = require('../controller/marketController');

router.post('/buy', buyCredits);

module.exports = router;
