const express = require("express");
const menuController = require("../controllers/menuController");
const routeMenu = express.Router();

routeMenu.post('/menu/create',menuController.create)
routeMenu.get('/menus',menuController.getAll)
routeMenu.get('/menu/:id',menuController.getById)
routeMenu.put('/menu/update/:id',menuController.update)
routeMenu.delete('/menu/delete/:id',menuController.delete)

module.exports = routeMenu