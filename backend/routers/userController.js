// Required libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// All recieved data is converted to JSON format
router.use(bodyParser.json()); 

// Creates token
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, { expiresIn: '3d'});
};

// Hashes passwords
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds of 10
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Handle signup requests
router.post("/signup", async (req, res) => {
    const userData = req.body;
    const { password, email } = userData;
    try {

        // Railway isn't letting me create an email field that must be unique, so I'm manually checking whether the email exists
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (existingUser) {
            throw new Error(
                {
                    name: 'SequelizeUniqueConstraintError',
                    errors: [
                        {
                            path: 'email_UNIQUE'
                        }
                    ]
                }
            )
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            email: email,
            hashed_password: hashedPassword,
            date_registered: new Date()
        });
        const token = createToken(user.id);

        res.status(200).json({ user_id: user.id, email: user.email, token: token });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            if (error.errors[0].path === 'email_UNIQUE') {
                res.status(400).json({ errorMessage: "Someone is already registered with this email."})
            } else {
                res.status(400).json({ errorMessage: "Internal server error."})
            }
        } else {
            res.status(500).json({ errorMessage: 'Internal server error.' });
        }
    }
});

// Handle login requests
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ errorMessage: 'Invalid email.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(400).json({ errorMessage: 'Invalid password.' });
        }

        // Create JWT token
        const token = createToken(user.id);

        res.status(200).json({ user_id: user.id, email: user.email, token: token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ errorMessage: 'Internal server error.' });
    }
});


module.exports = router;

