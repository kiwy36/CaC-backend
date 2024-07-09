const express = require("express");
const router = express.Router();

// Controladores para usuarios
const {
  traerUsuarios,
  traerUnUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
} = require("../controllers/usuariosController.js");

// Definir rutas
router.get("/", traerUsuarios);
router.get("/:id", traerUnUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", borrarUsuario);

module.exports = router;
