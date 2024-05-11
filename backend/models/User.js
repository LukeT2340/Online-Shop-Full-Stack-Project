const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('my_db_01', 'root', 'National$1', {
  host: 'localhost',
  dialect: 'mysql'
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
    bio: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    profile_picture_url: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    following_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    followers_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false, 
    underscored: true, 
    tableName: 'users' 
});

module.exports = User;
