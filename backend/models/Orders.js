const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    cartItems: [
        {
            title: String,
            author: String,
            cover: String,
        },
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
