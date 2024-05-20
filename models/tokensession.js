const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class TokenSession extends Model {}

TokenSession.init({
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    token: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    userId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'users', key: 'id' },
        field: 'user_id'
    },   
}, {
  sequelize,           
  underscored: true,    
  timestamps: false,   
  modelName: 'tokensession'
})

module.exports = TokenSession 