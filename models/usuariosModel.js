const db = require('../data/db.js');
const { DataTypes } = require('sequelize');

const Usuario = db.define('usuarios', {
    nombre: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
});

module.exports = Usuario;
