const camisetas = [
    {id: 1, equipo: "Camiseta Talleres", temporada: "2025", precio: 70000},
    {id: 2, equipo: "Camiseta Belgrano", temporada: "2025", precio: 60000},
    {id: 3, equipo: "Camiseta Instituto", temporada: "2025", precio: 50000},
    {id: 4, equipo: "Camiseta Boca", temporada: "2025", precio: 90500},
    {id: 5, equipo: "Camiseta River", temporada: "2025", precio: 90000},
    {id: 6, equipo: "Camiseta Racing", temporada: "2025", precio: 80000},
    {id: 7, equipo: "Camiseta Independiente", temporada: "2025", precio: 90000},
    {id: 8, equipo: "Camiseta San Lorenzo", temporada: "2025", precio: 70800},
    {id: 9, equipo: "Camiseta Estudiantes", temporada: "2025", precio: 65000},
    {id: 10, equipo: "Camiseta Talleres", temporada: "2024", precio: 50000},
    {id: 11, equipo: "Camiseta Boca", temporada: "2024", precio: 70200},
    {id: 12, equipo: "Camiseta River", temporada: "2024", precio: 65500},
    {id: 13, equipo: "Camiseta Racing", temporada: "2024", precio: 60000},
    {id: 14, equipo: "Camiseta Independiente", temporada: "2024", precio: 65000},
    {id: 15, equipo: "Camiseta San Lorenzo", temporada: "2024", precio: 48700},
    {id: 16, equipo: "Camiseta Belgrano", temporada: "2024", precio: 30000},
    {id: 17, equipo: "Camiseta Instituto", temporada: "2024", precio: 25000},
    {id: 18, equipo: "Camiseta Boca", temporada: "2008", precio: 55800},
    {id: 19, equipo: "Camiseta River", temporada: "2018", precio: 85000},
    {id: 20, equipo: "Camiseta Boca", temporada: "2011", precio: 45000},
]

let carrito = []

function mostrarCamisetas(){
    console.log('ESTAS SON NUESTRAS CAMISETAS DISPONIBLES: \n')
    for (let i=0; i<camisetas.length; i++){
        let producto = camisetas[i];
        console.log(`Id: ${producto.id} - ${producto.equipo} - $${producto.precio}\n`); 
    }
}


function agregarAlCarrito(){
    let seleccion = parseInt(prompt('Ingrese el Id de la camiseta que desea agregar al carrito:'));
    let camisetaSeleccionada = false;
    for (let i=0; i<camisetas.length; i++){
    if (camisetas[i].id === seleccion) {
        carrito.push(camisetas[i]);
        alert(`Camiseta agregada al carrito: ${camisetas[i].equipo}`);
        camisetaSeleccionada= true;
    } else if (!camisetaSeleccionada){
            console.log('ID Invalido. Camiseta no encontrada');
        }
    }
}
function mostrarCarrito(){
    if(carrito.length === 0){
        console.log('Carrito Vacio');
        return;
    }
    let total = 0;
    for(let i = 0; i<carrito.length; i++){
        total += carrito[i].precio;
    }
    console.log('Resumen de tu compra: \n');
    for (let i = 0; i < carrito.length; i++){
        console.log(`*- ${carrito[i].equipo} - $${carrito[i].precio}`)
    }
    console.log(`Total de tu compra: $${total}`);
}

function formaDeCompra(){
    let metodoDePago = false;
    while (!metodoDePago) {
        let pago = parseInt(prompt('¿Como desea pagar? \n1. Efectivo\n2. Transferencia\n3. Tarjeta'))
        if (pago===1){
            console.log('Gracias por tu compra');
            alert('Gracias por tu compra. ¡Esperamos verte pronto!');
            break
        } else if(pago === 2){
            console.log('En unos instantes se contactaran contigo para brindarte los datos de la cuenta destino. Muchas Gracias por tu compra');
            alert('Gracias por tu compra. ¡Esperamos verte pronto!');
            break
        } else if(pago===3){
            console.log('A continuacion seras redirigido a otra pagina para realizar el pago. Muchas Gracias por tu compra');
            alert('Gracias por tu compra. ¡Esperamos verte pronto!');
            break
        } else {
            console.log('Opcion invalida');
        }
    }
}

function menuOpciones(){
    mostrarCamisetas();
    let salir = false
    while (!salir) {
        let opciones = parseInt(prompt('Menu de Opciones:\n 1. Agregar al carrito\n 2. Ver carrito\n 3. Metodos de pago\n 4. Salir'))
        if(opciones === 1){
            agregarAlCarrito();
            } else if (opciones === 2){
                mostrarCarrito();
            } else if(opciones === 3){
                formaDeCompra();
            } else if(opciones===4) {
                let confirmarSalida = confirm('¿Estás seguro que querés salir?');
                if (confirmarSalida) {
                console.log('Gracias por visitar nuestra tienda');
                salir = true;}
            } else {
                alert('Opcion invalida');
            }
        }
    }
// menuOpciones()