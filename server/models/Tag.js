const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const AudioFile = require('../models/AudioFile')

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    TAG: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, { 
    tableName: "etiqueta",
    timestamps: false
})

module.exports = Tag