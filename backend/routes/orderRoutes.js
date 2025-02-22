const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Route to save an order
router.post("/place-order", async (req, res) => {
    try {
        const { name, email, address, cartItems } = req.body;

        if (!name || !email || !address || cartItems.length === 0) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newOrder = new Order({ name, email, address, cartItems });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
});

module.exports = router;
