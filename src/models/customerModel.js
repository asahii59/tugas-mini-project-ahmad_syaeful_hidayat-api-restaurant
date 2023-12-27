const db = require("../../db/config")

const customerModel = {}

//menambah customer
customerModel.create = (data) => {
    return db.run(`INSERT INTO customer (name,address,email) VALUES ('${data.name}','${data.address}','${data.email}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}

//menampilkan customer
customerModel.getAll = (cb) => {
    var rowData
    const query = db.all("SELECT * FROM customer",(err,rows) => {
        if(err) {
            cb(err,null)
        }else {
            cb(null,rows)
        }
    })
    console.log(rowData);
    return query
}

customerModel.getAllHis = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer";
        db.all(query, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })

    })
}

//menampilkan customer by id
customerModel.getById = (id,cb) => {
    return db.get(`SELECT * FROM customer WHERE id = ${id}`,(err,rows) => {
        if(err) {
            cb(err,null)
        }else {
            cb(null,rows)
        }
    })
}

//update customer
customerModel.update = (id,data,cb) => {
    return db.run(`UPDATE customer SET name = '${data.name}',address = '${data.address}',email = '${data.email}' WHERE id = ${id}`,(err,row) => {
        if (err) {
            cb(err,null)
        } else {
            cb(null,row)
        }
    })
} 

//delete customer
customerModel.delete = (id,cb) => {
    return db.run(`DELETE FROM customer WHERE id = ${id}`,(err,row) => {
        if (err) {
            cb(err,null)
        } else {
            cb(null,row)
        }
    })
}

module.exports = customerModel