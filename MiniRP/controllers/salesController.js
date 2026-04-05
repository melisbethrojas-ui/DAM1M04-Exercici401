const db = require('../db/connection');

exports.createSale = async (req, res) => {
    const { customer_id, payment_method, items } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        let total = 0;

        // 🔍 1. VALIDAR STOCK
        for (let item of items) {
            const [product] = await connection.query(
                'SELECT price, stock FROM products WHERE id=?',
                [item.product_id]
            );

            if (product.length === 0) {
                throw new Error('Producto no existe');
            }

            if (product[0].stock < item.qty) {
                throw new Error('Stock insuficiente para producto ' + item.product_id);
            }
        }

        // 🧾 2. CREAR VENTA (temporal)
        const [saleResult] = await connection.query(
            `INSERT INTO sales (customer_id, sale_date, payment_method, total)
             VALUES (?, CURDATE(), ?, 0)`,
            [customer_id, payment_method]
        );

        const sale_id = saleResult.insertId;

        // 📦 3. INSERTAR ITEMS + CALCULAR TOTAL
        for (let item of items) {
            const [product] = await connection.query(
                'SELECT price FROM products WHERE id=?',
                [item.product_id]
            );

            const price = product[0].price;
            const line_total = price * item.qty;

            total += line_total;

            // insertar línea
            await connection.query(
                `INSERT INTO sale_items (sale_id, product_id, qty, unit_price, line_total)
                 VALUES (?, ?, ?, ?, ?)`,
                [sale_id, item.product_id, item.qty, price, line_total]
            );

            // 🔻 RESTAR STOCK
            await connection.query(
                `UPDATE products SET stock = stock - ? WHERE id=?`,
                [item.qty, item.product_id]
            );
        }

        // 💰 4. ACTUALIZAR TOTAL FINAL
        await connection.query(
            `UPDATE sales SET total=? WHERE id=?`,
            [total, sale_id]
        );

        await connection.commit();

        res.send('Venta realizada correctamente');

    } catch (error) {
        await connection.rollback();
        res.status(500).send(error.message);
    } finally {
        connection.release();
    }
};