// usuarios.js
document.addEventListener("DOMContentLoaded", () => {
    const formRegistrarUsuario = document.getElementById("form-registrar-usuario");
    const formIniciarSesion = document.getElementById("form-iniciar-sesion");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    const saludoUsuario = document.getElementById("saludo-usuario");


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
            console.log("Inicio de sesión:", respuesta.data);
            document.getElementById("mensaje-login").textContent = "Inicio de sesión exitoso.";
            formIniciarSesion.reset();
            saludoUsuario.textContent = `¡Hola, ${respuesta.data.usuario.nombre}!`;
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response.data.error);
            document.getElementById("mensaje-login").textContent = error.response.data.error;
        }
    });

     // Función para cerrar sesión
    const cerrarSesion = async () => {
        try {
            const respuesta = await axios.post("http://localhost:3030/usuarios/cerrar-sesion");
            if (respuesta.status === 200) {
                // Limpiar saludo del usuario
                saludoUsuario.textContent = "";
                // Mostrar formularios y elementos relevantes para usuarios no logueados
                formIniciarSesion.style.display = "block";
                // Mostrar el botón de cerrar sesión nuevamente
                btnCerrarSesion.style.display = "inline-block"; // Ajusta el estilo según corresponda
                // Lógica adicional de limpieza o redirección si es necesario
                alert("Sesión cerrada exitosamente.");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Error al cerrar sesión. Por favor, intenta nuevamente.");
        }
    };
    // Evento click para cerrar sesión
    btnCerrarSesion.addEventListener("click", cerrarSesion);
});
