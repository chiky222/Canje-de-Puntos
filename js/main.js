//Pido puntos del usuario mediante prompt, pero la idea es más adelante que el usuario lo introduzca en el input de html y con ese mismo dato ingresado realizar la consulta.
let puntosUsuario = parseInt(prompt("Ingresá cuantos puntos tenés: "));

//Se usan 4 variables a modo de simulacro que oportunamente será reemplazado por el real, cuando aprendamos a agregar productos externamente.
let codigoProductosSimulacro = [000, 111, 222, 333, 444, 555, 666, 777, 888, 999];
let detalleProductosSimulacro = ["mate", "termo", "chop cervecero", "kit asado", "botinero", "mazo de cartas", "camiseta argentina", "gift card", "portaretratos", "vaso aluminio"];
let costoProductosSimulacro = [900, 1500, 1200, 7500, 2000, 1000, 10000, 2000, 3000, 1500];
let stockProductosSimulacro = [20, 5, 10, 6, 30, 0, 25, 30, 9, 2];

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

function consultarPuntos() {
    alert(`Con ${puntosUsuario} puntos estos son los productos disponibles, seleccioná el que querés canjear.`);       
    filtroProductos(puntosUsuario);
}

function filtroProductos(puntos) {
    for (let i = 0; i < 10; i++) {        
        if (puntos >= costoProductosSimulacro[i]) {
            //Se realizará un filtro para mostrar o no los productos, dependiendo si le alcanza con los puntos que tiene el usuario.
            console.log(`Se va a mostrar en la página ${detalleProductosSimulacro[i]}.`)
        } else {
            console.log(`Se filtra y no se va a mostrar en la página ${detalleProductosSimulacro[i]}.`)
        }
    }
}

function realizarCanje(indice) {
    //Se compureba que haya stock del producto que se desea canjear. Si hay, se disminuye 1 y se restan los puntos.
    if (stockProductosSimulacro[indice] >= 1) {
        if (puntosUsuario >= costoProductosSimulacro[indice]) {
            puntosUsuario -= costoProductosSimulacro[indice];
            stockProductosSimulacro[indice] -= 1;
            alert(`¡Canje realizado correctamente! Te quedan ${puntosUsuario} puntos.`);
            filtroProductos(puntosUsuario);
        } else {
            alert("No tenés puntos suficientes para realizar el canje. ¡Seguí sumando!");
        }
    } else {
        alert("¡No hay stock del producto seleccionado!. Probá mañana o consultanos por cualquier medio.");
        return;
    }    
}