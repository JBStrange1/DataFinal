module.exports = {
    //GET DEFAULT
    getAllProducts:"Select * from Products",
    getAllFlies: "select * from Products p, Flies f where p.idProduct = f.idProduct",
    getAllMaterials:"select * from Products p, Materials m where p.idProduct = m.idProduct",
    getAllEquipment:"select * from Products p, Equipment e where p.idProduct = e.idProduct",
    getAllStreamers:"select * from Products p, Flies f where f.idProduct = p.idProduct and f.type = 'Streamer'",
    getAllMidges:"select * from Products p, Flies f where f.idProduct = p.idProduct and f.type = 'midge'",
    getAllDrys:"select * from Products p, Flies f where f.idProduct = p.idProduct and f.type = 'dry'",
    getAllNymphs: "select * from Products p, Flies f where f.idProduct = p.idProduct and f.type = 'nymph'",
    getAllStock:"select title, stock from products",
    getQuartlyTotals: "call totalQuarterSales()",
    //GET BY ID
    getProductById:"select * from Products where idProduct = ?",
    getEquipmentById:"select * from products p, equipment f where p.idProduct = f.idProduct and p.idProduct = ?",
    getMaterialById:"select * from products p, materials f where p.idProduct = f.idProduct and p.idProduct = ?",
    getFlieById:"select * from products p, flies f where p.idProduct = f.idProduct and p.idProduct = ?",
    
    //POST INSERTS
    insertOrder:"Insert into orders(OrderDate, idCustomer, total) values(curdate(), 1, ?);",
    insertOrderItems:"Insert into orderitems(idProduct, checkout_price, idOrder, quantity) values(?)",

    //MISCELLANEOUS
    getLastOrderId:"select LAST_INSERT_ID() as orderId; ",
    getSalesReport:"call salesReporting();",
    getProductSalesQuarter:"call productSalesQuarter();",
    getCurrentStockById:"select stock from products where idProduct = ?;",
    getLowProductStock:"select title, stock from products where stock < 10;",
    decrementStock:"call decrementStock(?);",
    recalcTotals:"call refreshSales();"
}