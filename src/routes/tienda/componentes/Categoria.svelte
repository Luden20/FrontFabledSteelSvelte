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

<div class="relative inline-block text-left">
	<button
		class="btn-fabled"
		type="button"
		id="dropdownPageSize"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		Categoria {seleccionada}
	</button>

	<ul
		class="dropdown-menu ring-opacity-5 absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
	>
		{#each opciones as categoria}
			<li>
				<a href="#" class="dropdown-item" on:click={() => seleccionar(categoria)}>
					{categoria.CAT_NOMBRE}
				</a>
			</li>
		{/each}
	</ul>
</div>
