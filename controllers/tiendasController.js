const Tienda = require("../models/tiendasModel.js");

// Obtener todas las tiendas
const traerTiendas = async (req, res) => {
  try {
    const tiendas = await Tienda.findAll();
    res.json(tiendas);
  } catch (error) {
    console.error("Error al obtener tiendas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener una tienda por ID
const traerUnaTienda = async (req, res) => {
  const { id } = req.params;
  try {
    const tienda = await Tienda.findByPk(id);
    if (tienda) {
      res.json(tienda);
    } else {
      res.status(404).json({ error: "Tienda no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear una nueva tienda
const crearTienda = async (req, res) => {
  const { nombre, direccion } = req.body;
  try {
    const nuevaTienda = await Tienda.create({
      nombre,
      direccion,
    });
    res.status(201).json(nuevaTienda);
  } catch (error) {
    console.error("Error al crear tienda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar una tienda por ID
const actualizarTienda = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion } = req.body;
  try {
    const tienda = await Tienda.findByPk(id);
    if (tienda) {
      tienda.nombre = nombre;
      tienda.direccion = direccion;
      await tienda.save();
      res.json(tienda);
    } else {
      res.status(404).json({ error: "Tienda no encontrada" });
    }
  } catch (error) {
    console.error("Error al actualizar tienda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Borrar una tienda por ID
const borrarTienda = async (req, res) => {
  const { id } = req.params;
  try {
    const tienda = await Tienda.findByPk(id);
    if (tienda) {
      await tienda.destroy();
      res.json({ message: "Tienda eliminada correctamente" });
    } else {
      res.status(404).json({ error: "Tienda no encontrada" });
    }
  } catch (error) {
    console.error("Error al borrar tienda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  traerTiendas,
  traerUnaTienda,
  crearTienda,
  actualizarTienda,
  borrarTienda,
};
