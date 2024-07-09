const Producto = require("../models/productosModel.js");
const Carrito = require("../models/carritoModel.js");

// Traer productos del carrito
const traerProductosCarrito = async (req, res) => {
  try {
    const productos = await Carrito.findAll();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos del carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Agregar producto al carrito
const agregarProductoAlCarrito = async (req, res) => {
  const { id } = req.body;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const nuevoProducto = await Carrito.create({
      titulo: producto.titulo,
      contenido: producto.contenido,
      precio: producto.precio,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar producto del carrito por ID
const eliminarProductoDelCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Carrito.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }

    await producto.destroy();
    res.json({ message: "Producto eliminado del carrito correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Vaciar todo el carrito
const vaciarCarrito = async (req, res) => {
  try {
    await Carrito.destroy({
      where: {},
      truncate: true,
    });

    res.json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  traerProductosCarrito,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
  vaciarCarrito,
};
