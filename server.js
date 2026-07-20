const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("🏠 Hi asif your  Foodie Backend Running");
});

// ===============================
// MENU ROUTE
// ===============================

app.get("/menu", (req, res) => {

    const menu = [
        { id: 1, name: "Pizza", price: 299 },
        { id: 2, name: "Burger", price: 149 },
        { id: 3, name: "Pasta", price: 199 },
        { id: 4, name: "French Fries", price: 99 }
    ];

    res.json(menu);

});

// ===============================
// PLACE ORDER
// ===============================

app.post("/orders", (req, res) => {

    const {
        name,
        email,
        phone,
        address,
        city,
        pincode,
        cartItems,
        subtotal,
        gst,
        total
    } = req.body;

    const customerQuery = `
        INSERT INTO customers
        (name, email, phone, address, city, pincode)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        customerQuery,
        [name, email, phone, address, city, pincode],
        (err, customerResult) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Customer save failed"
                });
            }

            const customerId = customerResult.insertId;

            const delivery = 3;

            const orderQuery = `
                INSERT INTO orders
                (customer_id, subtotal, gst, delivery, total)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                orderQuery,
                [customerId, subtotal, gst, delivery, total],
                (err, orderResult) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "Order save failed"
                        });
                    }

                    const orderId = orderResult.insertId;

                    const itemQuery = `
                        INSERT INTO order_items
                        (order_id, product_name, quantity, price)
                        VALUES (?, ?, ?, ?)
                    `;

                    if (cartItems.length === 0) {

                        return res.json({
                            success: true,
                            message: "Order Placed Successfully"
                        });

                    }

                    let completed = 0;

                    cartItems.forEach(item => {

                        db.query(
                            itemQuery,
                            [
                                orderId,
                                item.name,
                                item.quantity,
                                item.price
                            ],
                            (err) => {

                                if (err) {
                                    console.log(err);
                                }

                                completed++;

                                if (completed === cartItems.length) {

                                    res.json({
                                        success: true,
                                        message: "🎉 Order Placed Successfully!"
                                    });

                                }

                            }
                        );

                    });

                }
            );

        }
    );

});

// ===============================
// SERVER START
// ===============================

app.listen(PORT, () => {

    console.log(`🚀 Server Running`);
    console.log(`http://localhost:${PORT}`);

});