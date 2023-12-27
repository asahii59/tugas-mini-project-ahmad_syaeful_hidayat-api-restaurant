const menuModel = require("../models/menuModel")

const exampleController = {}

exampleController.getAll = (req,res) => {
    const menus = menuModel.getAll((err,rows) => {
        if (err) {
            throw err;
        } else {
            res.json({
                data : rows
            })
        }
    });
}
// silahkan buat varian controller lain sesuai fitur masing masing
exampleController.create = (req,res) => {
    const menus = menuModel.create(req.body)
    res.json({
        message : menus
    })
}
module.exports = exampleController