// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const requireAuth = require('../middleware/requireAuth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Editing cart needs additional authorization
router.use(requireAuth);

// Add order to cart
router.post('/add', async (req, res) => {
    const requestData = req.body;
    const productId = requestData.product_id;
    const quantity = requestData.quantity;
    
    // Get the user ID from the request object (assuming it's attached by middleware)
    const userId = req.userId;

    try {
        // Find the product
        const product = await Product.findOne({ 
            where: { id: productId }
        });

        // Check if the product exists and if the requested quantity is available
        if (!product || product.quantity_available < quantity) {
            return res.status(400).json({ error: `Insufficient quantity available for product ${productId}` });
        }

        // Add the product to the user's cart
        const cartItem = await Cart.create({
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            product_price_at_purchase: product.price
        });

        // Send success response
        res.status(201).json({ message: 'Product added to cart successfully', cart_item: cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Retreive cart
router.get('/get', async (req, res) => {
    const userId = req.userId;
    
    // Get all cart entries with user id
    try {
        const cartEntries = await Cart.findAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']] 
        });
        res.json(cartEntries); 
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;

