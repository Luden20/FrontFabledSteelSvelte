let catsEliminadas = [];
let imgsEliminadas = [];
let url_imgs = [];
let cats = [];

function eliminarTagExistente(id) {
	catsEliminadas.push(id);
	const btn = event.target;
	const badge = btn.closest("span");
	if (badge) badge.remove();
	guardarJsonCatsEliminadas();
}

function eliminarImgExistente(id) {
	imgsEliminadas.push(id);
	const btn = event.target;
	const contenedor = btn.closest("div");
	if (contenedor) contenedor.remove();
	guardarJsonImgsEliminadas();
}

function eliminarTagNuevo(id) {
	cats = cats.filter(c => c !== id);
	const el = document.querySelector(`[data-cat-id="${id}"]`);
	if (el) el.remove();
	guardarJsonCat();
}

function eliminarImgNuevo(url) {
	url_imgs = url_imgs.filter(u => u !== url);
	const el = document.querySelector(`[data-img-url="${url}"]`);
	if (el) el.remove();
	guardarJsonIMG();
}

function agregarIMG() {
	let url = document.getElementById("nueva_imagen_url").value.trim();
	if (url !== "" && !url_imgs.includes(url)) {
		url_imgs.push(url);
		renderizarImgs();
		document.getElementById("nueva_imagen_url").value = "";
		guardarJsonIMG();
	}
}

function agregarCategoria() {
	let select = document.getElementById("categoriaSelect");
	let id = select.value.trim();
	if (id && !cats.includes(id)) {
		cats.push(id);
		renderizarTags();
		guardarJsonCat();
	}
}

function renderizarTags() {
	const contenedor = document.getElementById("categorias_asignadas");

	for (let i = 0; i < cats.length; i++) {
		const catId = cats[i];
		if (contenedor.querySelector(`[data-cat-id="${catId}"]`)) continue;

		const nombre = getCategoriaNombre(catId);
		let nuevo = document.createElement("span");
		nuevo.className = "badge rounded-pill bg-warning text-dark m-1";
		nuevo.setAttribute("data-cat-id", catId);
		nuevo.innerHTML = nombre + ` 
			<button type="button" onclick="eliminarTagNuevo('${catId}')" class="btn-close btn-sm ms-2" aria-label="Eliminar"></button>`;
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

	for (let i = 0; i < url_imgs.length; i++) {
		const imgUrl = url_imgs[i];
		if (contenedor.querySelector(`[data-img-url="${imgUrl}"]`)) continue;

		let div = document.createElement("div");
		div.className = "d-inline-block position-relative m-2";
		div.setAttribute("data-img-url", imgUrl);

		let img = document.createElement("img");
		img.src = imgUrl;
		img.width = 100;
		img.classList.add("me-2");

		let boton = document.createElement("button");
		boton.type = "button";
		boton.className = "btn-close btn-sm position-absolute top-0 end-0";
		boton.setAttribute("aria-label", "Eliminar");
		boton.onclick = function () { eliminarImgNuevo(imgUrl); };

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
