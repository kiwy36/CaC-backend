// Importar módulos necesarios
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const postRouter = require("./routes/PostRouter.js");
const usuariosRouter = require("./routes/usuariosRouter.js");
const productosRouter = require("./routes/productosRouter.js");
const carritoRouter = require("./routes/carritoRouter.js");
const db = require("./data/db.js");

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Configuración de la sesión
app.use(
  session({
    secret: 'secreto', // Cambia esto a un valor secreto para tu aplicación
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Asegúrate de cambiar esto a true si usas HTTPS
  })
);

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
