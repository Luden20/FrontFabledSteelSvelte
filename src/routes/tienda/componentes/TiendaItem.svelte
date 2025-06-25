<script>
	import Detalle from './Detalle.svelte';
	import ModalGenerico from '../../../componentesGenericos/ModalGenerico.svelte';

	export let item;
	let cantidad = 1;
	let mostrarModal = false;

	function abrir() {
		mostrarModal = true;
	}

	function cerrar() {
		mostrarModal = false;
	}
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Tarjeta -->
<div class="card tarjeta-uniforme d-flex flex-column shadow-lg">
	<img
		class="card-img-top"
		src={item.imagen.IMG__URL}
		alt="Imagen"
		style="height: 200px; object-fit: cover;"
	/>

	<div class="card-body">
		<h5 class="card-title">{item.PRD_NOMBRE}</h5>
		<p class="card-text">{item.PRD_DESCRIPCION}</p>
	</div>

	<ul class="list-group list-group-flush">
		<li class="list-group-item"><strong>Autor:</strong> {item.PRD_AUTOR}</li>
		<li class="list-group-item"><strong>Precio:</strong> {item.PRD_PRECIO} USD</li>
		<li class="list-group-item">
			<label class="form-label text-danger fw-bold" style="font-family: 'Cinzel', serif;"
				>Cantidad</label
			>
			<select bind:value={cantidad} class="form-select">
				{#each Array(item.PRD_STOCK)
					.fill(0)
					.map((_, i) => i + 1) as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
		</li>
	</ul>

	<!-- Botones siempre al fondo -->
	<div class="d-flex justify-content-between mt-auto gap-2 px-3 py-3">
		<button
			class="btn-fabled-flex"
			on:click={() =>
				window.agregar(
					item.PRD_ID_PK,
					item.PRD_NOMBRE,
					item.PRD_DESCRIPCION,
					item.PRD_PRECIO,
					item.imagen.IMG__URL,
					item.PRD_AUTOR,
					item.PRD_STOCK,
					cantidad
				)}
		>
			<i class="bi bi-cart-plus"></i> Comprar
		</button>

		<button class="btn-fabled-outline-flex" on:click={abrir}>
			<i class="bi bi-info-circle"></i> Más Info
		</button>
	</div>
</div>

<ModalGenerico
	mostrar={mostrarModal}
	on:close={cerrar}
	titulo="Detalle del Producto"
	componente={Detalle}
	props={{ id: item.PRD_ID_PK }}
/>

<style>
	.tarjeta-uniforme {
		min-width: 300px;
		min-height: 650px;
		display: flex;
		flex-direction: column;
	}

	.card {
		background-color: rgba(255, 255, 255, 0.92);
		border: 2px solid #b22222;
		border-radius: 1rem;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
		font-family: 'Lora', serif;
	}

	.card:hover {
		transform: scale(1.03);
		border-color: #7b1e1e;
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
	}

	.card-title {
		font-family: 'Cinzel', serif;
		font-weight: bold;
		color: #b22222;
	}

	.card-text {
		color: #333;
		font-size: 0.95rem;
		margin-bottom: 0.5rem;
		display: -webkit-box;
		-webkit-line-clamp: 3; /* máximo 3 líneas */
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.form-select {
		font-family: 'Lora', serif;
		border: 1px solid #b22222;
		border-radius: 0.5rem;
	}

	.form-select:focus {
		border-color: #b22222;
		box-shadow: 0 0 0 0.2rem rgba(178, 34, 34, 0.25);
	}

	.btn-fabled-flex,
	.btn-fabled-outline-flex {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.4rem 1rem;
		font-size: 0.9rem;
		font-family: 'Cinzel', serif;
		font-weight: bold;
		border-radius: 999px;
		transition: all 0.3s ease;
		height: 38px;
		white-space: nowrap;
	}

	.btn-fabled-flex {
		border: none;
		background-color: #b22222;
		color: #fff;
	}

	.btn-fabled-flex:hover {
		background-color: #7b1e1e;
		transform: scale(1.05);
	}

	.btn-fabled-outline-flex {
		border: 2px solid #b22222;
		background-color: transparent;
		color: #b22222;
	}

	.btn-fabled-outline-flex:hover {
		background-color: #f8d7da;
		transform: scale(1.05);
	}
	.card-body {
		min-height: 100px;
	}

	.card-text {
		min-height: 66px;
	}

	.list-group {
		min-height: 130px;
	}
</style>
