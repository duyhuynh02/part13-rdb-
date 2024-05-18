const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  }, 
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT, 
    allowNull: false
  }, 
  title: {
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  yearWritten: {
    type: DataTypes.INTEGER, 
    validate: {
        max: 2024,
        min: 1991
    }
  },
}, {
  sequelize,           
  underscored: true,    //use snake_case rather than camelCase
  timestamps: true,   
  modelName: 'blog'
})

module.exports = Blog 