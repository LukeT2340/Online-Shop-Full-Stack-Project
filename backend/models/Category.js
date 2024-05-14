const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

// Define the Category model
const Category = sequelize.define('Category', {
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
}, {
    timestamps: false, 
    underscored: true, 
    tableName: 'categories' 
});

module.exports = Category;
