const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    weight: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "default.jpg" }, // Set default image
    stock: { type: Number, required: true, min: 0 }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model("Product", productSchema);
