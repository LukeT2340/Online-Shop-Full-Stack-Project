const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('my_db_01', 'root', 'National$1', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the User model
const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true 
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'User', 
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        references: {
            model: 'Product', 
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false 
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    product_price_at_purchase: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    timestamps: false, 
    underscored: true, 
    tableName: 'cart' 
});

module.exports = Cart;
