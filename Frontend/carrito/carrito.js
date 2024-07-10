// carrito.js

document.addEventListener("DOMContentLoaded", () => {
    const bodyTablaTiendas = document.querySelector(".contenido");
    const totalPrecio = document.getElementById("total-precio");
    const btnVaciarCarrito = document.getElementById("vaciar-carrito");;
    const terminarCompraBtn = document.getElementById("terminar-compra");
    const mensajeCompra = document.getElementById("mensaje-compra");


    // Función para obtener y mostrar los productos en el carrito
    const fetchCarrito = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3030/carrito/");
            const productosCarrito = respuesta.data;

            // Limpiar la tabla antes de agregar los nuevos datos
            bodyTablaTiendas.innerHTML = "";

            let total = 0;

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

                // Sumar al total
                total += parseFloat(producto.precio);

                // Agregar elementos al contenedor del producto
                divProducto.appendChild(tituloProducto);
                divProducto.appendChild(contenidoProducto);
                divProducto.appendChild(precioProducto);
                divProducto.appendChild(btnEliminar);

                // Agregar el producto al cuerpo de la tabla
                bodyTablaTiendas.appendChild(divProducto);
            });

            // Mostrar el total en el carrito
            totalPrecio.textContent = total.toFixed(2);
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

    // Función para vaciar todo el carrito
    const vaciarTodoElCarrito = async () => {
        try {
            await axios.delete("http://localhost:3030/carrito/");
            console.log("Carrito vaciado correctamente.");
            alert("Carrito vaciado correctamente.");
            fetchCarrito(); // Actualizar la vista del carrito después de vaciar
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            alert("Error al vaciar el carrito. Por favor, inténtalo de nuevo.");
        }
    };
    // Función para terminar la compra
    const terminarCompra = async () => {
        try {
            // Aquí puedes añadir la lógica para procesar la compra,
            // como enviar la orden a un sistema de pagos o generar un recibo.
            await axios.delete("http://localhost:3030/carrito/");
            mensajeCompra.textContent = "Compra realizada con éxito.";
            mensajeCompra.style.color = "green";
            console.log("Compra terminada.");
            fetchCarrito(); // Actualizar la vista del carrito después de terminar la compra
        } catch (error) {
            console.error("Error al terminar la compra:", error);
            mensajeCompra.textContent = "Error al realizar la compra. Por favor, inténtalo de nuevo.";
            mensajeCompra.style.color = "red";
        }
    };

    // Event listener para el botón de vaciar carrito
    btnVaciarCarrito.addEventListener("click", vaciarTodoElCarrito);
    terminarCompraBtn.addEventListener("click", terminarCompra);

    // Llamar a la función para obtener y mostrar el carrito cuando carga la página
    fetchCarrito();
});
