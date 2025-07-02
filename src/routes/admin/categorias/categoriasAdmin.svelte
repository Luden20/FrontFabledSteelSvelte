<script>
	import ItemCategoria from './componentes/ItemCategoria.svelte';
	import { onMount } from 'svelte';
	import { Table } from 'flowbite-svelte';
	import { categorias, actualizarCategoriasAdmin } from '$lib/store/categoriaAdminStore';
	import BotonModalGenerico from '../../../componentesGenericos/BotonModalGenerico.svelte';
	import CrearCategoria from './componentes/CrearCategoria.svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { pageSize, actualizarPageSize } from '$lib/store/pageSizeStore';
	import DropdownPageSize from '../../../componentesGenericos/DropdownPageSize.svelte';
	onMount(actualizarCategoriasAdmin);

	let currentPage = 1;
	$: {
		if ($categorias && Array.isArray($categorias)) {
			const totalPages = Math.ceil($categorias.length / $pageSize);
			if (currentPage > totalPages) {
				currentPage = totalPages || 1;
			}
		}
	}

	$: paginatedItems =
		$categorias && Array.isArray($categorias)
			? paginate({ items: $categorias, pageSize: $pageSize, currentPage })
			: [];
</script>

<!-- Contenedor principal -->
<div class="mx-auto mt-8 max-w-7xl space-y-6 px-4">
	<!-- Botón Crear -->
	<div class="flex items-center justify-between">
		<DropdownPageSize />

		<BotonModalGenerico componente={CrearCategoria} textoBoton="Crear" titulo="Crear categoría" />
	</div>

	<!-- Tabla de Categorías -->
	<div class="animate-fade-in rounded-2xl border border-gray-300 bg-white shadow-xl">
		<Table class="w-full table-auto text-sm text-gray-800">
			<thead class="bg-[#B22222] tracking-wide text-white uppercase">
				<tr>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Nombre</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Descripción</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Estado</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Acciones Estado</th>
					<th class="px-6 py-3 text-left">Edición</th>
				</tr>
			</thead>
			<tbody>
				{#if $categorias.length > 0}
					{#each paginatedItems as categoria}
						<ItemCategoria {categoria} />
					{/each}
				{:else}
					<tr>
						<td colspan="5" class="py-6 text-center text-gray-500 italic">
							No hay categorías registradas
						</td>
					</tr>
				{/if}
			</tbody>
		</Table>
	</div>
</div>
{#if $categorias && $categorias.length > $pageSize}
	<div class="d-flex justify-content-center mt-4">
		<LightPaginationNav
			totalItems={$categorias?.length || 0}
			pageSize={$pageSize}
			{currentPage}
			limit={1}
			showStepOptions={true}
			on:setPage={(e) => (currentPage = e.detail.page)}
		/>
	</div>
{/if}

<style>
	.animate-fade-in {
		animation: fade-in 0.4s ease-in-out;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	th,
	td {
		font-family: 'Lora', serif;
		font-size: 0.95rem;
		padding: 0.75rem;
		text-align: left;
		vertical-align: middle;
	}

	th {
		font-family: 'Cinzel', serif;
		font-weight: bold;
	}

	tbody tr:hover {
		background-color: #fdf2f2;
		transition: background-color 0.3s ease;
	}
</style>
