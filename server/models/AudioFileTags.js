const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Tag = require('../models/Tag')

const AudioFileTags = sequelize.define('AudioFileTags', {
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

AudioFileTags.associate = (models) => {
    AudioFileTags.belongsTo(models.Tag, {foreingKey: 'id_etiqueta'})
}


module.exports = AudioFileTags