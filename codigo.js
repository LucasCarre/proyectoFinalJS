const camisetas = [
    {id: 1, equipo: "Camiseta Talleres", temporada: 2025, precio: 70000},
    {id: 2, equipo: "Camiseta Belgrano", temporada: 2025, precio: 60000},
    {id: 3, equipo: "Camiseta Instituto", temporada: 2025, precio: 50000},
    {id: 4, equipo: "Camiseta Boca", temporada: 2025, precio: 90500},
    {id: 5, equipo: "Camiseta River", temporada: 2025, precio: 90000},
    {id: 6, equipo: "Camiseta Racing", temporada: 2025, precio: 80000},
    {id: 7, equipo: "Camiseta Independiente", temporada: 2025, precio: 90000},
    {id: 8, equipo: "Camiseta San Lorenzo", temporada: 2025, precio: 70800},
    {id: 9, equipo: "Camiseta Estudiantes", temporada: 2025, precio: 65000},
    {id: 10, equipo: "Camiseta Talleres", temporada: 2024, precio: 50000},
    {id: 11, equipo: "Camiseta Boca", temporada: 2024, precio: 70200},
    {id: 12, equipo: "Camiseta River", temporada: 2024, precio: 65500},
    {id: 13, equipo: "Camiseta Racing", temporada: 2024, precio: 60000},
    {id: 14, equipo: "Camiseta Independiente", temporada: 2024, precio: 65000},
    {id: 15, equipo: "Camiseta San Lorenzo", temporada: 2024, precio: 48700},
    {id: 16, equipo: "Camiseta Belgrano", temporada: 2024, precio: 30000},
    {id: 17, equipo: "Camiseta Instituto", temporada: 2024, precio: 25000},
    {id: 18, equipo: "Camiseta Boca", temporada: 2008, precio: 55800},
    {id: 19, equipo: "Camiseta River", temporada: 2018, precio: 85000},
    {id: 20, equipo: "Camiseta Boca", temporada: 2011, precio: 45000},
]
    const nodoProductos = document.getElementById('productos')
    let carrito = []
    
    function mostrarCamisetas(){
        nodoProductos.innerHTML = "";
        camisetas.forEach((camiseta)=> nodoProductos.innerHTML +=
        `<div class='card'>
            <h4>${camiseta.equipo}</h4>
            <p>Precio: $${camiseta.precio}</p>
            <p>Temporada: ${camiseta.temporada}</p>
            <button class='botonCarrito'>Agregar al carrito</button>
            <button> Ver más </button>
        </div>
        `)
    

        const botones = document.querySelectorAll(".botonCarrito");
        botones.forEach((boton, i) => {
        boton.addEventListener("click", () => {
        agregarAlCarrito(camisetas[i]); 
        });
        });
    }
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        let confirmacion = confirm(`¿Desea agregar ${producto.equipo} al carrito?`);
        if (confirmacion){
            localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        } else {
            alert('El producto no fue agregado al carrito')
            carrito.pop();
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
        
}
    
    
    const nodoBotones = document.getElementsByClassName('btn')
    nodoBotones[0].addEventListener('click', ()=>{
        mostrarCamisetas();
    });
    nodoBotones[1].addEventListener('click', ()=>{
        nodoProductos.innerHTML = '';
    })

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
    }

    const botonVaciarCarrito = document.getElementById("vaciarCarrito");
    botonVaciarCarrito.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }
    const confirmacionVaciar = confirm("¿Estás seguro de que querés vaciar el carrito?");
    if (confirmacionVaciar) {
        carrito = [];
        localStorage.removeItem("carrito");
        mostrarCarrito();
        alert("Carrito vaciado con éxito.");
    }

    const botonPagar = document.getElementById('metodoDePago')
    botonPagar.addEventListener('click', () =>{
        if (carrito.length === 0) {
            alert("No hay productos para pagar en el carrito.");
            return;
            }
            const confirmacionPago = confirm("¿Desea proseguir al pago?");
            if (confirmacionPago) {
                alert("A continuacion sera redirigido para realizar el pago, MUCHAS GRACIAS POR SU ELEGIRNOS ⚽⚽");
            }
    })
}); 


const btnRegistro = document.getElementById('btnRegistro')
const btnIniciarSesion = document.getElementById('btnIniciarSesion')
const nodoBotonesDeUsuario = document.getElementById('botonesDeUsuario')
let usuariosGuardados = localStorage.getItem('usuarios')
let usuarios
    if (usuariosGuardados !== null) {
    usuarios = JSON.parse(usuariosGuardados)
    } else {
    usuarios = []
    }


//Funcion para registrar usuario
btnRegistro.addEventListener('click', () => {
    let usuario = prompt("Ingrese su nombre de usuario")
    let contraseña = prompt("Ingrese su contraseña")

    const existe = usuarios.find(u => u.usuario === usuario)
    if (existe) {
        alert("Este usuario ya está registrado.")
        return
    }

    usuarios.push({ usuario, contraseña })
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    alert("Registro exitoso")
})

//Funcion para iniciar sesion
btnIniciarSesion.addEventListener('click', () =>{
    let usuario = prompt("Ingrese su nombre de usuario");
    const buscarUsuario = usuarios.find(u => u.usuario === usuario);
    if (buscarUsuario) {
        let contraseña = prompt("Ingrese su contraseña")
            if (contraseña === buscarUsuario.contraseña) {
            alert("Bienvenid@ "+ usuario +" Sesion iniciada con exito");
                nodoBotonesDeUsuario.innerHTML = `
                <p>User: ${usuario}</p>
                `
            } else {
            alert("Contraseña incorrecta");
            }
        } else {
            alert("Usuario no encontrado, por favor registrese previamente");
            }
    })

    // Botones de orden
    const btnOrdenAlfabetico = document.getElementById('ordenAlfabetico')
    const btnOrdenPrecio = document.getElementById('ordenPrecio')
    const btnOrdenTemporada = document.getElementById('ordenTemporada')

    btnOrdenAlfabetico.addEventListener('click', ()=>{
        const camisetasOrdenadas = camisetas.sort((a,b)=> a.equipo.localeCompare(b.equipo));
        mostrarCamisetas(camisetasOrdenadas);
    })
    btnOrdenPrecio.addEventListener('click', ()=>{
        const camisetasOrdenadas = camisetas.sort((a,b)=>a.precio - b.precio);
        mostrarCamisetas(camisetasOrdenadas);
    })
    btnOrdenTemporada.addEventListener('click', ()=>{
        const camisetasOrdenadas = camisetas.sort((a,b)=>a.temporada - b.temporada);
        mostrarCamisetas(camisetasOrdenadas);
    })