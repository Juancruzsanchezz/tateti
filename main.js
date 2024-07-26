const cuadrillas = document.querySelectorAll(".cuadrilla");
let jugador1 = [];
let jugador2 = [];
let turno = true; 
const combinacionesGanadoras = [    
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let notificacion = document.getElementById("notificacion");
let degradadoNotificacion = document.getElementById("notificacion_degradado");
let nombreGanador = document.getElementById("notificacion_jugador");
let botonReiniciar = document.getElementById("boton_reiniciar");
const contadorJugador1 = document.getElementById("contador_jugador1");
const contadorJugador2 = document.getElementById("contador_jugador2");

botonReiniciar.addEventListener("click", () =>  {   
    jugador1 = [];
    jugador2 = [];

    cuadrillas.forEach(cuadrilla => {   
        if (cuadrilla.classList.contains("j1")) { 
            cuadrilla.classList.remove("j1")
        } else {    
            cuadrilla.classList.remove("j2")
        }
        cuadrilla.classList.add("all")
    });

    notificacion.classList.remove("active");
    degradadoNotificacion.classList.remove("active"); 
});

function elegirCuadrilla(cuadrilla) {   
    if (cuadrilla.classList.contains("all")) {  
        if (turno) {    
            cuadrilla.classList.remove("all");
            cuadrilla.classList.add("j1");
            let valor = parseInt(cuadrilla.getAttribute('data-value'), 10);
            jugador1.push(valor); 
            console.log(jugador1);
            tateti(jugador1, "Jugador 1");
        } else {    
            cuadrilla.classList.remove("all");
            cuadrilla.classList.add("j2");
            let valor = parseInt(cuadrilla.getAttribute('data-value'), 10);
            jugador2.push(valor);
            console.log(jugador2);
            tateti(jugador2, "Jugador 2");
        }
        turno = !turno;
    }
}

function tateti(jugador, nombreJugador) { 
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        let bandera = [0, 0, 0];
        for (let j = 0; j < combinacionesGanadoras[i].length ; j++) {
            for (let k = 0; k < jugador.length; k++) {
                if (combinacionesGanadoras[i][j] === jugador[k]) {
                    bandera[j] = 1;
                }
            }
        }

        if (verificarBandera(bandera, nombreJugador)) {    
            console.log("El ganador es " + nombreJugador);
            notificacion.classList.add("active");
            degradadoNotificacion.classList.add("active");
            nombreGanador.textContent = nombreJugador;
            aumentarContador(nombreJugador);
            
        }     
    }

}

function verificarBandera(bandera) {    
    for (let i = 0; i < bandera.length; i++) {
        if (bandera[i] === 0) {
            return false;
        }
    }
    return true;
}

function aumentarContador(nombreGanador) {   
    if (nombreGanador === "Jugador 1") {    
        let contador = parseInt(contadorJugador1.textContent, 10);
        contador += 1;
        contadorJugador1.textContent = contador;
    } else {    
        let contador = parseInt(contadorJugador2.textContent, 10);
        contador += 1; 
        contadorJugador2.textContent = contador;
    }
}