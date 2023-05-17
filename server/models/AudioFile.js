const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Tag = require('../models/Tag')
const AudioFileTags = require('../models/AudioFileTags')

const AudioFile = sequelize.define('AudioFile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cant_reprod: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_user_cargas: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, { 
    // Trabaja en la tabla "pista_musica"
    tableName: "pista_musica",
})

AudioFile.associate = (models) => {
    AudioFile.belongsToMany(models.Tag, { through: 'AudioFileTags', as: 'tags' });
};

AudioFile.prototype.setTags = async function (tags) {

     const tagPromises = tags.map((tag) => 
            Tag.findOrCreate({
                where: { TAG: tag }
            })
        )

    const tagInstances = (await Promise.all(tagPromises)).map(([tagInstance]) => tagInstance)
    
    for (const tagInstance of tagInstances) {
        console.log(tagInstance.dataValues.TAG)
        await AudioFileTags.findOrCreate({
            where: { 
                id_pista: this.id,
                id_etiqueta: tagInstance.dataValues.id
            }
        })
    }
}

module.exports = AudioFile