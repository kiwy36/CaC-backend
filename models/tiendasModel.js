///////////////////
// importo la base de datos

const db = require ("../data/db.js")

const {DataTypes} = require ("sequelize")



const Tienda =db.define("tiendas",{
titulo:{type:DataTypes.STRING},
contenido:{type:DataTypes.STRING},
})

module.exports = Tienda