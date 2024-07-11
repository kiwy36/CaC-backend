// Importar módulos necesarios
const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/PostRouter.js");
const usuariosRouter = require("./routes/usuariosRouter.js");
const productosRouter = require("./routes/productosRouter.js");
const carritoRouter = require("./routes/carritoRouter.js");
const Sesion = require("./models/sesionesModel.js"); // Importa el modelo de sesiones
const db = require("./data/db.js");

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Middleware para verificar sesión
const verificarSesion = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  
  try {
    const sesion = await Sesion.findOne({ where: { token } });
    if (!sesion) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
    req.usuarioId = sesion.usuarioId;
    next();
  } catch (error) {
    console.error("Error al verificar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Ruta protegida
app.get('/ruta-protegida', verificarSesion, (req, res) => {
  res.json({ mensaje: "Acceso autorizado" });
});

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido al Home");
});

app.use("/posteos", postRouter);
app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

// Conexión a la base de datos
const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log(`Conectado Ok a la Base de datos`);
  } catch (error) {
    console.log(`Hay un error y es el siguiente : ${error}`);
  }
};

app.listen(port, () => {
  conexionDB();
  console.log(`Servidor Ok en el puerto ${port}`);
});
