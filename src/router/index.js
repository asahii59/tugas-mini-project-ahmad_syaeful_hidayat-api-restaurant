const express = require("express")
const exampleController = require("../controllers/ExampleController")
const routeMenu = require("./menu")
const routeCustomer = require("./customer")
const routeCategories = require("./categories")
const routeOrder = require("./order")
const router = express.Router()

router.get('/',exampleController.getAll)
router.use('/',routeMenu)
router.use('/',routeCustomer)
router.use('/',routeCategories)
router.use('/',routeOrder)

module.exports = router
