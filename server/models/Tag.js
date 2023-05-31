const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const AudioFileTags = require('../models/AudioFileTags')
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
Tag.hasMany(AudioFileTags, { foreingKey: 'id_etiqueta' })

Tag.associate = (models) => {
    Tag.belongsToMany(models.AudioFile, {through: 'AudioFileTags', foreignKey: 'id_etiqueta'})
}


module.exports = Tag