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


function setUrl(url, myQuery){
    app.get(url, (req, res) => {
      if(url.includes(":")){ 
        const id = req.params.id;
        let stIdx = myQuery.search(":");
        let tempQuery = myQuery.replace(myQuery.slice(stIdx, myQuery.length), id);
        myQuery = tempQuery
      }
      connection.query(myQuery, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        })
  })
}
setUrl('/api/products/:id', queries.getProductById);
setUrl('/api/products', queries.getAllProducts);
setUrl('/api/equipment', queries.getAllEquipment);
setUrl('/api/materials', queries.getAllMaterials);
setUrl('/api/Streamers', queries.getAllStreamers);
setUrl('/api/drys', queries.getAllDrys);
setUrl('/api/midges', queries.getAllMidges);
setUrl('/api/nymphs', queries.getAllNymphs);
setUrl('/api/flies',queries.getAllFlies);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});