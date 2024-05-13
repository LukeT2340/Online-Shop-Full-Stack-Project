// Required libraries
const express = require('express');
const cors = require('cors');
const userController = require('./routers/userController');
const productController = require('./routers/productController');
const cartController = require('./routers/cartController');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Define port
const port = 3002;

// Define app
const app = express();

// Use cors
app.use(cors());

// Use cookie parser
app.use(cookieParser());

// Use signup routes
app.use('/user', userController);

// Use products routes
app.use('/products', productController);

// Use cart routes
app.use('/cart', cartController);

// Start listening
const server = app.listen(port, '0.0.0.0', () => {
    const address = server.address();
    console.log(`Server is listening at http://${address.address}:${address.port}`);
  });