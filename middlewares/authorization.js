// authorization.js

const { v4: uuidv4 } = require('uuid');
const Sesion = require('../models/sesionesModel.js');

// Generar y guardar sesión en la base de datos
const generarSesion = async (usuarioId) => {
    const token = uuidv4(); // Genera un token único
    try {
        await Sesion.create({ usuarioId, token });
        return token;
    } catch (error) {
        console.error("Error al generar sesión:", error);
        throw new Error("Error al generar sesión");
    }
};

// Validar sesión por token
const validarSesion = async (token) => {
    try {
        const sesion = await Sesion.findOne({ where: { token } });
        return sesion;
    } catch (error) {
        console.error("Error al validar sesión:", error);
        throw new Error("Error al validar sesión");
    }
};

// Eliminar sesión por token
const eliminarSesion = async (token) => {
    try {
        await Sesion.destroy({ where: { token } });
    } catch (error) {
        console.error("Error al eliminar sesión:", error);
        throw new Error("Error al eliminar sesión");
    }
};
module.exports = {
    generarSesion,
    validarSesion,
    eliminarSesion,
};
const verificarSesion = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }
  
    try {
        const sesion = await Sesion.findOne({ where: { token } });
        if (!sesion) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }
        req.usuarioId = sesion.usuarioId;
        next();
    } catch (error) {
        console.error("Error al verificar sesión:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = verificarSesion;
