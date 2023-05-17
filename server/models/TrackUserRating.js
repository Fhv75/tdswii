const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const TrackUserRating = sequelize.define('AudioFile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_pista: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    valoracion: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, { 
    // Trabaja en la tabla "pista_musica"
    tableName: "valoracion_pista_usuario",
})

module.exports = TrackUserRating
