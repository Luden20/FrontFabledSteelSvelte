<script>
	import { pageSize, actualizarPageSize } from '$lib/store/pageSizeStore';
	let seleccionada = '';

	function actualizar(cantidad) {
		actualizarPageSize(cantidad);
		seleccionada = ':' + cantidad;
	}
</script>

<div class="dropdown">
	<!-- Botón principal -->
	<button
		class="btn-fabled dropdown-toggle"
		type="button"
		id="dropdownPageSize"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		<i class="bi bi-list-ol me-2"></i> Items por página {seleccionada}
	</button>

	<!-- Opciones del dropdown -->
	<ul class="dropdown-menu rounded-5 shadow-sm" aria-labelledby="dropdownPageSize">
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(5)}>5</a></li>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(10)}>10</a></li>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(15)}>15</a></li>
		<li><a href="#" class="dropdown-item" on:click={() => actualizar(20)}>20</a></li>
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

	.dropdown-menu {
		border-radius: 1rem;
		min-width: 8rem;
		overflow: hidden;
	}

	.dropdown-item {
		display: block;
		padding: 0.5rem 1rem;
		font-size: 0.95rem;
		color: #333;
		font-family: 'Lora', serif;
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	.dropdown-item:hover {
		background-color: #f8d7da;
		color: #b22222;
	}
</style>
