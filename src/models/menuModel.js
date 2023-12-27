const db = require("../../db/config")

const menuModel = {}

//menambah menu
menuModel.create = (data) => {
    return db.run(`INSERT INTO menu (item,price) VALUES ('${data.item}','${data.price}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

//menampilkan semua menu
menuModel.getAll = (cb) => {
    var rowData
    const query = db.all("SELECT * FROM menu",(err,rows) => {
        if(err) {
            cb(err,null)
        }else {
            cb(null,rows)
        }
    })
    console.log(rowData);
    return query
}

//menampilkan menu by id
menuModel.getById = (id,cb) => {
    return db.get(`SELECT * FROM menu WHERE id = ${id}`,(err,rows) => {
        if(err) {
            cb(err,null)
        }else {
            cb(null,rows)
        }
    })
}

//update menu
menuModel.update = (id,data,cb) => {
    return db.run(`UPDATE menu SET item = '${data.item}',price = '${data.price}' WHERE id = ${id}`,(err,row) => {
        if (err) {
            cb(err,null)
        } else {
            cb(null,row)
        }
    })
} 

//delete menu
menuModel.delete = (id,cb) => {
    return db.run(`DELETE FROM menu WHERE id = ${id}`,(err,row) => {
        if (err) {
            cb(err,null)
        } else {
            cb(null,row)
        }
    })
}

module.exports = menuModel