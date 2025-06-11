let url_imgs = [];
let cats = [];

function agregarIMG() {
    let url = document.getElementById("inputImgs").value.trim();

    if (url !== "") {
        url_imgs.push(url);
        renderizarImgs(); 
        document.getElementById("inputImgs").value = "";
    }
    guardarJsonIMG();
}
function agregarCategoria() {
    var select = document.getElementById("categoriaSelect");
    for (let i = 0; i < cats.length; i++) {
        if (cats[i].id == select.value) {
            return;
        }
    }
    cats.push({
        id: select.value,
        nombre: select.options[select.selectedIndex].text
    });
    renderizarTags();
    guardarJsonCat();
}

function renderizarTags() {
    var contenedor = document.getElementById("tagsCategorias");
    contenedor.innerHTML = "";
    for (let i = 0; i < cats.length; i++) {
        var nuevo = document.createElement("span");
        nuevo.className = "badge rounded-pill bg-warning text-dark m-1";
        nuevo.innerHTML = cats[i].nombre + " <button type=\"button\" onclick=\"eliminarTag('" + cats[i].id + "')\" class=\"btn-close btn-sm ms-2\" aria-label=\"Eliminar\"></button>";
        contenedor.appendChild(nuevo);
    }
}

function eliminarTag(id) {
    cats = cats.filter(c => c.id != id);
    renderizarTags();
    guardarJsonCat()
}

function renderizarImgs() {
    var contenedor = document.getElementById("listaURL");
    contenedor.innerHTML = "";
    for (let i = 0; i < url_imgs.length; i++) {
        var nuevo = document.createElement("li");
        var img = document.createElement("img");
        img.src = url_imgs[i];
        img.width = 100;
        img.classList.add("me-2"); // espacio entre imagen y botón, opcional

        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn-close btn-sm";
        boton.setAttribute("aria-label", "Eliminar");
        boton.onclick = function () { eliminarImg(url_imgs[i]); };

        nuevo.appendChild(img);
        nuevo.appendChild(boton);
        contenedor.appendChild(nuevo);
    }
}


function eliminarImg(url) {
    url_imgs = url_imgs.filter(u => u !== url);
    renderizarImgs();
    guardarJsonIMG();
}
function guardarJsonIMG() {
    document.getElementById("imagenesJson").value = JSON.stringify(url_imgs);
}
function guardarJsonCat() {
    document.getElementById("categoriasJson").value = JSON.stringify(cats);
}