require('dotenv').config();

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {trustServerCertificate: true },
}
const express = require('express');
const sql = require('mssql'); // new line
const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the Book Category API');
});
app.get('/about', (req,res) => {
    res.send('Hi My name is Gladriel');
});
app.get('/db-test', async (req, res) => {
try {
const pool = await sql.connect(dbConfig);
const result = await pool.request()
.query('SELECT COUNT(*) AS Total FROM Author');
await pool.close();
res.json({ connected: true, authors: result.recordset[0].Total });
} catch (err) {
res.status(500).json({ connected: false, error: err.message });
}
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

app.get('/categories', (req, res) => {
    res.json([
        { id: 1, name: 'Fiction' },
        { id: 2, name: 'Non-Fiction' },
        { id: 3, name: 'Biography' }
    ]);
});
app.get("/authors", async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(dbConfig);
        const sqlQuery = "SELECT AuthorID, Name FROM Author";
        const request = connection.request();
        const result = await request.query(sqlQuery);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: "Database error"});
    } finally {
        if (connection) await connection.close();
    }
});
app.get("/publishers", async(req, res) => {
    let connection;
    try {
        connection = await sql.connect(dbConfig);
        const request = connection.request();
        const result = await request.query(c)
    } catch (err) {
        console.error(err);
        res.status(200).json({error: 'Database error'});
    } finally{
        if (connection) await connection.close();
    }
});
