let catsEliminadas = [];
let imgsEliminadas = [];
let url_imgs = [];
let cats = [];
function prueba() {
    console.log(catsEliminadas);
    console.log(cats);
    console.log(url_imgs);
    console.log(imgsEliminadas)
}
function eliminarTagExistente(id) {
    catsEliminadas.push(id);
    const btn = event.target;
    const badge = btn.closest("span");
    if (badge) badge.remove();
    guardarJsonCatsEliminadas();
    prueba()
}

function eliminarImgExistente(id) {
    imgsEliminadas.push(id);
    const btn = event.target;
    const contenedor = btn.closest("div");
    if (contenedor) contenedor.remove();
    guardarJsonImgsEliminadas();
    prueba()
}

function eliminarTagNuevo(id) {
    cats = cats.filter(c => c !== id);
    const btn = event.target;
    const badge = btn.closest("span");
    if (badge) badge.remove();
    guardarJsonCat();
    prueba()
}

function eliminarImgNuevo(url) {
    url_imgs = url_imgs.filter(u => u !== url);
    const btn = event.target;
    const contenedor = btn.closest("div");
    if (contenedor) contenedor.remove();
    guardarJsonIMG();
    prueba()
}

function agregarIMG() {
    let url = document.getElementById("nueva_imagen_url").value.trim();
    if (url !== "") {
        url_imgs.push(url);
        renderizarImgs();
        document.getElementById("nueva_imagen_url").value = "";
        guardarJsonIMG();
    }
    prueba();
}

function agregarCategoria() {
    let select = document.getElementById("categoriaSelect");
    let id = select.value;

    if (cats.includes(id)) return;

    cats.push(id);
    renderizarTags();
    guardarJsonCat();
    prueba();
}

function renderizarTags() {
    const contenedor = document.getElementById("categorias_asignadas");
    //contenedor.innerHTML = "";

    // Render existentes (si quedan)
    for (let i = 0; i < cats.length; i++) {
        const nombre = getCategoriaNombre(cats[i]);
        let nuevo = document.createElement("span");
        nuevo.className = "badge rounded-pill bg-warning text-dark m-1";
        nuevo.innerHTML = nombre + " <button type=\"button\" onclick=\"eliminarTagNuevo('" + cats[i] + "')\" class=\"btn-close btn-sm ms-2\" aria-label=\"Eliminar\"></button>";
        contenedor.appendChild(nuevo);
    }
}

function getCategoriaNombre(id) {
    let select = document.getElementById("categoriaSelect");
    let opt = Array.from(select.options).find(o => o.value == id);
    return opt ? opt.text : "(Sin nombre)";
}

function renderizarImgs() {
    const contenedor = document.getElementById("imagenes_asignadas");
    contenedor.innerHTML = "";

    for (let i = 0; i < url_imgs.length; i++) {
        let div = document.createElement("div");
        div.className = "d-inline-block position-relative m-2";

        let img = document.createElement("img");
        img.src = url_imgs[i];
        img.width = 100;
        img.classList.add("me-2");

        let boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn-close btn-sm position-absolute top-0 end-0";
        boton.setAttribute("aria-label", "Eliminar");
        boton.onclick = function () { eliminarImgNuevo(url_imgs[i]); };

        div.appendChild(img);
        div.appendChild(boton);
        contenedor.appendChild(div);
    }
}

function guardarJsonIMG() {
    document.getElementById("imagenesJson").value = JSON.stringify(url_imgs);
}

function guardarJsonCat() {
    document.getElementById("categoriasJson").value = JSON.stringify(cats);
}

function guardarJsonCatsEliminadas() {
    document.getElementById("categoriasEliminadasJson").value = JSON.stringify(catsEliminadas);
}

function guardarJsonImgsEliminadas() {
    document.getElementById("imagenesEliminadasJson").value = JSON.stringify(imgsEliminadas);
}

window.onload = function () {
    guardarJsonCat();
    guardarJsonIMG();
    guardarJsonCatsEliminadas();
    guardarJsonImgsEliminadas();
};
