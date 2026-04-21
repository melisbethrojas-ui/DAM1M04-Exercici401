const express = require('express');
const router = express.Router();
const controller = require('../controllers/customersController');

router.get('/', controller.getCustomers);
router.post('/create', controller.createCustomer);
router.post('/update', controller.updateCustomer);
router.post('/delete', controller.deleteCustomer);

module.exports = router;