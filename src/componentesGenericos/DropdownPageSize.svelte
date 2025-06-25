<script>
	import { pageSize, actualizarPageSize } from '$lib/store/pageSizeStore';
	let seleccionada = '';
	function actualizar(cantidad) {
		actualizarPageSize(cantidad);
		seleccionada = ':' + cantidad;
	}
</script>

<div class="relative inline-block text-left">
	<!-- Botón personalizado -->
	<button
		class="btn-fabled"
		type="button"
		id="dropdownPageSize"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		Items por página {seleccionada}
	</button>

	<!-- Menú dropdown -->
	<ul
		class="dropdown-menu ring-opacity-5 absolute z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
	>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(5)}>5</a></li>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(10)}>10</a></li>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(15)}>15</a></li>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(20)}>20</a></li>
	</ul>
</div>

<style>
	.btn-fabled {
		padding: 0.5rem 1rem;
		background-color: #b22222;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.25s ease;
	}

	.btn-fabled:hover {
		background-color: #a11d1d;
		transform: scale(1.05);
		box-shadow: 0 2px 6px rgba(178, 34, 34, 0.3);
	}

	.btn-fabled:focus {
		outline: none;
		transform: scale(0.98);
	}

	.dropdown-menu {
		background-color: white;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.dropdown-item {
		display: block;
		padding: 0.5rem 1rem;
		color: #333;
		font-size: 0.875rem;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	.dropdown-item:hover {
		background-color: #f5f5f5;
	}
</style>
