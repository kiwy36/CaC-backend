/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {
    /* Obtener el body de la tabla donde se mostrarán los productos */
    const bodyTablaProductos = document.querySelector(".contenido");

    /* Formularios y elementos de formulario */
    const formCrearProducto = document.getElementById("form-crear-producto");
    const formEditarProducto = document.getElementById("form-editar-producto");
    const editarId = document.getElementById("editar-id");
    const editarTitulo = document.getElementById("editar-titulo");
    const editarContenido = document.getElementById("editar-contenido");
    const editarPrecio = document.getElementById("editar-precio");
    const cancelarEdicion = document.getElementById("cancelar-edicion");

    // Función para obtener y mostrar los productos
    const fetchProductos = async () => {
        try {
            const respuesta = await axios.get("http://localhost:3030/productos/");

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

                // Botones de acción
                const botonEditar = document.createElement("button");
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("editar");
                botonEditar.addEventListener("click", () => editarProducto(producto));

                const botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add("eliminar");
                botonEliminar.addEventListener("click", () => borrarProducto(producto.id));
                const btnAgregarCarrito = document.createElement("button");
                btnAgregarCarrito.textContent = "Agregar al Carrito";
                btnAgregarCarrito.addEventListener("click", () => {
                    agregarAlCarrito(producto.id); // Función para agregar al carrito
                });

                // Agregar botones al divProducto
                divProducto.appendChild(tituloProducto);
                divProducto.appendChild(contenidoProducto);
                divProducto.appendChild(precioProducto);
                divProducto.appendChild(botonEditar);
                divProducto.appendChild(botonEliminar);
                divProducto.appendChild(btnAgregarCarrito);

                // Agregar el producto al cuerpo de la tabla
                bodyTablaProductos.appendChild(divProducto);
            });
        } catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
        }
    };

    // Función para eliminar un producto
    const borrarProducto = async (id) => {
        try {
            await axios.delete(`http://localhost:3030/productos/${id}`);
            fetchProductos(); // Recargar la lista de productos después de eliminar
        } catch (error) {
            console.error(`Error al eliminar el producto: ${error}`);
        }
    };

    // Función para crear un nuevo producto
    formCrearProducto.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const nuevoProducto = {
            titulo: document.querySelector("#nuevo-titulo").value,
            contenido: document.querySelector("#nuevo-contenido").value,
            precio: document.querySelector("#nuevo-precio").value
        };
        try {
            await axios.post("http://localhost:3030/productos/", nuevoProducto);
            formCrearProducto.reset();
            fetchProductos(); // Recargar la lista de productos después de crear
        } catch (error) {
            console.error(`Error al crear el producto: ${error}`);
        }
    });

    // Función para mostrar el formulario de edición con los datos del producto a editar
    const editarProducto = (producto) => {
        formCrearProducto.style.display = "none";
        formEditarProducto.style.display = "block";
        editarId.value = producto.id;
        editarTitulo.value = producto.titulo;
        editarContenido.value = producto.contenido;
        editarPrecio.value = producto.precio;
    };

    // Función para cancelar la edición
    cancelarEdicion.addEventListener("click", () => {
        formCrearProducto.style.display = "block";
        formEditarProducto.style.display = "none";
        formEditarProducto.reset();
    });

    // Función para actualizar un producto
    formEditarProducto.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const id = editarId.value;
        const productoActualizado = {
            titulo: editarTitulo.value,
            contenido: editarContenido.value,
            precio: editarPrecio.value
        };
        try {
            await axios.put(`http://localhost:3030/productos/${id}`, productoActualizado);
            formEditarProducto.style.display = "none";
            formCrearProducto.style.display = "block";
            formEditarProducto.reset();
            fetchProductos(); // Recargar la lista de productos después de actualizar
        } catch (error) {
            console.error(`Error al actualizar el producto: ${error}`);
        }
    });
    const agregarAlCarrito = async (idProducto) => {
        try {
            const respuesta = await axios.post("http://localhost:3030/carrito/", {
                id: idProducto
            });
            console.log("Producto agregado al carrito:", respuesta.data);
            alert("Producto agregado al carrito correctamente.");
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            alert("Error al agregar producto al carrito. Por favor, inténtalo de nuevo.");
        }
    };

    // Llamar a la función para obtener y mostrar los productos cuando carga la página
    fetchProductos();
});
