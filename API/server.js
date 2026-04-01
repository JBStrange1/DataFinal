var express = require("express");
const mysql = require("mysql2");
const dbconfig = require("./dbconfig");
const queries = require("./queries")

const PORT = 3006;
const app = express();

console.log(dbconfig)
const connection = mysql.createConnection(dbconfig);

connection.connect((err) => {
  if (err) {
    console.error("Connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.use(express.json());

app.get('/api/products', (req, res) => {
  connection.query(queries.getAllProducts, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
app.get('/api/equipment', (req, res) => {
    connection.query(queries.getAllEquipment, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
app.get('/api/materials', (req, res) => {
    connection.query(queries.getAllMaterials, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
app.get('/api/flies', (req, res) => {
    connection.query(queries.getAllFlies, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});