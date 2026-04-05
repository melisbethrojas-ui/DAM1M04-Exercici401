const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
app.get('/', (req, res) => {
    res.send('MiniERP funcionando 🚀');
});
app.use('/products', require('./routes/products'));
app.use('/sales', require('./routes/sales'));

app.use('/dashboard', require('./routes/dashboard'));

app.use('/customers', require('./routes/customers'));


app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://localhost:3000');
});