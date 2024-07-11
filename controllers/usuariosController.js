// usuariosController.js
const Usuario = require("../models/usuariosModel.js");
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const traerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener un usuario por ID
const traerUnUsuario = async (nombre) => {
    try {
        return await Usuario.findOne({ where: { nombre } });
    } catch (error) {
        console.error("Error al obtener usuario por nombre:", error);
        throw new Error("Error al obtener usuario por nombre");
    }
};


// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contraseña } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            usuario.nombre = nombre;
            usuario.email = email;
            usuario.contraseña = contraseña;
            await usuario.save();
            res.json(usuario);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Borrar un usuario
const borrarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            await usuario.destroy();
            res.json({ mensaje: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al borrar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    
    try {
        // Encriptar la contraseña
        const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

        // Crear el usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contraseña: contraseñaEncriptada,
            rol: "usuario" // Asignar el rol como "usuario" por defecto
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error al crear usuario:", error);
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({ error: "El correo electrónico ya está registrado." });
        } else {
            res.status(500).json({ error: "Error al crear usuario. Inténtalo de nuevo." });
        }
    }
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
    const { nombre, contraseña } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { nombre } });
        if (usuario) {
            const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
            if (passwordMatch) {
                req.session.usuario = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    rol: usuario.rol
                };
                res.json({ mensaje: "Inicio de sesión exitoso", usuario: req.session.usuario });
            } else {
                res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
            }
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
// Cerrar sesión
const cerrarSesion = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).send("Error interno del servidor");
        }
        res.clearCookie('connect.sid');
        res.status(200).send("Sesión cerrada exitosamente");
    });
};

module.exports = {
    traerUsuarios,
    traerUnUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    iniciarSesion,
    cerrarSesion,
};
