const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 }, // Ensure price is not negative
        quantity: { type: Number, default: 1, min: 1 }, // Ensure quantity is at least 1
        image: { type: String, required: true }
    },
    { timestamps: true, versionKey: false } // Remove __v field from MongoDB
);

module.exports = mongoose.model("CartItem", cartItemSchema);
