const db = require('../db/connection');

exports.getDashboard = async (req, res) => {
    try {

        // 💰 ventas hoy
        const [[todaySales]] = await db.query(
            `SELECT IFNULL(SUM(total),0) as total FROM sales WHERE sale_date = CURDATE()`
        );

        // 💰 ventas mes
        const [[monthSales]] = await db.query(
            `SELECT IFNULL(SUM(total),0) as total 
             FROM sales 
             WHERE MONTH(sale_date) = MONTH(CURDATE())`
        );

        // 📦 pedidos hoy
        const [[ordersToday]] = await db.query(
            `SELECT COUNT(*) as total FROM sales WHERE sale_date = CURDATE()`
        );

        // 📦 pedidos mes
        const [[ordersMonth]] = await db.query(
            `SELECT COUNT(*) as total 
             FROM sales 
             WHERE MONTH(sale_date) = MONTH(CURDATE())`
        );

        // ⚠️ stock bajo (<10 por ejemplo)
        const [lowStock] = await db.query(
            `SELECT name, stock FROM products WHERE stock < 10`
        );

        // 🏆 top productos
        const [topProducts] = await db.query(`
            SELECT p.name, SUM(si.qty) as vendidos
            FROM sale_items si
            JOIN products p ON si.product_id = p.id
            GROUP BY p.id
            ORDER BY vendidos DESC
            LIMIT 5
        `);

        // 🧾 últimas ventas
        const [lastSales] = await db.query(`
            SELECT s.id, s.sale_date, c.name, s.total
            FROM sales s
            JOIN customers c ON s.customer_id = c.id
            ORDER BY s.sale_date DESC
            LIMIT 5
        `);

        res.json({
            todaySales,
            monthSales,
            ordersToday,
            ordersMonth,
            lowStock,
            topProducts,
            lastSales
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};