// usuarios.js
document.addEventListener("DOMContentLoaded", () => {
  const formRegistrarUsuario = document.getElementById("form-registrar-usuario");
  const formIniciarSesion = document.getElementById("form-iniciar-sesion");
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  const saludoUsuario = document.getElementById("saludo-usuario");

  let sessionToken = null;

  // Función para registrar un nuevo usuario
  formRegistrarUsuario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nombre = document.getElementById("nombre-registro").value;
    const email = document.getElementById("email-registro").value;
    const contraseña = document.getElementById("contraseña-registro").value;

    try {
      const respuesta = await axios.post("http://localhost:3030/usuarios/", {
        nombre,
        email,
        contraseña
      });
      console.log("Usuario registrado:", respuesta.data);
      document.getElementById("mensaje-registro").textContent = "Usuario registrado correctamente.";
      formRegistrarUsuario.reset();
    } catch (error) {
      console.error("Error al registrar usuario:", error.response.data.error);
      document.getElementById("mensaje-registro").textContent = error.response.data.error;
    }
  });

  // Función para iniciar sesión
  formIniciarSesion.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nombre = document.getElementById("nombre-login").value;
    const contraseña = document.getElementById("contraseña-login").value;

    try {
      const respuesta = await axios.post("http://localhost:3030/usuarios/iniciar-sesion", {
        nombre,
        contraseña
      });

      sessionToken = respuesta.data.token;
      console.log("Sesión iniciada:", sessionToken);
      document.getElementById("mensaje-login").textContent = "Sesión iniciada correctamente.";
      saludoUsuario.textContent = `Bienvenido, ${nombre}`;
      formIniciarSesion.reset();
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response.data.error);
      document.getElementById("mensaje-login").textContent = error.response.data.error;
    }
  });

  // Función para cerrar sesión
  btnCerrarSesion.addEventListener("click", async () => {
    try {
      await axios.post("http://localhost:3030/usuarios/cerrar-sesion", { token: sessionToken });
      sessionToken = null;
      console.log("Sesión cerrada");
      saludoUsuario.textContent = "";
      document.getElementById("mensaje-login").textContent = "Sesión cerrada correctamente.";
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response.data.error);
      document.getElementById("mensaje-login").textContent = error.response.data.error;
    }
  });
});
