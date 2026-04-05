const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', controller.getProducts);
router.post('/create', controller.createProduct);
router.post('/update', controller.updateProduct);
router.post('/delete', controller.deleteProduct);

module.exports = router;