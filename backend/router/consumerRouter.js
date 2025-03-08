const express = require('express');
const consumerController = require('../controller/consumerController');

const router = express.Router();

// Define routes for consumerController
router.get('/', consumerController.getAllConsumers);
router.get('/:id', consumerController.getConsumerById);
router.post('/', consumerController.createConsumer);
// router.put('/:id', consumerController.updateProducer);
// router.delete('/:id', consumerController.deleteProducer);

module.exports = router;