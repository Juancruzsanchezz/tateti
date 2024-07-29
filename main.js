const cuadrillas = document.querySelectorAll(".cuadrilla");
let nombreJugador1;
let nombreJugador2;
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
let login = document.getElementById("login");
let notificacion = document.getElementById("notificacion");
let notificacionpopUp = document.getElementById("notificacion-pop-up");
let degradadoNotificacion = document.getElementById("notificacion_degradado");
let nombreGanador = document.getElementById("notificacion_jugador");
let botonReiniciar = document.getElementById("boton_reiniciar");
let botonLogin = document.getElementById("boton-login");
const contadorJugador1 = document.getElementById("contador_jugador1");
const contadorJugador2 = document.getElementById("contador_jugador2");

botonLogin.addEventListener("click", () => {    
    let valorInput1 = document.getElementById("nombre-jugador-1").value;
    let valorInput2 = document.getElementById("nombre-jugador-2").value;
    if (valorInput1 === '' || valorInput2 === '') {
        notificacionPopUp("¡Uno de los campos esta incompleto!");
    } else { 
        nombreJugador1 = valorInput1.trim();
        nombreJugador2 = valorInput2.trim();  
        login.classList.remove("active");
    }
})

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
            tateti(jugador1, nombreJugador1);
        } else {    
            cuadrilla.classList.remove("all");
            cuadrilla.classList.add("j2");
            let valor = parseInt(cuadrilla.getAttribute('data-value'), 10);
            jugador2.push(valor);
            console.log(jugador2);
            tateti(jugador2, nombreJugador2);
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

        if (verificarBandera(bandera)) {    
            notificacion.classList.add("active");
            notificacion.children[0].textContent = "¡Felicidades gordito!";
            notificacion.children[1].textContent = '"' + nombreJugador + '" es el ganador';
            degradadoNotificacion.classList.add("active");
            aumentarContador(nombreJugador);
            if (nombreJugador === nombreJugador1) {
                animacionGanador(contadorJugador1, contadorJugador2);
            } else {    
                animacionGanador(contadorJugador2, contadorJugador1);
            }
            break;
        } 
        if ((empate())) {
            notificacion.classList.add("active");
            notificacion.children[0].textContent = "¡Empate!";
            notificacion.children[1].textContent = "Preciona el boton para jugar de nuevo";
            degradadoNotificacion.classList.add("active");
            break;
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
    if (nombreGanador === nombreJugador1) {    
        let contador = parseInt(contadorJugador1.textContent, 10);
        contador++;
        contadorJugador1.textContent = contador;
    } else {    
        let contador = parseInt(contadorJugador2.textContent, 10);
        contador++;
        contadorJugador2.textContent = contador;
    }
}

function animacionGanador(contadorGanador, contadorPerdedor) {    
    let valorContador = parseInt(contadorGanador.textContent, 10);
    contadorGanador.classList.add("ganador");
    contadorGanador.textContent = "!GANADOR¡"
    contadorPerdedor.classList.add("perdedor");
    setTimeout(() => {
        contadorGanador.classList.remove("ganador");
        contadorGanador.textContent = valorContador;
        contadorPerdedor.classList.remove("perdedor");
    }, 4000);
}

function empate() { 
    let i = 0;
    cuadrillas.forEach(cuadrilla => {   
        if (cuadrilla.classList.contains("j1") || cuadrilla.classList.contains("j2")) { 
            i++;
        }
    });
    if (i === 9) return true;
}

function notificacionPopUp(mensaje) {  
    notificacionpopUp.children[0].textContent = mensaje;
    notificacionpopUp.classList.add("active");
    setTimeout(() => {
        notificacionpopUp.classList.remove("active")
    }, 4000);
}