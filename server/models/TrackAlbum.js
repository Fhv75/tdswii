const { DataTypes } = require('sequelize')
const sequelize = require('../db')


const TrackAlbum = sequelize.define('TrackAlbum', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    idpista: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idalbum: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "pista_album",
})

module.exports = TrackAlbum