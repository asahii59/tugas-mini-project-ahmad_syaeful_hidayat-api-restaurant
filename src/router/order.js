const express = require("express");
const orderController = require("../controllers/orderController");
const routeOrder = express.Router();

routeOrder.post('/order/create',orderController.createOrder)
routeOrder.get('/order/histories',orderController.getCustomerHistory)

module.exports = routeOrder