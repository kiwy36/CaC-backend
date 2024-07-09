const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Estas en usuarios");
});

router.get("/:id", (req, res) => {
    res.send(`Estas viendo el post con ID: ${req.params.id}`);
});

router.post("/", (req, res) => {
    res.send("usuario creado");
});

router.put("/:id", (req, res) => {
    res.send(`Post con ID: ${req.params.id} actualizado`);
});

router.delete("/:id", (req, res) => {
    res.send(`Post con ID: ${req.params.id} eliminado`);
});

module.exports = router;
