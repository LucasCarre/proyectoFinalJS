    const url = 'https://685dccea7b57aebd2af727cb.mockapi.io/listaCamisetas/v1/camisetas'
    const nodoProductos = document.getElementById('productos')
    let camisetas = []
    let carrito = []

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        camisetas = data;
        nodoProductos.innerHTML='';
        data.forEach(producto=>{
            nodoProductos.innerHTML += `
            <div class='cardPersonalizada'>
            <h4 class='titulosCards'>${producto.equipo}</h4>
            <p>Precio: $${producto.precio}</p>
            <p>Temporada: ${producto.temporada}</p>
            <img class="img-camiseta" src="${producto.img}" alt="${producto.equipo}">
            <button class='botonCarrito'>Agregar al carrito</button>
            <button> Ver más </button>
            </div>
            `
        })
        const botones = document.querySelectorAll(".botonCarrito");
        botones.forEach((boton, i) => {
        boton.addEventListener("click", () => {
        agregarAlCarrito(camisetas[i]); 
        });
        });
    })

    // Funcion para agregar al carrito productos
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        Toastify({
            text: `Producto ${producto.equipo}, agregado al carrito`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#5C5B5A",
        }).showToast();
    }
    

    // Funcion para mostrar el carrito
    const nodoCarrito = document.getElementById("carrito");
    function mostrarCarrito(){
        nodoCarrito.innerHTML = "";
        if (carrito.length === 0) {
        nodoCarrito.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }
    carrito.forEach((producto, i) => {
        nodoCarrito.innerHTML += `
            <div class='itemCarrito'>
                <p>${producto.equipo} - $${producto.precio}</p>
                <button class="eliminarProducto">Eliminar</button>
            </div>
        `;
    });
    let total = 0
    for (let i = 0; i<carrito.length;i++){
        total += carrito[i].precio
    }
    nodoCarrito.innerHTML += `
    <p>Total= $${total}</p>
    `
        // Boton para eliminar productos individualmente
        const botonEliminarProducto = document.querySelectorAll(".eliminarProducto");
        botonEliminarProducto.forEach((boton, i) => {
        boton.addEventListener('click', () => {
        if (carrito.length > 0) {
            const productoEliminado = carrito[i];      
            carrito.splice(i, 1);                      
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
                Toastify({
                text: `${productoEliminado.equipo} eliminado del carrito`,
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ff5c5c",
                }).showToast();
                }
            });
        });
    }

    
    
    //Boton para vaciar el carrito
    const botonVaciarCarrito = document.getElementById("vaciarCarrito");
        botonVaciarCarrito.addEventListener("click", () => {
        if (carrito.length === 0) {
                Toastify({
                text: "El carrito ya está vacío.",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#ff5c5c",
                }).showToast();
                return;
            }

            carrito = [];
            localStorage.removeItem("carrito");
            mostrarCarrito();

            Toastify({
                text: "Carrito vaciado con éxito.",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                backgroundColor: "#ff5c5c",
            }).showToast();
        });