const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const routeCategories = express.Router();

routeCategories.post('/categories/create',categoriesController.create)
routeCategories.get('/categories',categoriesController.getAll)
routeCategories.get('/categories/:id',categoriesController.getById)
routeCategories.put('/categories/update/:id',categoriesController.update)
routeCategories.delete('/categories/delete/:id',categoriesController.delete)

module.exports = routeCategories