const express = require("express");
const customerController = require("../controllers/customerController");
const routeCustomer = express.Router();

routeCustomer.post('/customer/create',customerController.create)
routeCustomer.get('/customers',customerController.getAll)
routeCustomer.get('/customer/:id',customerController.getById)
routeCustomer.put('/customer/update/:id',customerController.update)
routeCustomer.delete('/customer/delete/:id',customerController.delete)

module.exports = routeCustomer