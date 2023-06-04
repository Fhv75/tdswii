// para comentarios
const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('../models/User')

const Comentarios = sequelize.define('Comentarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_pista: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "comentario_pista",
    timestamps: false
})
Comentarios.belongsTo(User, {foreignKey: 'id_usuario'})

module.exports = Comentarios