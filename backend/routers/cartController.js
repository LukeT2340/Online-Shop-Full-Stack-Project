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

// Add order to user's cart
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

        // Check if user already has a cart for this product
        const cart = await Cart.findOne({
            where: { product_id: productId, user_id: userId}
        })

        // If the user has an existing cart with this item, update it
        if (cart) {
            const requestedQuantity = quantity + cart.quantity;

            // Check if the product exists and if the requested quantity is available
            if (!product || requestedQuantity > product.quantity_available) {
                return res.status(400).json({ error: `Insufficient quantity available for product ${productId}` });
            }

            // Update cart quantity and save changes
            cart.quantity = requestedQuantity;
            await cart.save(); // Save changes to the database

            // Send success response
            return res.status(201).json({ message: 'Product added to cart successfully', cart_item: cart });
        }

        // Check if the product exists and if the requested quantity is available
        if (!product || product.quantity_available < quantity) {
            return res.status(400).json({ error: `Insufficient quantity available for product ${productId}` });
        }

        // Add the product to the user's cart
        const newCartItem = await Cart.create({
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            product_price_at_purchase: product.price
        });

        // Send success response
        res.status(201).json({ message: 'Product added to cart successfully', cart_item: newCartItem });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Retreive user's cart
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

// Remove product from user's cart
router.post('/removeEntry', async (req, res) => {
    const userId = req.userId; 
    const requestData = req.body;
    const productId = requestData.product_id;

    try {
        // Use Sequelize to delete the entry
        const deletedCount = await Cart.destroy({
            where: {
                product_id: productId,
                user_id: userId
            }
        });

        if (deletedCount > 0) {
            // Entry was successfully deleted
            return res.status(200).json({ message: 'Product removed from cart successfully.' });
        } else {
            // Entry with the provided product_id and user_id not found
            return res.status(404).json({ error: 'Product not found in the user\'s cart.' });
        }
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// Update item quantity of order
router.post('/updateItemQuantity', async (req, res) => {
    const userId = req.userId; 
    const requestData = req.body;
    const productId = requestData.product_id;
    const newQuantity = requestData.new_quantity;

    // Try to update the item quantity
    try {
        // Get product
        const product = await Product.findOne({
            where: {
                id: productId
            }
        })

        const cart = await Cart.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        })

        // Make sure cart entry exists
        if (!cart) {
            return res.status(404).json({ error: 'Cart entry could not be found.' });
        }

        // Make sure product exists
        if (!product) {
            return res.status(404).json({ error: 'Product not found.'});
        }
        
        // Make sure there is enough of the product to update order
        if (newQuantity > product.quantity_available) {
            return res.status(404).json({ error: `Insufficient quantity available for product ${productId}`})
        }

        // Update quantity
        cart.quantity = newQuantity;
        await cart.save();

        return res.status(201).json({ message: 'Order quantity successfully updated.' })
    } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;

