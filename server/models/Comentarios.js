// para comentarios
const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const User = require('../models/User')
const AudioFile = require('./AudioFile')

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
    id_pista: {
        type: DataTypes.INTEGER,
        allowNull: false    
    },
    id_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "comentario_pista",
})
Comentarios.belongsTo(User, {foreignKey: 'id_usuario', targetKey: 'correo' }); // Relación con la tabla User usando el campo 'correo'
Comentarios.belongsTo(AudioFile, { foreignKey: 'id_pista' , targetKey: 'id'});// Lo mismo

module.exports = Comentarios