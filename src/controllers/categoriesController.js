const categoriesModel = require("../models/categoriesModel");

const categoriesController = {}

//menambah categories
categoriesController.create = (req,res) => {
    const {name} = req.body;
    //validasi nama
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name harus berupa huruf dan wajib diisi !' })
    }
    try {
        const createCategories = categoriesModel.create(req.body)
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

//menampilkan categories
categoriesController.getAll = (req,res) => {
    const categories = categoriesModel.getAll((err,rows) => {
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

//menampilkan categories by id
categoriesController.getById = (req,res) => {
    const {id} = req.params
    const categories = categoriesModel.getById(id,(err,rows) => {
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

//update categories
categoriesController.update = (req,res) =>{
    const {name} = req.body;
    //validasi nama
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name harus berupa huruf dan wajib diisi !' })
    }
    try {
        const updateCategories = categoriesModel.update(req.params.id,req.body,(err,rows) => {
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

//delete categories
categoriesController.delete = (req,res) =>{
    try {
        const deleteCategories = categoriesModel.delete(req.params.id,(err,rows) => {
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

module.exports = categoriesController