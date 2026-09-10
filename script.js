/* =========================
   GUARDIAN IRTRA
   SIMULADOR DE MONITOREO
========================= */

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

let motionDetected = false;


/* =========================
   ACTUALIZAR DISTANCIA
========================= */

function updateDistance() {

    const distance = Number(distanceSlider.value);

    distanceDisplay.textContent = distance;

    /*
        Mientras menor sea la distancia,
        mayor será el porcentaje de la barra.
    */

    const percentage = 100 - ((distance - 10) / 90) * 100;

    distanceFill.style.width = `${percentage}%`;


    /*
        Si está a 60 cm o menos,
        se activa la alerta visual.
    */

    if (distance <= 60) {

        distanceLight.classList.remove("green");
        distanceLight.classList.add("red");

        distanceStatus.textContent = "ZONA DE ALERTA";

        distanceDisplay.style.color = "#ff3030";
        distanceFill.style.background = "#ff3030";

        /*
            Si también existe movimiento,
            se activa la alarma.
        */

        if (motionDetected) {

            alarmLight.classList.remove("green");
            alarmLight.classList.add("red");

            alarmStatus.textContent = "ALARMA ACTIVA";

        }

    } else {

        distanceLight.classList.remove("red");
        distanceLight.classList.add("green");

        distanceStatus.textContent = "ZONA SEGURA";

        distanceDisplay.style.color = "#42dc76";
        distanceFill.style.background = "#42dc76";

        alarmLight.classList.remove("red");
        alarmLight.classList.add("green");

        alarmStatus.textContent = "INACTIVA";
    }

}


/* =========================
   SIMULAR MOVIMIENTO
========================= */

motionButton.addEventListener("click", function () {

    motionDetected = !motionDetected;

    if (motionDetected) {

        motionButton.textContent = "Detener movimiento";

        motionLight.classList.remove("green");
        motionLight.classList.add("red");

        motionStatus.textContent = "MOVIMIENTO DETECTADO";

        /*
            La alarma solo se activa si el movimiento
            ocurre dentro de los 60 cm.
        */

        if (Number(distanceSlider.value) <= 60) {

            alarmLight.classList.remove("green");
            alarmLight.classList.add("red");

            alarmStatus.textContent = "ALARMA ACTIVA";

        }

    } else {

        motionButton.textContent = "Simular movimiento";

        motionLight.classList.remove("red");
        motionLight.classList.add("green");

        motionStatus.textContent = "NO DETECTADO";

        alarmLight.classList.remove("red");
        alarmLight.classList.add("green");

        alarmStatus.textContent = "INACTIVA";
    }

});


/* =========================
   CAMBIO DE DISTANCIA
========================= */

distanceSlider.addEventListener("input", updateDistance);


/* =========================
   RELOJ DEL SISTEMA
========================= */

function updateClock() {

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("system-time").textContent =
        `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();
updateDistance();
