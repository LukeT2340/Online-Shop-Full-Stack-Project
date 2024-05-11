// Required libraries
const express = require('express');
const cors = require('cors');
const userController = require('./routers/userController');
const session = require('express-session');
const passport = require('passport');
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

// Start listening
const server = app.listen(port, '127.0.0.1', () => {
    const address = server.address();
    console.log(`Server is listening at http://${address.address}:${address.port}`);
  });