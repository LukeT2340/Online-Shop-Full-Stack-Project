// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const Category = require('../models/Category');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Get categories
router.get('/get', async (req, res) => {
    // Validate and parse the limit query parameter
    const limit = parseInt(req.query.limit, 10);
    if (isNaN(limit) || limit <= 0 || limit > 20) {
        return res.status(400).json({ error: 'Invalid limit parameter' });
    }

    try {
        const categories = await Category.findAll({
            limit: Math.min(limit, 20), // Apply limit, but ensure it doesn't exceed 20
            order: [['id', 'DESC']],
        });
        res.status(200).json(categories);

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});


module.exports = router;

