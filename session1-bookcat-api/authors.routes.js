app.get("/authors", async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(dgConfig);
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
