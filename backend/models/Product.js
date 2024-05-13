const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_POST,
});

// Define the User model
const Product = sequelize.define('Product', {
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false 
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false 
    },
    old_price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        unique: false,
        defaultValue: null
    },
    quantity_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    featured: {
        type: DataTypes.BOOLEAN,
    },
    category_id: {
        type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    amount_purchased: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    num_of_reviews: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false, 
    underscored: true, 
    tableName: 'products' 
});

module.exports = Product;
