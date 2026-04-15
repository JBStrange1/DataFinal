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


function setGETUrl(url, myQuery){
  app.get(url, (req, res) => { 
    const id = req.params.id;
    connection.query(myQuery, [id] ,(err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
        res.json(rows);
      });
  })
}
function setPOSTUrl(url, myQuery){
  app.post(url, (req, res) => {
    let vals = [];
    if(req.body){
      vals = req.body;
    }
    connection.query(myQuery,[vals] ,(err2, rows2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ error: err2.message });
      }
      res.json(rows2);
    });
  });
}

//GET URLS
setGETUrl('/api/products', queries.getAllProducts);
setGETUrl('/api/equipment', queries.getAllEquipment);
setGETUrl('/api/materials', queries.getAllMaterials);
setGETUrl('/api/Streamers', queries.getAllStreamers);
setGETUrl('/api/drys', queries.getAllDrys);
setGETUrl('/api/midges', queries.getAllMidges);
setGETUrl('/api/nymphs', queries.getAllNymphs);
setGETUrl('/api/flies',queries.getAllFlies);
setGETUrl('/api/equipment/:id', queries.getEquipmentById);
setGETUrl('/api/flies/:id', queries.getFlieById);
setGETUrl('/api/materials/:id', queries.getMaterialById);
setGETUrl('/api/products/:id', queries.getProductById);
setGETUrl('/api/lastId', queries.getLastOrderId);
setGETUrl('/api/salesReports', queries.getSalesReport);

//POST URLS
setPOSTUrl('/api/order',queries.insertOrder);
setPOSTUrl('/api/orderitem',queries.insertOrderItems);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});