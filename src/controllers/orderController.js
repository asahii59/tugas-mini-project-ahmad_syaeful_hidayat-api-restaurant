const orderModel = require("../models/orderModel");
const customerModel = require("../models/customerModel");

const orderController = {};

//menambah order
orderController.createOrder = async (req, res) => {
    const { customerId, items } = req.body;

    if (!customerId || !items || !Array.isArray(items)) {
        return res.status(400).json({
            status: "Error",
            message: "Request Tidak Valid",
        });
    }

    try {
        const result = await orderModel.createOrder(customerId, items);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Gagal Membuat Pesanan.",
            error: error.message,
        });
    }
};

//menampilkan history order
orderController.getCustomerHistory = async (req, res) => {
    try {
        const allCustomers = await customerModel.getAllHis();
        const customerHistoryData = [];

        for (const customer of allCustomers) {
            const customerId = customer.id;
            const customerName = customer.name;
            const customerHistory = await orderModel.getCustomerHistory(customerId);

            if (customerHistory.length > 0) {
                const orderDate = customerHistory[0].order_date;

                const orders = customerHistory.map((history) => {
                    return {
                        menu: history.menu,
                        price: history.price,
                        qty: history.qty,
                    };
                });

                const totalOrder = orders.reduce((total, order) => {
                    return total + order.price * order.qty;
                }, 0);

                customerHistoryData.push({
                    customerName,
                    orders,
                    totalOrder,
                    orderDate,
                });
            }
        }

        res.json({
            status: 'OK',
            data: customerHistoryData,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Gagal Mengambil Data History Pemesanan Pelanggan.',
            error: error.message,
        });
    }
};

module.exports = orderController;