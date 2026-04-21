const express = require('express');
const router = express.Router();
const controller = require('../controllers/salesController');

router.post('/create', controller.createSale);


router.get('/', (req, res) => {
    res.send('Usa POST para crear ventas');
});
module.exports = router;