const customerModel = require("../models/customerModel");

const customerController = {}

//menambah customer
customerController.create = (req,res) => {
    const {name, email} = req.body
    //validasi nama
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name harus berupa huruf dan wajib diisi !' })
    }
    //validdasi email
    if (typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ error: 'Email harus berupa huruf dan wajib diisi !' })
    }
    try {
        const createCustomer = customerModel.create(req.body)
        return res.json({
            status  : "OK",
            message : "Data Berhasil Ditambahkan!"
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

//menampilkan customer
customerController.getAll = (req,res) => {
    const customers = customerModel.getAll((err,rows) => {
        if (err) {
            throw err
        } else {
            res.json({
                status  : "OK",
                data    : rows
            })
        }
    })
}

//menampilkan customer by id
customerController.getById = (req,res) => {
    const {id} = req.params
    const customer = customerModel.getById(id,(err,rows) => {
        if (err) {
            throw err
        } else {
            res.json({
                status  : "OK",
                data    : rows
            })
        }
    })
}

//update customer
customerController.update = (req,res) =>{
    const {name, email} = req.body
    //validasi nama
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name harus berupa huruf dan wajib diisi !' })
    }
    //validdasi email
    if (typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ error: 'Email harus berupa huruf dan wajib diisi !' })
    }
    try {
        const updateCustomer = customerModel.update(req.params.id,req.body,(err,rows) => {
            if (err) {
                throw err
            } else {
                return res.json({
                    status  : "OK",
                    message : "Data Berhasil Diperbarui!"
                })
            }
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

//delete customer
customerController.delete = (req,res) =>{
    try {
        const deleteCustomer = customerModel.delete(req.params.id,(err,rows) => {
            if (err) {
                throw err
            } else {
                return res.json({
                    status  : "OK",
                    message : "Data Berhasil Dihapus!"
                })
            }
        })
    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}

module.exports = customerController