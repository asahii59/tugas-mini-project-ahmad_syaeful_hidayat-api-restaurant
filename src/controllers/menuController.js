const menuModel = require("../models/menuModel");

const menuController = {}

//menambah menu
menuController.create = (req,res) => {
    const {item, price} = req.body
    //validasi item
    if (typeof item !== 'string' || item.trim() === '') {
        return res.status(400).json({ error: 'Item harus berupa huruf dan wajib diisi !' })
    }
    //validasi price
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Price harus berupa angka dan wajib diisi !' })
    }
    try {
        const createMenu = menuModel.create(req.body)
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

//menampilkan menu
menuController.getAll = (req,res) => {
    const menus = menuModel.getAll((err,rows) => {
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

//menampilkan menu by id
menuController.getById = (req,res) => {
    const {id} = req.params
    const menu = menuModel.getById(id,(err,rows) => {
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

//update menu
menuController.update = (req,res) =>{
    const {item, price} = req.body
    //validasi item
    if (typeof item !== 'string' || item.trim() === '') {
        return res.status(400).json({ error: 'Item harus berupa huruf dan wajib diisi !' })
    }
    //validasi price
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
        return res.status(400).json({ error: 'Price harus berupa angka dan wajib diisi !' })
    }
    try {
        const updateMenu = menuModel.update(req.params.id,req.body,(err,rows) => {
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

//delete menu
menuController.delete = (req,res) =>{
    try {
        const deleteMenu = menuModel.delete(req.params.id,(err,rows) => {
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

module.exports = menuController