const Usuario = require("../models/usuariosModel.js");
const Sesion = require("../models/sesionesModel.js");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

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
const traerUnUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({ where: { id } });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario por nombre:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña,
      rol: "usuario"
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
        const token = uuidv4();
        await Sesion.create({
          usuarioId: usuario.id,
          token
        });
        res.json({ mensaje: "Inicio de sesión exitoso", token });
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
const cerrarSesion = async (req, res) => {
  const { token } = req.body;
  try {
    await Sesion.destroy({ where: { token } });
    res.status(200).send("Sesión cerrada exitosamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).send("Error interno del servidor");
  }
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
