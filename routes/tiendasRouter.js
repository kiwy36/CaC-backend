const express = require("express");
const router = express.Router();

// Controladores para tiendas
const {
  traerTiendas,
  traerUnaTienda,
  crearTienda,
  actualizarTienda,
  borrarTienda,
} = require("../controllers/tiendasController.js");

// Definir rutas
router.get("/", traerTiendas);
router.get("/:id", traerUnaTienda);
router.post("/", crearTienda);
router.put("/:id", actualizarTienda);
router.delete("/:id", borrarTienda);

module.exports = router;
