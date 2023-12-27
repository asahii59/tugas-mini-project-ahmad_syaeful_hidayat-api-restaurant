const db = require("../../db/config");

const orderModel = {};

//menambah order
orderModel.createOrder = (customerId, items) => {
    return new Promise((resolve, reject) => {
        const orderDate = new Date().toISOString().slice(0, 10);
        let totalOrder = 0;
        const orders = [];

        db.serialize(() => {
            db.run("BEGIN TRANSACTION");
            for (const item of items) {
                const { menu, price, qty } = item;
                totalOrder += price * qty;

                db.run(
                    "INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES (?, (SELECT id FROM menu WHERE item = ?), ?, ?)",
                    [customerId, menu, qty, orderDate],
                    function (err) {
                        if (err) {
                            db.run("ROLLBACK");
                            reject(err);
                        } else {
                            orders.push({ menu, price, qty });
                            if (orders.length === items.length) {

                                db.run("COMMIT", function (err) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve({
                                            status: "OK",
                                            message: "Data Berhasil Ditambahkan",
                                            orders,
                                            totalOrder,
                                            orderDate,
                                        });
                                    }
                                });
                            }
                        }
                    }
                );
            }
        });
    });
};

//menampilkan history order
orderModel.getCustomerHistory = (customerId) => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT 
          o.order_date, 
          m.item AS menu, 
          m.price, 
          o.qty
        FROM orders AS o
        JOIN menu AS m ON o.menu_id = m.id
        WHERE o.customer_id = ?
        ORDER BY o.order_date DESC;
      `;

        db.all(query, [customerId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = orderModel;