const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('blogs', {
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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            year: {
                type: DataTypes.INTEGER, 
                validate: {
                    max: 2024, //I prefer data types as date.
                    min: 1991
                }
            }
        })

        await queryInterface.createTable('users', {
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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }, 
            updated_at: {
                type: DataTypes.DATE, 
                defaultValue: DataTypes.NOW
            }
        })
    }, 
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    }
}

