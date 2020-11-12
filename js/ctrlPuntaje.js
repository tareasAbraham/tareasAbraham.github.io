function obtenerPuntaje() {
    var modelo;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref('Usuario/' + user.uid + '/Puntuaciones').on("value",
                dataSnapshot => {
                    dataSnapshot.forEach(ds => {
                        modelo = ds.val();
                        agregarPuntaje(modelo.Puntuacion, modelo.NumeroAciertos, modelo.NumeroFallos, modelo.Fecha);
                    })
                },
                muestraError);
        }
    });
}

function agregarPuntaje(Puntaje, Aciertos, Fallos, Fecha) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = Puntaje;
    cell2.innerHTML = Aciertos;
    cell3.innerHTML = Fallos;
    cell4.innerHTML = Fecha;
}

function muestraError(e) {
    console.error(e);
    alert(e.message);
}

function regresarAlJuego() {
    window.location.replace("juego.html");
}

obtenerPuntaje()