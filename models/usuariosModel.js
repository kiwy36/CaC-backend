// usuariosModels.js
const db = require('../data/db.js');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Usuario = db.define('usuarios', {
    nombre: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    contraseña: { type: DataTypes.STRING },
    rol: { type: DataTypes.ENUM('administrador', 'usuario'), defaultValue: 'usuario' }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
            usuario.contraseña = hashedPassword;
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('contraseña')) {
                const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
                usuario.contraseña = hashedPassword;
            }
        }
    }
});

module.exports = Usuario;
