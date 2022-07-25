//Pido puntos del usuario mediante prompt.
let muestraPuntos = document.getElementById("puntosIngresadosValor");
let puntosUsuario = parseInt(prompt("Ingresá cuantos puntos tenés: "));
muestraPuntos.innerText = puntosUsuario;

//Función constructora de Productos, creación de los Productos, y guardado de los mismos en todosLosProductos.
function Productos(codigoProductos, detalleProductos, costoProductos, stockProductos){
    this.codigo = codigoProductos;
    this.detalle = detalleProductos;
    this.costo = costoProductos;
    this.stock = stockProductos;
}

let mate = new Productos(000, "Mate", 900, 20);
let termo = new Productos(111, "Termo", 1500, 5);
let chopCervecero = new Productos(222, "Chop Cervecero", 1200, 10);
let kitAsado = new Productos(333, "Kit Asado", 7500, 6);
let botinero = new Productos(444, "Botinero", 2000, 30);
let mazoDeCartas = new Productos(555, "Mazo de Cartas", 1000, 0);
let camisetaArgentina = new Productos(666, "Camiseta de Argentina", 10000, 25);
let giftCard = new Productos(777, "Gift Card", 2000, 30);
let portaretratos = new Productos(888, "Portaretratos", 3000, 9);
let vasoAluminio = new Productos(999, "Vaso de Aluminio", 1500, 2);

const todosLosProductos = [mate, termo, chopCervecero, kitAsado, botinero, mazoDeCartas, camisetaArgentina, giftCard, portaretratos, vasoAluminio];

//Creo canjesRealizados para guardar los objetos que canjea el usuario.
const canjesRealizados = [];

//Función para controlar el dato ingresado
function validarPuntos() {
    if (isNaN(puntosUsuario)) {
        puntosUsuario = parseInt(prompt("Ingresá cuantos puntos tenés: "));
        validarPuntos();
    } else if (puntosUsuario <= 0) {
        puntosUsuario = parseInt(prompt("Ingresá cuantos puntos tenés: "));
        validarPuntos();
    } else {
        return;
    }
}

validarPuntos();
filtroProductos(puntosUsuario);

function consultarPuntos() {
    alert(`Con ${puntosUsuario} puntos estos son los productos disponibles, seleccioná el que querés canjear.`);       
    filtroProductos(puntosUsuario);
}

function filtroProductos(puntos) {
    //Se filtran los productos con el método filter, para que se muestren sólo los que se pueden canejar
    let productosFiltrados = todosLosProductos.filter((el) => el.costo > puntos);
    for (producto in productosFiltrados) {
        document.getElementById(`${productosFiltrados[producto].detalle}`).classList.add("-hide");
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
            muestraPuntos.innerText = puntosUsuario;
            //Agrego elemento a canjesRealizados con método Push
            canjesRealizados.push(todosLosProductos[indice]);        
            filtroProductos(puntosUsuario);
            mostrarCanjesRealizados(todosLosProductos[indice]);
            alert(`¡Canje realizado correctamente! Te quedan ${puntosUsuario} puntos.`);
        } else {
            alert("No tenés puntos suficientes para realizar el canje. ¡Seguí sumando!");
        }
    } else {
        alert("¡No hay stock del producto seleccionado!. Probá mañana o consultanos por cualquier medio.");
        return;
    }    
}
