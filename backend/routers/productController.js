// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const Product = require('../models/Product');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Get several features products
router.get('/featured', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    console.log(`${req.ip} visited your site.`)
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
        return res.status(500).json({ error: 'Please provide a product id in the query'})
    }

    try {
        const product = await Product.findOne({
            where: { id: id }
        });

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get products of certain category
router.get('/category', async (req, res) => {
    const categoryId = parseInt(req.query.category_id, 10);
    const limit = parseInt(req.query.limit, 10);

    if (isNaN(categoryId) || categoryId <= 0) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }

    if (isNaN(limit) || limit <= 0 || limit > 20) {
        return res.status(400).json({ error: 'Invalid limit parameter' });
    }

    try {
        const products = await Product.findAll({
            limit: Math.min(limit, 20), // Apply limit, but ensure it doesn't exceed 20
            order: [['updated_at', 'DESC']],
            where: { 
                category_id: categoryId,
            }
        });
        res.status(200).json(products);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Search products
router.get('/search', async (req, res) => {
    const text = req.query.text.trim();

    if (!text) {
        return res.status(400).json({ error: "No search text provided" });
    }

    try {
        // Perform case-insensitive search using Sequelize
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${text.toLowerCase()}%`),
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${text.toLowerCase()}%`)
                ]
            }
        });

        res.json(products);
    } catch (error) {
        console.error("Error searching for products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

