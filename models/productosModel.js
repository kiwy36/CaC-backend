const db = require('../data/db.js');
const { DataTypes } = require('sequelize');

const Producto = db.define('indumentaria', {
    titulo: { type: DataTypes.STRING },
    contenido: { type: DataTypes.STRING },
    precio: { type: DataTypes.DECIMAL(10, 2) },
});

module.exports = Producto;
