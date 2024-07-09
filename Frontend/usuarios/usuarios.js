/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
    /* Obtener el body de la tabla donde se mostrarán los usuarios */
    const bodyTablaUsuarios = document.querySelector(".contenido");

    // Función para obtener y mostrar los usuarios
    const fetchUsuarios = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3030/usuarios/");
            const usuarios = respuesta.data;
            // Limpiar la tabla antes de agregar los nuevos datos
            bodyTablaUsuarios.innerHTML = "";

            // Iterar sobre los datos y agregar cada usuario a la tabla
            usuarios.forEach(usuario => {
                // Crear elementos HTML para cada usuario
                const divUsuario = document.createElement("div");
                divUsuario.classList.add("usuario");

                const nombreUsuario = document.createElement("h2");
                nombreUsuario.textContent = usuario.nombre;

                const emailUsuario = document.createElement("p");
                emailUsuario.textContent = `Email: ${usuario.email}`;

                // Agregar elementos al contenedor del usuario
                divUsuario.appendChild(nombreUsuario);
                divUsuario.appendChild(emailUsuario);

                // Agregar el usuario al cuerpo de la tabla
                bodyTablaUsuarios.appendChild(divUsuario);
            });
        } catch (error) {
            console.error(`Error al obtener los usuarios: ${error}`);
        }
    };

    // Llamar a la función para obtener y mostrar los usuarios cuando carga la página
    fetchUsuarios();
});
