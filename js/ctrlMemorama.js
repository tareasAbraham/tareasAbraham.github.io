document.addEventListener('DOMContentLoaded', () => {
    // Se crea un arreglo de las imagenes que estaran en el memorama, y se duplican por que cada carta debe tener su par
    const cardArray = [{
            nombre: 'jabon',
            imagen: 'imagenes/jabon.png'
        },
        {
            nombre: 'cubrebocas',
            imagen: 'imagenes/cubrebocas.png'
        },
        {
            nombre: 'sanaDistancia',
            imagen: 'imagenes/sanaDistancia.png'
        },
        {
            nombre: 'pizza',
            imagen: 'imagenes/pizza.png'
        },
        {
            nombre: 'estornudo',
            imagen: 'imagenes/estornudo.png'
        },
        {
            nombre: 'careta',
            imagen: 'imagenes/careta.png'
        },
        {
            nombre: 'jabon',
            imagen: 'imagenes/jabon.png'
        },
        {
            nombre: 'cubrebocas',
            imagen: 'imagenes/cubrebocas.png'
        },
        {
            nombre: 'sanaDistancia',
            imagen: 'imagenes/sanaDistancia.png'
        },
        {
            nombre: 'pizza',
            imagen: 'imagenes/pizza.png'
        },
        {
            nombre: 'estornudo',
            imagen: 'imagenes/estornudo.png'
        },
        {
            nombre: 'careta',
            imagen: 'imagenes/careta.png'
        }
    ]

    // Creamos las variables globales que ocuparemos
    cardArray.sort(() => 0.5 - Math.random())
    const grid = document.querySelector('.grid')
    const resultadoPuntuacionFinal = document.querySelector('#puntuacionFinal')
    const resultadoNumeroAciertos = document.querySelector('#numeroAciertos')
    const resultadoNnumeroFallos = document.querySelector('#numeroFallos')
    var cartaEscogida = []
    var cartaEscogidaId = []
    const cartasAceptadas = []
    var numeroAciertos = 1;
    var numeroFallos = 1;
    var puntuacion = 0;

    //Se crea el tablero de juego
    function crearTablero() {
        for (let i = 0; i < cardArray.length; i++) {
            //Colocamos las imagenes que simularan ser la carta volteada
            var carta = document.createElement('img')
            carta.setAttribute('class', 'imagenMemorama')
            carta.setAttribute('src', 'imagenes/cartaVolteada.png')
            carta.setAttribute('data-id', i)
            carta.addEventListener('click', voltearCarta)
            grid.appendChild(carta)
        }
    }

    // Verificar las cartas seleccionadas
    function verificarCoincidenciasCartas() {
        //Buscamos todas las imagenes unicamente dentro del tablero
        var cartas = document.querySelectorAll('img.imagenMemorama')
        const opcionEscogidaUnoId = cartaEscogidaId[0]
        const opcionEscogidaDosId = cartaEscogidaId[1]
        if (opcionEscogidaUnoId == opcionEscogidaDosId) {
            //Se coloca las castas seleccionadas pero volteadas
            cartas[opcionEscogidaUnoId].setAttribute('src', 'imagenes/cartaVolteada.png')
            cartas[opcionEscogidaDosId].setAttribute('src', 'imagenes/cartaVolteada.png')
                //Se aumenta en uno el numero de fallos y se coloca en su respectivo span
            resultadoNnumeroFallos.textContent = numeroFallos++;
            puntuacion = puntuacion - 100;
            resultadoPuntuacionFinal.textContent = puntuacion;
        } else if (cartaEscogida[0] === cartaEscogida[1]) {
            // Se coloca una imagen transparente
            cartas[opcionEscogidaUnoId].setAttribute('src', 'imagenes/white.png')
            cartas[opcionEscogidaDosId].setAttribute('src', 'imagenes/white.png')
            cartas[opcionEscogidaUnoId].removeEventListener('click', voltearCarta)
            cartas[opcionEscogidaDosId].removeEventListener('click', voltearCarta)
                //Se aumenta en uno el numero de aciertos y se coloca en su respectivo span
            resultadoNumeroAciertos.textContent = numeroAciertos++;
            puntuacion = puntuacion + 300;
            resultadoPuntuacionFinal.textContent = puntuacion;
            cartasAceptadas.push(cartaEscogida)
        } else {
            //Se coloca las castas seleccionadas pero volteadas
            cartas[opcionEscogidaUnoId].setAttribute('src', 'imagenes/cartaVolteada.png')
            cartas[opcionEscogidaDosId].setAttribute('src', 'imagenes/cartaVolteada.png')
                //Se aumenta en uno el numero de fallos y se coloca en su respectivo span
            resultadoNnumeroFallos.textContent = numeroFallos++;
            puntuacion = puntuacion - 200;
            resultadoPuntuacionFinal.textContent = puntuacion;
        }
        //Cada vez que se volteen las cartas, se deben de reiniciar estos arreglos, por que deja de tener cartas escogidas despues de ver las 2 cartas
        cartaEscogida = []
        cartaEscogidaId = []
            // Si el numero de cartas totales dividido entre 2 es igual al numero de cartas sin pares, ya no hay cartas por voltear
            // Por lo tanto el jeugo ha terminado
        if (cartasAceptadas.length === cardArray.length / 2) {
            //Asignamos la puntuacion
            resultadoPuntuacionFinal.textContent = puntuacion;
            // Eliminamos el tablero
            var element = document.getElementById("grid");
            element.parentNode.removeChild(element);
            // Creamos un salto de linea y un titulo en el lugar del tablero donde indique que ha ganado
            element = document.getElementById("resultado");
            var saltoLinea = document.createElement("br");
            var para = document.createElement("h1");
            var node = document.createTextNode("Has ganado!");
            para.appendChild(node);
            element.appendChild(saltoLinea)
            element.appendChild(para)
                // Se invoca el metodo para guardar la puntuacion en la bd
            guardarPuntuacion(puntuacion, numeroFallos - 1, numeroAciertos - 1)
        }
    }

    //Metodo al voltear una tarjeta
    function voltearCarta() {
        var cartaId = this.getAttribute('data-id')
        cartaEscogida.push(cardArray[cartaId].nombre)
        cartaEscogidaId.push(cartaId)
        this.setAttribute('src', cardArray[cartaId].imagen)
        if (cartaEscogida.length === 2) {
            setTimeout(verificarCoincidenciasCartas, 400)
        }
    }
    crearTablero()
})

// Recargamos la pagina para que el juego pueda volver a comenzar
function reiniciarJuego() {
    location.reload();
}
// Redirigimos a la pagina de las puntuaciones
function verPuntajes() {
    window.location.replace("puntajes.html");
}
// Redirigimos a la pagina de las puntuaciones
function verInstrucciones() {
    window.location.replace("instrucciones.html");
}

function guardarPuntuacion(puntuacion, numeroFallos, numeroAciertos) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;
            // Se obtiene el id de un nuevo registro, pero sin agregar el registro aun
            const ref = firebase.database().ref("Usuario/" + user.uid + "/Puntuaciones").push();
            // el id obtenido del nuevo registro, lo asignamos a una variable
            var keyReceta = ref.key;
            //
            const modelo = { id: keyReceta, Puntuacion: puntuacion, NumeroFallos: numeroFallos, NumeroAciertos: numeroAciertos, Fecha: obtenerFechaActual() };
            ref.set(modelo);
        } else {
            // No user is signed in.
        }
    });
}

function obtenerFechaActual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
}