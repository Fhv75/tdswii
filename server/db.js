// Conexión a la base de datos
// Se utiliza una variable de entorno para más seguridad

const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")


// Cargando variables de entorno desde .env
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    ssl: process.env.NODE_ENV === 'production',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' && {
            require: true,
            rejectUnauthorized: false
        }
    }
})

module.exports = sequelize