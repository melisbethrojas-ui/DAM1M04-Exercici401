const db = require('../db/connection');

// 📌 LISTAR con paginación + búsqueda
exports.getCustomers = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const limite = 10;
        const offset = pagina * limite;

        const busca = req.query.cerca || '';

        const [rows] = await db.query(`
            SELECT c.*, 
            (SELECT COUNT(*) FROM sales WHERE customer_id = c.id) as compras
            FROM customers c
            WHERE name LIKE ? OR email LIKE ?
            LIMIT ? OFFSET ?
        `, [`%${busca}%`, `%${busca}%`, limite, offset]);

        res.json(rows);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 📌 CREAR
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        await db.query(
            `INSERT INTO customers (name, email, phone)
             VALUES (?, ?, ?)`,
            [name, email, phone]
        );

        res.send('Cliente creado');

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 📌 UPDATE
exports.updateCustomer = async (req, res) => {
    try {
        const { id, name, email, phone } = req.body;

        await db.query(
            `UPDATE customers SET name=?, email=?, phone=? WHERE id=?`,
            [name, email, phone, id]
        );

        res.send('Cliente actualizado');

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 📌 DELETE
exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.body;

        await db.query(`DELETE FROM customers WHERE id=?`, [id]);

        res.send('Cliente eliminado');

    } catch (error) {
        res.status(500).send(error.message);
    }
};