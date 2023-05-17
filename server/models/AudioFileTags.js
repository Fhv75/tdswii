const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const AudioFileTags = sequelize.define('AudioFileTag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_etiqueta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_pista: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "pista_etiqueta",
    timestamps: false
})

module.exports = AudioFileTags