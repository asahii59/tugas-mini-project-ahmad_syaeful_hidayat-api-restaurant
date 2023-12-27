const sqlite = require("sqlite3")

const db = new sqlite.Database("restaurant.db");

db.serialize(() => {
    db.run(`PRAGMA foreign_keys = ON;`);
    db.run
        (`CREATE TABLE IF NOT EXISTS menu 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, item TEXT, price REAL, 
            created  DATETIME default CURRENT_TIMESTAMP, updated DATETIME default CURRENT_TIMESTAMP);`
        )
    db.run
        (`CREATE TABLE IF NOT EXISTS customer 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT,email TEXT,
            created DATETIME default CURRENT_TIMESTAMP,updated DATETIME default CURRENT_TIMESTAMP);`
        )
    db.run
        (`CREATE TABLE IF NOT EXISTS categories 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,
            created  DATETIME default CURRENT_TIMESTAMP, updated DATETIME default CURRENT_TIMESTAMP);`
        )
    db.run
        (`CREATE TABLE IF NOT EXISTS orders 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER, menu_id INTEGER, qty INTEGER, order_date DATE, 
            created DATETIME default CURRENT_TIMESTAMP,updated DATETIME default CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES customer(id), 
            FOREIGN KEY (menu_id) REFERENCES menu(id));`
        )
})
db.on('open',() => console.log("Success generate table !"))
db.on('error',() => console.log("database error!"))

module.exports = db