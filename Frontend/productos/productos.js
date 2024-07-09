/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
    /* Obtener el body de la tabla donde se mostrarán los productos */
    const bodyTablaProductos = document.querySelector(".contenido");

    // Función para obtener y mostrar los productos
    const fetchProductos = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3030/productos/");
            console.log("Respuesta de la API:", respuesta.data); // Agregar console.log aquí

            const productos = respuesta.data;
            // Limpiar la tabla antes de agregar los nuevos datos
            bodyTablaProductos.innerHTML = "";

            // Iterar sobre los datos y agregar cada producto a la tabla
            productos.forEach(producto => {
                // Crear elementos HTML para cada producto
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto");

                const tituloProducto = document.createElement("h2");
                tituloProducto.textContent = producto.titulo;

                const contenidoProducto = document.createElement("p");
                contenidoProducto.textContent = producto.contenido;

                const precioProducto = document.createElement("p");
                precioProducto.textContent = `Precio: $${producto.precio}`;

                // Agregar elementos al contenedor del producto
                divProducto.appendChild(tituloProducto);
                divProducto.appendChild(contenidoProducto);
                divProducto.appendChild(precioProducto);

                // Agregar el producto al cuerpo de la tabla
                bodyTablaProductos.appendChild(divProducto);
            });
        } catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
        }
    };

    // Llamar a la función para obtener y mostrar los productos cuando carga la página
    fetchProductos();
});
