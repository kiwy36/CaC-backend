// usuariosRouter.js
const express = require("express");
const router = express.Router();
const {
    traerUsuarios,
    traerUnUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    iniciarSesion,
    cerrarSesion,
} = require("../controllers/usuariosController.js");

// Definir rutas
router.get("/", traerUsuarios);
router.get("/:id", traerUnUsuario);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", borrarUsuario);
router.post("/iniciar-sesion", iniciarSesion);
router.post("/cerrar-sesion", cerrarSesion);

module.exports = router;
