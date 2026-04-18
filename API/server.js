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
    const cart = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
    }

    // First check stock for all items
    const checkStock = (index) => {
        if (index >= cart.length) {
            return insertOrder();
        }

        const item = cart[index];

        connection.query(queries.getCurrentStockById, [item.idProduct], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }

            const stockQty = rows[0].stock;

            if (stockQty < item.qty) {
                return res.status(400).json({ error: `Not enough stock for product ${item.idProduct}` });
            }

            checkStock(index + 1);
        });
    };

    const insertOrder = () => {
      let total = 0;
      for (const item of cart) {
          total += item.price * item.qty;
      }
      connection.query(queries.insertOrder,[total], (err, orderRows) => {
          if (err) {
              console.error(err);
              return res.status(500).json({ error: err.message });
          }

          const orderId = orderRows.insertId;

          if (!orderId) {
              return res.status(500).json({ error: "Could not get OrderId" });
          }

          insertOrderItems(orderId, 0);
      });
    };

    const insertOrderItems = (orderId, index) => {
        if (index >= cart.length) {
            return res.json({ success: true, orderId: orderId });
        }

        const item = cart[index];
        const insertVals = [item.idProduct, item.price, orderId, item.qty];

        connection.query(queries.insertOrderItems, [insertVals], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }

            const stockVals = [item.idProduct, item.qty];

            connection.query(queries.decrementStock, [stockVals], (err2) => {
                if (err2) {
                    console.error(err2);
                    return res.status(500).json({ error: err2.message });
                }

                insertOrderItems(orderId, index + 1);
            });
        });
    };

    checkStock(0);
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