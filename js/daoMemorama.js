//Cuando se haya ganado el juego, vamos a guardar su puntuacion en la bd
export function guardarPuntuacion(puntuacion, numeroFallos, numeroAciertos) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Se obtiene el usuario actual
            var user = firebase.auth().currentUser;
            // Se obtiene el id de un nuevo registro, pero sin agregar el registro aun en la bd
            const ref = firebase.database().ref("Usuario/" + user.uid + "/Puntuaciones").push();
            // El id obtenido del nuevo registro, lo asignamos a una variable
            var keyReceta = ref.key;
            // Se crea un modelo de datos a guardar
            const modelo = { id: keyReceta, Puntuacion: puntuacion, NumeroFallos: numeroFallos, NumeroAciertos: numeroAciertos, Fecha: obtenerFechaActual() };
            // Al registro creado, se le coloca el modelo de datos y ahora si, se aplica a la bd
            ref.set(modelo);
        } else {
            // El usuario no inicio sesion
        }
    });
}

// Obtenemos la fecha actual en milisegundos y lo convertimos a una fecha en string
function obtenerFechaActual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return today = mm + '/' + dd + '/' + yyyy;
}