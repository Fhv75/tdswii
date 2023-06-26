const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Tag = require('../models/Tag')

const AlbumTags = sequelize.define('AlbumTags', {
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
    id_album: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "album_etiqueta",
    timestamps: false
})
AlbumTags.belongsTo(Tag, {
    foreignKey: 'id_etiqueta'
})

module.exports = AlbumTags