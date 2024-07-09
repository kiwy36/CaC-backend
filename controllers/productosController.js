const Producto = require("../models/productosModel.js");

// Obtener todos los productos
const traerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
const traerUnProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { titulo, contenido, precio } = req.body;
  try {
    const nuevoProducto = await Producto.create({
      titulo,
      contenido,
      precio,
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar un producto por ID
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, precio } = req.body;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      producto.titulo = titulo;
      producto.contenido = contenido;
      producto.precio = precio;
      await producto.save();
      res.json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Borrar un producto por ID
const borrarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.destroy();
      res.json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al borrar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  traerProductos,
  traerUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
