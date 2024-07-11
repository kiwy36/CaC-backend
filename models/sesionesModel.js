// sesionesModel.js
const db = require('../data/db.js');
const { DataTypes } = require('sequelize');

const Sesion = db.define('sesiones', {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'usuarios',
        key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Sesion;
