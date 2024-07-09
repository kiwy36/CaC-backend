///////////////////
// importo la base de datos

const db = require ("../data/db.js")

const {DataTypes} = require ("sequelize")



const Carrito =db.define("tiendas",{
titulo:{type:DataTypes.STRING},
contenido:{type:DataTypes.STRING},
precio: { type: DataTypes.DECIMAL(10, 2) },
})

module.exports = Carrito