const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true     
    }, 
    name: {
        type: DataTypes.TEXT, 
        allowNull: false
    }, 
    username: {
        type: DataTypes.TEXT, 
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT, 
        defaultValue: 'password',
    },
    email: {
        type: DataTypes.TEXT, 
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    active: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
    }, 
}, {
    sequelize, 
    timestamps: true, 
    underscored: true, 
    modelName: 'user'
})

module.exports = User 