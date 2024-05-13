const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
});

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false 
    },
    handle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    hashed_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_registered: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
}, {
    timestamps: false, 
    underscored: true, 
    tableName: 'users' 
});

module.exports = User;
