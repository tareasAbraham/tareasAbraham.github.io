// Se verifica si el usuario inicio sesion correctamente para direccionarlo al juego
function verificarUsuario() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Si el usuario inicio sesion correctamente se crea un objeto usuario
            var user = firebase.auth().currentUser;
            // Si el usuario no  es nulo, se redirecciona al juego
            if (user != null) {
                window.location.replace("juego.html");
            }
        } else {
            // Si el suario no inicio sesion correctamente
        }
    });
}

// Se verifica si actualmente hay un usuario activo
function verificarSesion() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            // Si el usuario no ha iniciado sesion, no puede ver esta pagina, por lo que hay que redireccionarlo
            window.location.replace("index.html");
        }
    });
}

function iniciarSesion() {
    // Obtenemos los datos del formulario
    var usuarioCorreo = document.getElementById("campo_email").value;
    var usuarioContra = document.getElementById("campo_contra").value;
    firebase.auth().signInWithEmailAndPassword(usuarioCorreo, usuarioContra).catch(function(error) {
        // Si hay errores, los mostramos en un alert
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // ...
    });
    // Se ejecuta el metodo para verificar si al final de todo, existe o no un usuario
    verificarUsuario()
}

function cerrarSesion() {
    //Cerramos sesion y lo mandamos al index
    firebase.auth().signOut();
    window.location.replace("index.html");
}