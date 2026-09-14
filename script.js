const distanceSlider = document.getElementById("distance-slider");

const distanceDisplay = document.getElementById("distance");
const distanceFill = document.getElementById("distance-fill");

const distanceLight = document.getElementById("distance-light");
const motionLight = document.getElementById("motion-light");
const alarmLight = document.getElementById("alarm-light");

const distanceStatus = document.getElementById("distance-status");
const motionStatus = document.getElementById("motion-status");
const alarmStatus = document.getElementById("alarm-status");

const motionButton = document.getElementById("motion-button");

const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

let motionDetected = false;


/* CAMBIAR COLOR DE LOS INDICADORES */

function setAlert(element, active) {

    element.classList.toggle("alert", active);

}


/* ACTUALIZAR EL SIMULADOR */

function updateSystem() {

    const distance = Number(distanceSlider.value);

    const proximityAlert = distance <= 60;
    const alarmActive = proximityAlert && motionDetected;

    const percentage =
        100 - ((distance - 10) / 90) * 100;


    distanceDisplay.textContent = distance;

    distanceFill.style.width =
        `${percentage}%`;


    if (proximityAlert) {

        distanceDisplay.style.color = "#ff3838";
        distanceFill.style.background = "#ff3838";

    } else {

        distanceDisplay.style.color = "#43db7b";
        distanceFill.style.background = "#43db7b";

    }


    setAlert(distanceLight, proximityAlert);
    setAlert(motionLight, motionDetected);
    setAlert(alarmLight, alarmActive);


    distanceStatus.textContent =
        proximityAlert
            ? "ZONA DE ALERTA"
            : "ZONA SEGURA";


    motionStatus.textContent =
        motionDetected
            ? "MOVIMIENTO DETECTADO"
            : "NO DETECTADO";


    alarmStatus.textContent =
        alarmActive
            ? "ALARMA ACTIVA"
            : "INACTIVA";

}


/* BOTÓN PARA SIMULAR MOVIMIENTO */

motionButton.addEventListener("click", function () {

    motionDetected = !motionDetected;


    if (motionDetected) {

        motionButton.textContent =
            "Detener movimiento";

        motionButton.classList.add("active");

    } else {

        motionButton.textContent =
            "Simular movimiento";

        motionButton.classList.remove("active");

    }


    updateSystem();

});


/* CONTROL DE DISTANCIA */

distanceSlider.addEventListener(
    "input",
    updateSystem
);


/* RELOJ DEL MONITOR */

function updateClock() {

    const now = new Date();

    const formattedTime =
        now.toLocaleTimeString("es-GT", {

            hour12: false,

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        });


    document.getElementById(
        "system-time"
    ).textContent = formattedTime;

}


/* MENÚ PARA TELÉFONOS */

menuButton.addEventListener("click", function () {

    const open =
        navLinks.classList.toggle("open");

    menuButton.setAttribute(
        "aria-expanded",
        String(open)
    );

});


/* CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN */

navLinks
    .querySelectorAll("a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


/* INICIAR LA PÁGINA */

setInterval(updateClock, 1000);

updateClock();
updateSystem();
