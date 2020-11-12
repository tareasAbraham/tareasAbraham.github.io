function verificarUsuario() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var user = firebase.auth().currentUser;
            if (user != null) {
                window.location.replace("juego.html");
            }
        } else {
            // No user is signed in.
            window.location.replace("index.html");
        }
    });
}

function verificarSesion() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            // No user is signed in.
            window.location.replace("index.html");
        }
    });
}

function iniciarSesion() {
    var usuarioCorreo = document.getElementById("campo_email").value;
    var usuarioContra = document.getElementById("campo_contra").value;
    firebase.auth().signInWithEmailAndPassword(usuarioCorreo, usuarioContra).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
        // ...
    });
    verificarUsuario()
}

function cerrarSesion() {
    window.location.replace("index.html");
    firebase.auth().signOut();
}