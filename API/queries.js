module.exports = {
    getAllProducts: 
        `Select * from Products`,
    getAllFlies: 
        `select * from Products p, Flies f
        where p.idProduct = f.idProduct`,
    getAllMaterials: 
        `select * from Products p, Materials m
        where p.idProduct = m.idProduct`,
    getAllEquipment: 
        `select * from Products p, Equipment e
        where p.idProduct = e.idProduct`,
}