const db = require('../db/connection');


// 📌 LISTADO CON PAGINACIÓN + BÚSQUEDA
exports.getProducts = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const limite = 10;
        const offset = pagina * limite;

        const busca = req.query.cerca || '';

        let sql = `
            SELECT * FROM products
            WHERE name LIKE ? OR category LIKE ?
            LIMIT ? OFFSET ?
        `;

        const [rows] = await db.query(sql, [`%${busca}%`, `%${busca}%`, limite, offset]);

        res.json(rows);

    } catch (error) {
        res.status(500).send(error.message);
    }
};


// 📌 CREAR
exports.createProduct = async (req, res) => {
    try {
        const { name, category, price, stock, active } = req.body;

        await db.query(
            `INSERT INTO products (name, category, price, stock, active)
             VALUES (?, ?, ?, ?, ?)`,
            [name, category, price, stock, active]
        );

        res.send('Producto creado');

    } catch (error) {
        res.status(500).send(error.message);
    }
};


// 📌 UPDATE
exports.updateProduct = async (req, res) => {
    try {
        const { id, name, category, price, stock, active } = req.body;

        await db.query(
            `UPDATE products SET name=?, category=?, price=?, stock=?, active=? WHERE id=?`,
            [name, category, price, stock, active, id]
        );

        res.send('Producto actualizado');

    } catch (error) {
        res.status(500).send(error.message);
    }
};


// 📌 DELETE
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;

        await db.query(`DELETE FROM products WHERE id=?`, [id]);

        res.send('Producto eliminado');

    } catch (error) {
        res.status(500).send(error.message);
    }
};