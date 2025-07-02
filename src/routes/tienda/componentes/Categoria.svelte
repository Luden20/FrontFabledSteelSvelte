<script>
	import { API } from '$lib/service/apis.service';
	import { onMount } from 'svelte';
	let opciones = [];
	let seleccionada = 'Categorías';
	export let callback = () => {};

	onMount(async () => {
		opciones = await API.GET(`/categorias`, false);
	});

	function seleccionar(cat) {
		seleccionada = ':' + cat.CAT_NOMBRE;
		callback(cat.CAT_ID_PK);
	}
</script>

<div class="dropdown">
	<button
		class="btn-fabled dropdown-toggle"
		type="button"
		id="dropdownCategoria"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		<i class="bi bi-tags-fill me-2"></i>  {seleccionada}
	</button>

	<ul class="dropdown-menu rounded-5 shadow-sm" aria-labelledby="dropdownCategoria">
		{#each opciones as categoria}
			<li>
				<a href="#" class="dropdown-item" on:click={() => seleccionar(categoria)}>
					{categoria.CAT_NOMBRE}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.btn-fabled {
		padding: 0.5rem 1.2rem;
		background-color: #b22222;
		color: white;
		border: none;
		border-radius: 999px !important;
		font-family: 'Segoe UI', 'Roboto', 'Helvetica', sans-serif;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.btn-fabled:hover {
		background-color: #8b1a1a;
		transform: scale(1.05);
		box-shadow: 0 2px 6px rgba(178, 34, 34, 0.3);
	}

	.dropdown-item {
		padding: 0.5rem 1rem;
		font-size: 0.95rem;
		color: #333;
		font-family: 'Lora', serif;
	}

	.dropdown-item:hover {
		background-color: #f8d7da;
		color: #b22222;
	}

	.dropdown-menu {
		border-radius: 1rem;
	}
</style>
