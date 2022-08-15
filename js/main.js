//Espacio en input para que el usuario cargue sus puntos o utilice los que hay por defecto (o en localStorage).
let muestraPuntos = document.getElementById("puntosIngresadosValor");
let lista = document.getElementById("listaCanjes");

//Obtengo datos de Storage.
let puntosUsuario = JSON.parse(localStorage.getItem("puntos")) ?? parseInt(muestraPuntos.value);
let canjesRealizados = JSON.parse(localStorage.getItem("canjeados")) ?? [];
muestraPuntos.value = puntosUsuario;

//Paso al HTML los canjes ya realizados anteriormente si existen.
for (canje of canjesRealizados){
    mostrarCanjesRealizados(canje);
}

//Actualizo puntos cada vez que se modifica el Input y actualizo la página.
muestraPuntos.addEventListener(('change'), (e) => {
    puntosUsuario = parseInt(muestraPuntos.value);
    localStorage.setItem("puntos", puntosUsuario);
    location.reload();
});

//Función constructora de Productos, creación de los Productos, y guardado de los mismos en todosLosProductos.
function Productos(codigoProductos, detalleProductos, costoProductos, stockProductos, src){
    this.codigo = codigoProductos;
    this.detalle = detalleProductos;
    this.costo = costoProductos;
    this.stock = stockProductos;
    this.src = src;
}

let mate = new Productos(000, "Mate", 900, 20, "./img/mate.jpg");
let termo = new Productos(111, "Termo", 1500, 5, "./img/termo.jpg");
let chopCervecero = new Productos(222, "Chop Cervecero", 1200, 10, "./img/chop.jpg");
let kitAsado = new Productos(333, "Kit Asado", 7500, 6, "./img/kit-asado.jpg");
let botinero = new Productos(444, "Botinero", 2000, 30, "./img/botinero.jpg");
let mazoDeCartas = new Productos(555, "Mazo de Cartas", 1000, 0, "./img/cartas.jpg");
let camisetaArgentina = new Productos(666, "Camiseta de Argentina", 10000, 25, "./img/camiseta.jpg");
let giftCard = new Productos(777, "Gift Card", 2500, 30, "./img/giftcard.png");
let portaretratos = new Productos(888, "Portaretratos", 3000, 9, "./img/portaretratos.jpg");
let vasoAluminio = new Productos(999, "Vaso de Aluminio", 2200, 2, "./img/vaso.jpg");

const todosLosProductos = [mate, termo, chopCervecero, kitAsado, botinero, mazoDeCartas, camisetaArgentina, giftCard, portaretratos, vasoAluminio];

//Creación de cards con Javascript
let contenedor = document.querySelector('.tarjetas-productos');
let cards = "";

todosLosProductos.forEach((producto, index) => {
    const idHTML = producto.codigo;
    cards += `<div class="producto" id="${idHTML}"><img alt="${producto.detalle}" src="${producto.src}"><h3>${producto.detalle}</h3><p>${producto.costo} Puntos</p><button onclick=realizarCanje(${index})>Canjear</button></div>`
});

//Agrego el contenido de cards al div .tarjetas-productos
contenedor.innerHTML += cards;

filtroProductos(puntosUsuario);

function mensajeSweetAlert(titular, texto, icono, textoBoton){
    Swal.fire({
        title: titular,
        text: texto,
        icon: icono,
        confirmButtonText: textoBoton
      });
}

function consultarPuntos() {       
    filtroProductos(puntosUsuario);
    //lert(`Con ${puntosUsuario} puntos estos son los productos disponibles, seleccioná el que querés canjear.`);
    mensajeSweetAlert(`¡Tenés ${puntosUsuario} puntos!`, 'Estos son los productos que podés Canjear', '', 'Continuar');
}

function filtroProductos(puntos) {
    //Se filtran los productos con el método filter, para que se muestren sólo los que se pueden canejar
    let productosFiltrados = todosLosProductos.filter((el) => el.costo > puntos);
    for (producto in productosFiltrados) {
        document.getElementById(`${productosFiltrados[producto].codigo}`).classList.add("-hide");
    }
    //En caso de que se filtren todos los productos, cambio H2 de .productos-disponibles
    if(productosFiltrados.length == todosLosProductos.length){
        let container = document.querySelector(".productos-disponibles h2");
        container.innerText = "¡No te alcanza para canjear ningún producto!  =(";
    }
}

//Función para mostrar los canjes realizados por el usuario con el respectivo costo.
function mostrarCanjesRealizados(canje) {
    let item = document.createElement("li");
    item.innerHTML += `<p>Canjeaste ${canje.detalle} por ${canje.costo} puntos.</p>`;
    lista.appendChild(item);    
}

function realizarCanje(indice) {
    //Se compureba que haya stock del producto que se desea canjear. Si hay, se disminuye 1 y se restan los puntos.
    if (todosLosProductos[indice].stock >= 1) {
        if (puntosUsuario >= todosLosProductos[indice].costo) {
            puntosUsuario -= todosLosProductos[indice].costo;
            todosLosProductos[indice].stock -= 1;
            muestraPuntos.value = puntosUsuario;
            //Agrego elemento a canjesRealizados con método Push
            canjesRealizados.push(todosLosProductos[indice]);        
            filtroProductos(puntosUsuario);
            mostrarCanjesRealizados(todosLosProductos[indice]);
            const mensajeConfirmacion = setTimeout(() => {
                mensajeSweetAlert(`¡Canje realizado correctamente!`, `Te quedan ${puntosUsuario} puntos.`, 'success', 'Seguir Canjeando');
            },300);
            //Guardo puntosUsuario y canjesRealizados actualizado en localStorage.
            localStorage.setItem("puntos", puntosUsuario);
            localStorage.setItem("canjeados", JSON.stringify(canjesRealizados));
            //Alerta para recordar actualizar el gráfico con los nuevos canjes usando Toast
            Toastify({
                text: "Hacé click en Gráfico para actualizarlo",                
                duration: 3000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
                }).showToast();
        } else {
            mensajeSweetAlert(`¡Malas noticias!`, `No tenés puntos suficientes para realizar el canje. ¡Seguí sumando!`, '', 'Volver');
        }
    } else {        
        mensajeSweetAlert(`¡Ups!`, `No hay stock del producto seleccionado, probá mañana o consultanos por cualquier medio.`, 'question', 'Volver');
        return;
    }
}

//Agrego evento para que al hacer click en Mis Canjes se muestre/oculte el listado
//Aplico operador ternario. Además agrego evento para ocultar/mostrar Productos.
let tituloProductos = document.querySelector(".titulo-productos");
let tarjetasProductos = document.querySelector(".tarjetas-productos");

tituloProductos.addEventListener("click", (e) => switchCanjes(tarjetasProductos));

function switchCanjes(elemento){
    elemento.classList.toggle("-hide");
}

//Funcion para reiniciar el historial
function reiniciarHistorial(){
    puntosUsuario = 20000;
    canjesRealizados = [];
    localStorage.setItem("puntos", puntosUsuario);
    localStorage.setItem("canjeados", JSON.stringify(canjesRealizados));
    location.reload();
}

//Escucho evento de click en el boton de reinicio y borro historial
let botonReinicio = document.querySelector('.btn-reinicio');
botonReinicio.addEventListener("click", (e) => reiniciarHistorial());

//Datos para mostrar en la consola utilizando spread y desestructuración.
console.log("\nDatos para uso interno.\n\n")
//Productos ordenados de menor a mayor costo utilizando spread del array.
let productosOrdenados = [...todosLosProductos];
productosOrdenados.sort((a, b) => a.costo - b.costo);
console.log(productosOrdenados);

//Monto necesario para canjear todos los puntos
let sumaCostosProductos = productosOrdenados.reduce((inicial, actual) => inicial + actual.costo, 0);
console.log("\nSe necesitan " + sumaCostosProductos + " para canjear una unidad de todos los productos.\n\n");

//Stock de productos con desectructuración
const stockDeProductos = ( {codigo, stock} ) => {
    console.log("El producto código " + codigo,"tiene un stock de " + stock + " unidades.");
}
console.log("--------------------LISTADO DE STOCK--------------------");
for (producto of productosOrdenados){
    stockDeProductos(producto);
}

//Librería Chart.JS
let leyenda = [];
let series = [];

//Creo Etiquetas Dinámicas
for(let i = 0; i < canjesRealizados.length; i++){
    leyenda.push(`${canjesRealizados[i].detalle}`);
    series.push(`${canjesRealizados[i].costo}`);
}

const labels = [...leyenda];

const data = {
labels: labels,
    datasets: [{
        label: 'GRÁFICO DE PRODUCTOS CANJEADOS',
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(126, 99, 255)', 'rgb(126, 255, 120)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(126, 99, 255)', 'rgb(126, 255, 120)'],
        data: [...series],
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

//Renderizo Gráfico
const myChart = new Chart(document.getElementById('myChart'), config);

let botonGrafico = document.querySelector('.btn-grafico');
botonGrafico.addEventListener("click", (e) => location.reload());