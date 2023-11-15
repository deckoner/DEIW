const listaDigimones = ["Lucemon", "Terriermon","Gomamon", "Tentomon","Lopmon"];
const direccionPrincipal = window.location.origin;

function digimonFavorito() {
    const nAleatorio = Math.floor(Math.random() * listaDigimones.length);
    const rutaDigimones = direccionPrincipal+"/src/js/json/";
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
    imagenElement.className = "imagenAnimacion"

    // Agregar los elementos al div
    divDigimon.appendChild(nombreElement);
    divDigimon.appendChild(imagenElement);
}

document.addEventListener('DOMContentLoaded', (event) => {
    digimonFavorito()

    document.getElementById('email').addEventListener('submit', function(event) {
        event.preventDefault();
        // Aquí va el código para enviar el correo
        this.reset();

        alert("Email enviado con exito")
       });
});
