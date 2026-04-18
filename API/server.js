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

app.post("/api/checkout", (req, res) => {
    let item = req.body;
    //Checks stock for item
    connection.query(queries.getCurrentStockById, [item.idProduct], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        const stockQty = rows[0].stock;
        if (stockQty < item.qty) {
            return res.status(500).json({ error: "No items in stock" });
        }
        //Inserts the Order
        connection.query(queries.insertOrder, (err, orderRows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            const orderId = orderRows.insertId;
            if (!orderId) {
                return res.status(500).json({ error: "Could not get OrderId" });
            }
            const insertVals = [item.idProduct, item.price, orderId, item.qty];
            //Inserts orderItems
            connection.query(queries.insertOrderItems, [insertVals], (err, rows) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                }
                //Decrements stock of product ordered
                const stockVals = [ item.idProduct, item.qty];
                connection.query(queries.decrementStock,[ stockVals], (err, rows) => {
                  if(err){
                    console.error(err);
                    return res.status(500).json({ error: err.message });
                  }
                })
                res.json(rows);
            });
        });
    });
});

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
  //QUERY'S
  setGETUrl('/api/products', queries.getAllProducts);
  setGETUrl('/api/equipment', queries.getAllEquipment);
  setGETUrl('/api/materials', queries.getAllMaterials);
  setGETUrl('/api/Streamers', queries.getAllStreamers);
  setGETUrl('/api/drys', queries.getAllDrys);
  setGETUrl('/api/midges', queries.getAllMidges);
  setGETUrl('/api/nymphs', queries.getAllNymphs);
  setGETUrl('/api/flies',queries.getAllFlies);
  setGETUrl('/api/stock', queries.getAllStock);
  setGETUrl('/api/checkMinStock', queries.getLowProductStock);

  //GET BY ID
  setGETUrl('/api/equipment/:id', queries.getEquipmentById);
  setGETUrl('/api/flies/:id', queries.getFlieById);
  setGETUrl('/api/materials/:id', queries.getMaterialById);
  setGETUrl('/api/products/:id', queries.getProductById);
  setGETUrl('/api/lastId', queries.getLastOrderId);

  //REPORTING 
  setGETUrl('/api/salesReports', queries.getSalesReport);
  setGETUrl('/api/productSalesQuarter', queries.getProductSalesQuarter);
  
//POST URLS
  setPOSTUrl('/api/order',queries.insertOrder);
  setPOSTUrl('/api/orderitem',queries.insertOrderItems);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});