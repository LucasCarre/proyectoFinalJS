    const url = 'https://685dccea7b57aebd2af727cb.mockapi.io/listaCamisetas/v1/camisetas'
    const nodoProductos = document.getElementById('productos')
    let camisetas = []
    let carrito = []


    //Funcion para mostrar los productos
    function mostrarProductos(lista){
        nodoProductos.innerHTML = '';
        lista.forEach((producto, i)=>{
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
    }
    // Funcion para agregar al carrito productos
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        Toastify({
            text: `Producto ${producto.equipo}, agregado al carrito`,
            duration: 2000,
            gravity: "top",
            position: "right",
            backgroundColor: "#5C5B5A",
        }).showToast();
    }
    
    
// Botones de orden
    const btnOrdenAlfabetico = document.getElementById('ordenAlfabetico')
    const btnOrdenPrecio = document.getElementById('ordenPrecio')
    const btnOrdenTemporada = document.getElementById('ordenTemporada')

    btnOrdenAlfabetico.addEventListener('click', ()=>{
        const camisetasOrdenadasAlfabeticamente = camisetas.slice().sort((a,b)=> a.equipo.localeCompare(b.equipo));
        mostrarProductos(camisetasOrdenadasAlfabeticamente);
    })
    btnOrdenPrecio.addEventListener('click', ()=>{
        const camisetasOrdenadasPorPrecio = camisetas.slice().sort((a,b)=>a.precio - b.precio);
        mostrarProductos(camisetasOrdenadasPorPrecio);
    })
    btnOrdenTemporada.addEventListener('click', ()=>{
        const camisetasOrdenadasPorTemporada = camisetas.slice().sort((a,b)=>a.temporada - b.temporada);
        mostrarProductos(camisetasOrdenadasPorTemporada);
    })

    // Funcion para mostrar el carrito
    const nodoCarrito = document.getElementById('carrito')
    function mostrarCarrito(){
        nodoCarrito.innerHTML = '';
        if (carrito.length === 0){
            nodoCarrito.innerHTML = '<p> Carrito Vacio </p>';
            return;
        }
        carrito.forEach((producto, i) =>{
            nodoCarrito.innerHTML += `
            <div class='itemCarrito'>
                <p>${producto.equipo} - $${producto.precio}</p>
                <button class="eliminarProducto">Eliminar</button>
            </div>
            `;
        })
        let total = 0
        for (let i = 0; i<carrito.length;i++){
            total += carrito[i].precio
        }
        nodoCarrito.innerHTML += `
        <p>Total= $${total}</p>
        <button id="vaciarCarrito">Vaciar carrito</button>
        <button id="metodoDePago">Pagar</button>
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
                gravity: "bottom",
                position: "right",
                backgroundColor: "red",
                }).showToast();
                }
            });
        });
    //Boton para vaciar el carrito
    const botonVaciarCarrito = document.getElementById("vaciarCarrito");
        botonVaciarCarrito.addEventListener("click", () => {
            carrito = [];
            localStorage.removeItem("carrito");
            mostrarCarrito();
            Toastify({
                text: "Carrito vaciado con éxito.",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                backgroundColor: "red",
            }).showToast();
        });
    //Boton para proceso de pago
    const botonFormularioDePago = document.getElementById('metodoDePago');
    botonFormularioDePago.addEventListener('click', () =>{
        Swal.fire({
            title: 'Datos de Facturacion',
            html:`
            <input type="text" id="nombre" class="swal2-input" placeholder="Nombre completo">
            <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
            <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de envío">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Continuar al pago",
            cancelButtonText: "Cancelar",
            preConfirm: () =>{
                const nombre = document.getElementById("nombre").value;
                const email = document.getElementById("email").value;
                const direccion = document.getElementById("direccion").value;

                if (!nombre || !email || !direccion) {
                    Swal.showValidationMessage("Por favor, completá todos los campos.");
                    return false;
                }

                return { nombre, email, direccion };
                }
                })
            .then((result) => {
            if (result.isConfirmed) {
            const datosClientes = result.value;
            const pedidoCompleto = {
                cliente: datosClientes,
                productos: carrito,
            };
            // 2. Guardar datos del cliente
            localStorage.setItem("pedido", JSON.stringify(pedidoCompleto));
            // 1. Vaciar carrito
            nodoCarrito.innerHTML = '';
            // 3. Redirigir a una página ficticia de pago
            Swal.fire({
                icon: 'success',
                title: '¡Datos enviados!',
                text: 'Redirigiendo al sitio de pago...',
                showConfirmButton: false,
                timer: 2000
            })
            }
        })
    })
}

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => {
        camisetas = data;
        mostrarProductos(camisetas);
    })