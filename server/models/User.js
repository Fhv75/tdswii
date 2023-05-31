const { DataTypes } = require('sequelize')
const sequelize = require('../db')


// Se crea un objeto "User", cuyas propiedades se corresponden con las de la tabla "usuario" de la DB

const User = sequelize.define('User', {
    correo: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true
    },
    ciudad: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    biografia: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    tipo_user: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, { 
    // Trabaja en la tabla "usuario"
    tableName: "usuario",
    // Remueve "createdAt" y "updatedAt"
    timestamps: false
})

module.exports = User