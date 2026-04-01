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
    getAllStreamers: 
        `select * from Products p, Flies f
        where f.idProduct = p.idProduct and f.type = 'Streamer'`,
    getAllMidges: 
        `select * from Products p, Flies f
        where f.idProduct = p.idProduct and f.type = 'midge'`,
    getAllDrys: 
        `select * from Products p, Flies f
        where f.idProduct = p.idProduct and f.type = 'dry'`,
    getAllNymphs: 
        `select * from Products p, Flies f
        where f.idProduct = p.idProduct and f.type = 'nymph'`,
}