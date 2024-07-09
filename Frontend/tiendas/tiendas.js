/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
    /* Obtener el body de la tabla donde se mostrarán las tiendas */
    const bodyTablaTiendas = document.querySelector(".contenido");

    // Función para obtener y mostrar las tiendas
    const fetchTiendas = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3030/tiendas/");
            const tiendas = respuesta.data;
            // Limpiar la tabla antes de agregar los nuevos datos
            bodyTablaTiendas.innerHTML = "";

            // Iterar sobre los datos y agregar cada tienda al contenido
            tiendas.forEach(tienda => {
                // Crear elementos HTML para cada tienda
                const divTienda = document.createElement("div");
                divTienda.classList.add("tienda");

                const nombreTienda = document.createElement("h2");
                nombreTienda.textContent = tienda.titulo;

                const descripcionTienda = document.createElement("p");
                descripcionTienda.textContent = tienda.contenido;

                // Agregar elementos al contenedor de la tienda
                divTienda.appendChild(nombreTienda);
                divTienda.appendChild(descripcionTienda);

                // Agregar la tienda al cuerpo de la tabla
                bodyTablaTiendas.appendChild(divTienda);
            });
        } catch (error) {
            console.error(`Error al obtener las tiendas: ${error}`);
        }
    };

    // Llamar a la función para obtener y mostrar las tiendas cuando carga la página
    fetchTiendas();
});
