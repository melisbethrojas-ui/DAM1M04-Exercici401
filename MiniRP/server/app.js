const express = require('express');
const path = require('path');
const hbs = require('hbs');
const MySQL = require('./utilsMySQL');

const app = express();
const port = 3000;

// =====================================
// BASE DE DATOS
// =====================================
const isProxmox = !!process.env.PM2_HOME;

const db = new MySQL();
if (!isProxmox) {
  db.init({
    host: '127.0.0.1',
    port: 3307,
    user: 'super',
    password: '1234',
    database: 'minierp'
  });
} else {
  db.init({
    host: '127.0.0.1',
    port: 3306,
    user: 'super',
    password: '1234',
    database: 'minierp'
  });
}

// =====================================
// MIDDLEWARES
// =====================================
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

hbs.registerHelper('eq', (a, b) => a == b);
hbs.registerHelper('gt', (a, b) => a > b);
hbs.registerHelper('plus', (a, b) => a + b);
hbs.registerHelper('minus', (a, b) => a - b);

// =====================================
// REDIRECCIONES CRUD
// =====================================
function redireccionar(taula) {
  if (taula === "products") return "/productes";
  if (taula === "customers") return "/clients";
  if (taula === "sales") return "/vendes";
  return "/";
}

// =====================================
// index
// =====================================
app.get('/', async (req, res) => {
  try {

    const vendesAvuiRows = await db.query(`
      SELECT SUM(total) AS total
      FROM sales
      WHERE DATE(sale_date)=CURDATE()
    `);

    const vendesMesRows = await db.query(`
      SELECT SUM(total) AS total
      FROM sales
      WHERE MONTH(sale_date)=MONTH(CURDATE())
    `);
   
    const comandesMesRows = await db.query(`
      SELECT COUNT(*) AS total
      FROM sales
      WHERE MONTH(sale_date) = MONTH(CURDATE())
      AND YEAR(sale_date) = YEAR(CURDATE())
    `);

    const stockBaixRows = await db.query(`
      SELECT name, stock
      FROM products
      WHERE stock < 5
      ORDER BY stock ASC
    `);

    const comandesAvuiRows = await db.query(`
      SELECT COUNT(*) AS total
      FROM sales
      WHERE DATE(sale_date) = CURDATE()
    `);


    const ultimesRows = await db.query(`
      SELECT s.id, s.total, s.sale_date, c.name AS client
      FROM sales s
      JOIN customers c ON c.id=s.customer_id
      ORDER BY s.sale_date DESC
      LIMIT 5
    `);

    const topRows = await db.query(`
      SELECT p.name, SUM(si.qty) AS total_vendes
      FROM sale_items si
      JOIN products p ON p.id=si.product_id
      GROUP BY si.product_id
      ORDER BY total_vendes DESC
      LIMIT 5
    `);

    res.render('index', {
      vendesAvui: vendesAvuiRows[0].total || 0,
      vendesMes: vendesMesRows[0].total || 0,
      comandesAvui: comandesAvuiRows[0].total || 0,
      comandesMes: comandesMesRows[0].total || 0,
      ultimesVendes: db.table_to_json(ultimesRows),
      topProductes: db.table_to_json(topRows),
      stockBaix: db.table_to_json(stockBaixRows)
    });


  } catch (err) {
    console.log(err);
    res.send("Error index");
  }
});

// =====================================
// PRODUCTES
// =====================================
app.get('/productes', async (req, res) => {

  try {

    const pagina = parseInt(req.query.pagina) || 0;
    const cerca = req.query.cerca || "";

    const limit = 10;
    const offset = pagina * limit;

    // En app.js -> app.get('/productes')
    const rows = await db.query(`
        SELECT *
        FROM products
        WHERE name LIKE ? OR category LIKE ?
        ORDER BY id DESC    -- <--- AÑADE ESTA LÍNEA
        LIMIT ? OFFSET ?
    `, [`%${cerca}%`, `%${cerca}%`, limit, offset]);

    const countRows = await db.query(`
      SELECT COUNT(*) total
      FROM products
      WHERE name LIKE ? OR category LIKE ?
    `, [`%${cerca}%`, `%${cerca}%`]);

    const total = countRows[0].total;

    res.render('productes', {
      productes: db.table_to_json(rows),
      cerca,
      tePaginaAnterior: pagina > 0,
      tePaginaSeguent: offset + limit < total,
      paginaAnterior: pagina - 1,
      paginaSeguent: pagina + 1
    });

  } catch (err) {
    console.log(err);
    res.send("Error productes");
  }

});

// =====================================
// PRODUCTE AFEGIR
// =====================================
app.get('/producteAfegir', (req, res) => {
  res.render('producteAfegir');
});

// =====================================
// PRODUCTE EDITAR
// =====================================
app.get('/producteEditar', async (req, res) => {

  try {

    const id = req.query.id;

    const rows = await db.query(`
      SELECT *
      FROM products
      WHERE id=?
    `, [id]);

    res.render('producteEditar', {
      producte: db.table_to_json(rows)[0]
    });

  } catch (err) {
    console.log(err);
    res.send("Error editar producte");
  }

});

// =====================================
// CLIENTS
// =====================================
app.get('/clients', async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 0;
    const cerca = req.query.cerca || "";
    const vip = req.query.vip === "1";

    const limit = 10;
    const offset = pagina * limit;

    // CONSULTA CORRECTA
    const rows = await db.query(`
      SELECT 
        c.*,
        COUNT(s.customer_id) AS num_compras,
        COALESCE(SUM(s.total), 0) AS total_gastado
      FROM customers c
      LEFT JOIN sales s ON s.customer_id = c.id
      GROUP BY c.id
      HAVING (c.name LIKE ? OR c.email LIKE ?)
      ${vip ? 'AND COUNT(s.customer_id) >= 5' : ''}
      ORDER BY c.id DESC
      LIMIT ? OFFSET ?
    `, [`%${cerca}%`, `%${cerca}%`, limit, offset]);

    // Contador para paginación
    const countRows = await db.query(`
      SELECT COUNT(*) as total 
      FROM customers c
      WHERE c.name LIKE ? OR c.email LIKE ?
    `, [`%${cerca}%`, `%${cerca}%`]);

    const total = countRows[0].total;

    res.render('clients', {
      customers: db.table_to_json(rows),
      pagina,
      cerca,
      vip,
      tePaginaAnterior: pagina > 0,
      tePaginaSeguent: offset + limit < total,
      paginaAnterior: pagina - 1,
      paginaSeguent: pagina + 1
    });

  } catch (err) {
    console.error("Error en ruta /clients:", err);
    res.status(500).send("Error al cargar los clientes");
  }
});

// =====================================
// CLIENT AFEGIR
// =====================================
app.get('/clientAfegir', (req, res) => {
  res.render('clientAfegir');
});

// =====================================
// CLIENT EDITAR
// =====================================
app.get('/clientEditar', async (req, res) => {

  try {

    const id = req.query.id;

    const rows = await db.query(`
      SELECT *
      FROM customers
      WHERE id=?
    `, [id]);

    res.render('clientEditar', {
      client: db.table_to_json(rows)[0]
    });

  } catch (err) {
    console.log(err);
    res.send("Error client editar");
  }

});

// =====================================
// FITXA CLIENT
// =====================================
app.get('/clientFitxa', async (req, res) => {

  try {

    const id = req.query.id;

    const clientRows = await db.query(`
      SELECT *
      FROM customers
      WHERE id=?
    `, [id]);

    const vendesRows = await db.query(`
      SELECT *
      FROM sales
      WHERE customer_id=?
      ORDER BY sale_date DESC
      LIMIT 10
    `, [id]);

    res.render('clientFitxa', {
      client: db.table_to_json(clientRows)[0],
      vendes: db.table_to_json(vendesRows)
    });

  } catch (err) {
    console.log(err);
    res.send("Error fitxa client");
  }

});

// =====================================
// VENDES
// =====================================
app.get('/vendes', async (req, res) => {

  try {

    const rows = await db.query(`
      SELECT s.id, s.sale_date, s.total, c.name AS client
      FROM sales s
      JOIN customers c ON c.id=s.customer_id
      ORDER BY s.sale_date DESC
      LIMIT 20
    `);

    res.render('vendes', {
      sales: db.table_to_json(rows)
    });

  } catch (err) {
    console.log(err);
    res.send("Error vendes");
  }

});

// =====================================
// CREATE
// =====================================
app.post('/create', async (req, res) => {
  try {
    let { taula, ...data } = req.body;

    // Si por error 'taula' llega como array ["products", "products"], 
    // tomamos solo el primer elemento.
    if (Array.isArray(taula)) {
      taula = taula[0];
    }

    console.log("Insertando en:", taula); // Para verificar en consola

    await db.query(`INSERT INTO ${taula} SET ?`, [data]);
    res.redirect(redireccionar(taula));

  } catch (err) {
    console.error("Error SQL:", err.sqlMessage || err);
    res.status(500).send("Error al guardar: " + (err.sqlMessage || "Datos inválidos"));
  }
});
// =====================================
// UPDATE
// =====================================
app.post('/update', async (req, res) => {

  try {

    const { taula, id, ...data } = req.body;

    await db.query(`
      UPDATE ${taula}
      SET ?
      WHERE id=?
    `, [data, id]);

    res.redirect(redireccionar(taula));

  } catch (err) {
    console.log(err);
    res.send("Error update");
  }

});

// =====================================
// DELETE
// =====================================
app.post('/delete', async (req, res) => {

  try {

    const { taula, id } = req.body;

    await db.query(`
      DELETE FROM ${taula}
      WHERE id=?
    `, [id]);

    res.redirect(redireccionar(taula));

  } catch (err) {
    console.log(err);
    res.send("Error delete");
  }

});

// =====================================
// SERVER
// =====================================
const httpServer = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await db.end();
  httpServer.close();
  process.exit(0);
});
