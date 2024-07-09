const express = require("express");
const router = express.Router();

// Controladores para el carrito
const {
  traerProductosCarrito,
  agregarProductoAlCarrito,
  eliminarProductoDelCarrito,
  vaciarCarrito,
} = require("./../controllers/carritoController.js"); // Asegúrate de importar los controladores correctos

// Definir rutas
router.get("/", traerProductosCarrito);
router.post("/", agregarProductoAlCarrito);
router.delete("/:id", eliminarProductoDelCarrito);
router.delete("/", vaciarCarrito);


module.exports = router;
