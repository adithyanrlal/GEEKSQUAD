const express = require('express');
const producerController = require('../controller/producerController');

const router = express.Router();

// Define routes for producerController
router.get('/', producerController.getAllProducers);
router.get('/:id', producerController.getProducerById);
router.post('/', producerController.createProducer);
// router.put('/:id', producerController.updateProducer);
// router.delete('/:id', producerController.deleteProducer);

module.exports = router;