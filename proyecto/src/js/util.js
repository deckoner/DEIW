const listaDigimones = [
    "Lucemon",
    "Terriermon",
    "Gomamon",
    "Tentomon",
    "Lopmon",
];
const direccionPrincipal = window.location.origin;

function digimonFavorito() {
    const nAleatorio = Math.floor(Math.random() * listaDigimones.length);
    const rutaDigimones = direccionPrincipal + "/src/js/json/";
    const nombreArchivo = listaDigimones[nAleatorio] + ".json";
    const rutaCompleta = rutaDigimones + nombreArchivo;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const digimon = JSON.parse(xhr.responseText);
            imprimirDatosDigimon(digimon);
        }
    };

    xhr.open("GET", rutaCompleta, true);
    xhr.send();
}

function imprimirDatosDigimon(digimon) {
    // Obtener el div con el id "digimonAleatorio"
    const divDigimon = document.getElementById("digimonAleatorio");

    // Crear un elemento de párrafo para el nombre del Digimon
    const nombreElement = document.createElement("p");
    nombreElement.textContent = "Nombre: " + digimon.name;

    // Crear un elemento de imagen para la imagen del Digimon
    const imagenElement = document.createElement("img");
    imagenElement.src = digimon.images[0].href; // Acceder al primer elemento del array de imágenes
    imagenElement.alt = "Imagen de " + digimon.name;
    imagenElement.className = "imagenAnimacion";

    // Agregar los elementos al div
    divDigimon.appendChild(nombreElement);
    divDigimon.appendChild(imagenElement);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
 }

 function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
 }

 document.addEventListener("DOMContentLoaded", (event) => {
    const cookies = document.getElementById("cookies");
    const overlay = document.getElementById("overlay");
    const aceptarCookies = document.getElementById("aceptarCookies");
    const rechazarCookies = document.getElementById("rechazarCookies");
  
    if (getCookie('cookiesAceptadas') === 'true') {
        cookies.style.visibility = "hidden";
        overlay.style.display = "none"; // Ocultar el overlay cuando las cookies son aceptadas
        document.body.style.overflow = 'auto'; // Habilitar el desplazamiento cuando las cookies son aceptadas
    }
   
    digimonFavorito();
   
    // Verifica si la página actual es "contactame.html"
    if (window.location.pathname === "/contactame.html") {
        document
            .getElementById("email")
            .addEventListener("submit", function (event) {
                event.preventDefault();
                // Aquí va el código para enviar el correo
                this.reset();
   
                alert("Email enviado con exito");
            });
    }
   
    aceptarCookies.addEventListener("click", function () {
        cookies.style.visibility = "hidden";
        overlay.style.display = "none"; // Ocultar el overlay cuando el usuario acepta las cookies
        document.body.style.overflow = 'auto'; // Habilitar el desplazamiento cuando el usuario acepta las cookies
        setCookie('cookiesAceptadas', 'true', 1);
    });
   
    rechazarCookies.addEventListener("click", function () {
        cookies.style.visibility = "hidden";
        overlay.style.display = "none"; // Ocultar el overlay cuando el usuario rechaza las cookies
        document.body.style.overflow = 'auto'; // Habilitar el desplazamiento cuando el usuario rechaza las cookies
        setCookie('cookiesAceptadas', 'false', 1);
    });
  });