const express = require("express");
const CartItem = require("../models/CartItem");

const router = express.Router();

// Get all cart items
router.get("/", async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
});

// Add an item to the cart
router.post("/", async (req, res) => {
    try {
        const { productId, name, price, image } = req.body;

        // Validate required fields
        if (!productId || !name || !price || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the product is already in the cart
        let cartItem = await CartItem.findOne({ productId });

        if (cartItem) {
            cartItem.quantity += 1; // Increase quantity if already in the cart
        } else {
            cartItem = new CartItem({ productId, name, price, image, quantity: 1 });
        }

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});
// Delete an item from the cart
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the item exists
        const cartItem = await CartItem.findById(id);
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        // Delete the item
        await CartItem.findByIdAndDelete(id);
        res.json({ message: "Item removed from cart" });
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ error: "Failed to delete item from cart" });
    }
});


module.exports = router;
