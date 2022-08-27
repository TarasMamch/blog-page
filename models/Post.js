const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 241]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 241]
        }
    }
}, {
    sequelize
});

module.exports = Post