//Espacio en input para que el usuario cargue sus puntos o utilice los que hay por defecto (o en localStorage).
let muestraPuntos = document.getElementById("puntosIngresadosValor");
//Obtengo datos de Storage.
let puntosUsuario = JSON.parse(localStorage.getItem("puntos")) ?? parseInt(muestraPuntos.value);
muestraPuntos.value = puntosUsuario;
let actualizarPuntos = muestraPuntos.addEventListener(('change'), (e) => {
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
let giftCard = new Productos(777, "Gift Card", 2000, 30, "./img/giftcard.png");
let portaretratos = new Productos(888, "Portaretratos", 3000, 9, "./img/portaretratos.jpg");
let vasoAluminio = new Productos(999, "Vaso de Aluminio", 1500, 2, "./img/vaso.jpg");

const todosLosProductos = [mate, termo, chopCervecero, kitAsado, botinero, mazoDeCartas, camisetaArgentina, giftCard, portaretratos, vasoAluminio];

//Creación de cards con Javascript
let contenedor = document.querySelector('.tarjetas-productos');
let cards = "";

todosLosProductos.forEach((producto) => {
    const idHTML = producto.codigo;
    index = todosLosProductos.indexOf(producto);
    cards += `<div class="producto" id="${idHTML}"><img alt="${producto.detalle}" src="${producto.src}"><h3>Mate 3D</h3><p>${producto.costo} Puntos</p><button onclick=realizarCanje(${index})>Canjear</button></div>`
});

//Agrego el contenido de cards al div .tarjetas-productos
contenedor.innerHTML += cards;

//Creo canjesRealizados para guardar los objetos que canjea el usuario.
const canjesRealizados = [];

filtroProductos(puntosUsuario);

function consultarPuntos() {       
    filtroProductos(puntosUsuario);
    alert(`Con ${puntosUsuario} puntos estos son los productos disponibles, seleccioná el que querés canjear.`);
}

function filtroProductos(puntos) {
    //Se filtran los productos con el método filter, para que se muestren sólo los que se pueden canejar
    let productosFiltrados = todosLosProductos.filter((el) => el.costo > puntos);
    for (producto in productosFiltrados) {
        document.getElementById(`${productosFiltrados[producto].codigo}`).classList.add("-hide");
    }
    //En caso de que se filtren todos los productos, cambio H2 de .productos-disponibles
    if(productosFiltrados.length == 10){
        let container = document.querySelector(".productos-disponibles h2");
        container.innerText = "¡No te alcanza para canjear ningún producto!  =(";
    }
}

//Función para mostrar en consola los canjes realizados por el usuario con el respectivo costo.
function mostrarCanjesRealizados(canje) {
    let lista = document.getElementById("listaCanjes");
    let item = document.createElement("li");
    item.innerHTML = `<p>Canjeaste ${canje.detalle} por ${canje.costo} puntos.</p>`;
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
            alert(`¡Canje realizado correctamente! Te quedan ${puntosUsuario} puntos.`);
            localStorage.setItem("puntos", puntosUsuario);
        } else {
            alert("No tenés puntos suficientes para realizar el canje. ¡Seguí sumando!");
        }
    } else {
        alert("¡No hay stock del producto seleccionado!. Probá mañana o consultanos por cualquier medio.");
        return;
    }    
}
