const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const Tag = require('../models/Tag')
const AlbumTags = require('../models/AlbumTags')

const Album = sequelize.define('Album', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artista: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url_portada: {
        type: DataTypes.STRING
    },
}, {
    tableName: "album",
})

Album.belongsToMany(sequelize.models.AudioFile, { through: 'pista_album', foreignKey: 'idalbum', otherKey: 'idpista' })

Album.prototype.setTags = async function (tags) {

    const tagPromises = tags.map((tag) =>
        Tag.findOrCreate({
            where: {
                TAG: tag
            }
        })
    )

    const tagInstances = (await Promise.all(tagPromises)).map(([tagInstance]) => tagInstance)

    for (const tagInstance of tagInstances) {
        console.log(tagInstance.dataValues.TAG)
        await AlbumTags.findOrCreate({
            where: {
                id_album: this.id,
                id_etiqueta: tagInstance.dataValues.id
            }
        })
    }
}

module.exports = Album