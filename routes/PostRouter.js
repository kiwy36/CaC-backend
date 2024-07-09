const express = require("express");
const { traerPosteos, traerUnPosteo, crearPosteo, actualizarPosteo, borrarPosteo } = require("../controllers/postControllers.js");

const postRouter = express.Router();

postRouter.get("/", traerPosteos);
postRouter.get("/:id", traerUnPosteo);
postRouter.post("/", crearPosteo);
postRouter.put("/:id", actualizarPosteo);
postRouter.delete("/:id", borrarPosteo);

module.exports = postRouter;
