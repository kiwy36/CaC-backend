const express = require("express");
const router = express.Router();

// Controladores para productos
const {
  traerProductos,
  traerUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productosController.js");

// Definir rutas
router.get("/", traerProductos);
router.get("/:id", traerUnProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", borrarProducto);

module.exports = router;
