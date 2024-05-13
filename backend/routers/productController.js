// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const Product = require('../models/Product');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Get several features products
router.get('/featured', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    try {
        const products = await Product.findAll({ 
            limit: limit < 21 ? limit : 20,
            order: [['updated_at', 'DESC']],
            where: { featured: 1}
        });

        res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching featured products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
});

// Get one product
router.get('/getOne', async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(500).json({ error: 'Please provide a product id in the query'})
    }

    try {
        const product = await Product.findOne({
            where: { id: id }
        });

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

