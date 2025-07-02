<script>
	import Resultado from '../../../../componentesGenericos/Resultado.svelte';
	import { API } from '$lib/service/apis.service';
	import { productos, actualizarProductosAdmin } from '$lib/store/productosStore';
	import { onMount } from 'svelte';
	import ToastGenerico from '../../../../componentesGenericos/ToastGenerico.svelte';

	let categorias = [];
	let resultado = null;
	let texto = '';
	$: texto = texto.length > 500 ? texto.slice(0, 500) : texto;
	onMount(async () => {
		categorias = await API.GET(`/categoria/all`, true);
	});
	function limitar() {
		if (texto.length > 500) {
			texto = texto.slice(0, 500);
			document.getElementById('inputImgs').value = texto;
		}
	}
	function callback(respuesta, error) {
		resultado = error ? { mensaje: 'Error al enviar los datos.' } : respuesta;
		actualizarProductosAdmin();
	}

	function transformarProducto(data) {
		const imagenes = JSON.parse(data.imagenesJson);
		const categoriasJson = JSON.parse(data.categoriasJson);
		const categorias = categoriasJson.map((cat) => parseInt(cat.id));
		const prd = {
			PRD_ID_PK: 0,
			PRD_NOMBRE: data.PRD_NOMBRE,
			PRD_DESCRIPCION: data.PRD_DESCRIPCION,
			PRD_AUTOR: data.PRD_AUTOR,
			PRD_PRECIO: parseFloat(data.PRD_PRECIO) || 0,
			PRD_STOCK: parseInt(data.PRD_STOCK) || 0,
			ESTADO: 'ACT'
		};
		return {
			prd,
			categorias: categorias.map((id) => parseInt(id)),
			imagenes
		};
	}
	const handleSubmit = API.FORMCALL(`/productos`, `POST`, callback, true, transformarProducto);
	let url_imgs = [];
	let cats = [];

	function agregarIMG() {
		let url = document.getElementById('inputImgs').value.trim();

		if (url !== '') {
			url_imgs.push(url);
			renderizarImgs();
			document.getElementById('inputImgs').value = '';
		}
		guardarJsonIMG();
	}
	function agregarCategoria() {
		var select = document.getElementById('categoriaSelect');
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
		var contenedor = document.getElementById('tagsCategorias');
		contenedor.innerHTML = '';
		for (let i = 0; i < cats.length; i++) {
			var nuevo = document.createElement('span');
			nuevo.className = 'badge rounded-pill bg-warning text-dark m-1';
			nuevo.innerHTML =
				cats[i].nombre +
				' <button type="button" onclick="eliminarTag(\'' +
				cats[i].id +
				'\')" class="btn-close btn-sm ms-2" aria-label="Eliminar"></button>';
			contenedor.appendChild(nuevo);
		}
	}

	function eliminarTag(id) {
		cats = cats.filter((c) => c.id != id);
		renderizarTags();
		guardarJsonCat();
	}

	function renderizarImgs() {
		var contenedor = document.getElementById('listaURL');
		contenedor.innerHTML = '';
		for (let i = 0; i < url_imgs.length; i++) {
			var nuevo = document.createElement('li');
			var img = document.createElement('img');
			img.src = url_imgs[i];
			img.width = 100;
			img.classList.add('me-2'); // espacio entre imagen y botón, opcional

			var boton = document.createElement('button');
			boton.type = 'button';
			boton.className = 'btn-close btn-sm';
			boton.setAttribute('aria-label', 'Eliminar');
			boton.onclick = function () {
				eliminarImg(url_imgs[i]);
			};

			nuevo.appendChild(img);
			nuevo.appendChild(boton);
			contenedor.appendChild(nuevo);
		}
	}

	function eliminarImg(url) {
		url_imgs = url_imgs.filter((u) => u !== url);
		renderizarImgs();
		guardarJsonIMG();
	}
	function guardarJsonIMG() {
		document.getElementById('imagenesJson').value = JSON.stringify(url_imgs);
	}
	function guardarJsonCat() {
		document.getElementById('categoriasJson').value = JSON.stringify(cats);
	}
</script>

<form on:submit={handleSubmit} class="registro-form">
	<div class="mb-3">
		<label for="PRD_NOMBRE" class="form-label">Nombre</label>
		<input class="form-control" id="PRD_NOMBRE" name="PRD_NOMBRE" type="text" required />
	</div>

	<div class="mb-3">
		<label for="PRD_DESCRIPCION" class="form-label">Descripción</label>
		<input class="form-control" id="PRD_DESCRIPCION" name="PRD_DESCRIPCION" type="text" required />
	</div>

	<div class="mb-3">
		<label for="PRD_AUTOR" class="form-label">Autor</label>
		<input class="form-control" id="PRD_AUTOR" name="PRD_AUTOR" type="text" value="N/A" required />
	</div>

	<div class="mb-3">
		<label for="PRD_PRECIO" class="form-label">Precio</label>
		<input
			class="form-control"
			id="PRD_PRECIO"
			name="PRD_PRECIO"
			type="number"
			min="0.01"
			step="0.01"
			required
		/>
	</div>

	<div class="mb-3">
		<label for="PRD_STOCK" class="form-label">Stock</label>
		<input class="form-control" id="PRD_STOCK" name="PRD_STOCK" type="number" min="1" required />
	</div>

	<div class="mb-3">
		<label for="categoriaSelect" class="form-label">Categorías</label>
		<select id="categoriaSelect" name="categoria" class="form-select me-2">
			{#each categorias as categoria}
				<option value={categoria.CAT_ID_PK}>{categoria.CAT_NOMBRE}</option>
			{/each}
		</select>
		<button type="button" class="btn-fabled-outline mt-2" on:click={agregarCategoria}
			>Agregar Categoría</button
		>
		<div id="tagsCategorias" class="mt-3"></div>
	</div>

	<div class="mb-3">
		<label for="inputImgs" class="form-label">URL de Imagen</label>
		<input type="text" id="inputImgs" placeholder="URL IMGS" class="form-control" maxlength="400" />
		<button type="button" class="btn-fabled-outline mt-2" on:click={agregarIMG}
			>Agregar Imagen</button
		>
		<ul id="listaURL" class="mt-3"></ul>
	</div>

	<input type="hidden" name="imagenesJson" id="imagenesJson" />
	<input type="hidden" name="categoriasJson" id="categoriasJson" />

	{#if !resultado || resultado.exito != 'Exito'}
		<div class="mt-4 text-center">
			<input type="submit" value="Crear Producto" class="btn-fabled px-5" />
		</div>
	{/if}
</form>

{#if resultado}
	<ToastGenerico mensaje={resultado.mensaje} exito={resultado.exito} />
{/if}

<style>
	.registro-form {
		padding: 1rem;
		font-family: 'Lora', serif;
	}

	.form-label {
		font-family: 'Cinzel', serif;
		font-weight: bold;
		color: #b22222;
	}

	.form-control,
	.form-select {
		background-color: #fff;
		color: #000;
		border: 1px solid #b22222;
		border-radius: 0.5rem;
	}

	.form-control:focus,
	.form-select:focus {
		border-color: #b22222;
		box-shadow: 0 0 0 0.25rem rgba(178, 34, 34, 0.25);
	}

	.btn-fabled {
		border: none;
		background-color: #b22222;
		color: #fff;
		border-radius: 999px;
		font-family: 'Cinzel', serif;
		font-weight: bold;
		transition: all 0.3s ease;
	}

	.btn-fabled:hover {
		background-color: #7b1e1e;
		transform: scale(1.05);
	}

	.btn-fabled-outline {
		border: 2px solid #b22222;
		background-color: #fff;
		color: #b22222;
		border-radius: 999px;
		font-family: 'Cinzel', serif;
		font-weight: bold;
		transition: all 0.3s ease;
	}

	.btn-fabled-outline:hover {
		background-color: #b22222;
		color: #fff;
		transform: scale(1.05);
	}

	#tagsCategorias span {
		background-color: transparent;
		color: #b22222;
		border: 2px solid #b22222;
		font-weight: bold;
		font-size: 0.9rem;
		padding: 0.4em 0.7em;
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		margin: 0.3em;
	}

	#tagsCategorias span button {
		margin-left: 0.5em;
	}

	ul#listaURL li {
		background-color: #fff;
		border: 1px solid #b22222;
		border-radius: 0.5rem;
		padding: 0.3em 0.6em;
		margin-bottom: 0.5em;
		color: #000;
		font-family: 'Lora', serif;
	}
</style>
