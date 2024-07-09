const Usuario = require("../models/usuariosModel.js");

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
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nombre = nombre;
      usuario.email = email;
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

// Borrar un usuario por ID
const borrarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      await usuario.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al borrar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  traerUsuarios,
  traerUnUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
