/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
    const bodyTablaTiendas = document.querySelector(".contenido");

    // Función para obtener y mostrar los productos en el carrito (tabla "tienda")
    const fetchCarrito = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3030/carrito/");
            const productosCarrito = respuesta.data;

            // Limpiar la tabla antes de agregar los nuevos datos
            bodyTablaTiendas.innerHTML = "";

            productosCarrito.forEach(producto => {
                // Crear elementos HTML para cada producto en el carrito
                const divProducto = document.createElement("div");
                divProducto.classList.add("producto");

                const tituloProducto = document.createElement("h2");
                tituloProducto.textContent = producto.titulo;

                const contenidoProducto = document.createElement("p");
                contenidoProducto.textContent = producto.contenido;

                const precioProducto = document.createElement("p");
                precioProducto.textContent = `Precio: $${producto.precio}`;

                // Botón para eliminar producto del carrito
                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar del Carrito";
                btnEliminar.addEventListener("click", () => {
                    eliminarDelCarrito(producto.id); // Función definida más adelante
                });

                // Agregar elementos al contenedor del producto
                divProducto.appendChild(tituloProducto);
                divProducto.appendChild(contenidoProducto);
                divProducto.appendChild(precioProducto);
                divProducto.appendChild(btnEliminar);

                // Agregar el producto al cuerpo de la tabla
                bodyTablaTiendas.appendChild(divProducto);
            });
        } catch (error) {
            console.error(`Error al obtener el carrito: ${error}`);
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = async (id) => {
        try {
            await axios.delete(`http://localhost:3030/carrito/${id}`);
            console.log("Producto eliminado del carrito.");
            alert("Producto eliminado del carrito correctamente.");
            fetchCarrito(); // Actualizar la vista del carrito después de eliminar
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            alert("Error al eliminar producto del carrito. Por favor, inténtalo de nuevo.");
        }
    };

    // Llamar a la función para obtener y mostrar el carrito cuando carga la página
    fetchCarrito();
});
