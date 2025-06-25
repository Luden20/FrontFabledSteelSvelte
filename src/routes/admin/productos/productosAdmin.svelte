<script>
	import { Table } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { actualizarProductosAdmin, productos } from '$lib/store/productosStore';
	import ItemProducto from './componentes/ItemProducto.svelte';
	import BuscadorGenerico from '../../../componentesGenericos/BuscadorGenerico.svelte';
	import BotonModalGenerico from '../../../componentesGenericos/BotonModalGenerico.svelte';
	import CrearProducto from './componentes/CrearProducto.svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { pageSize, actualizarPageSize } from '$lib/store/pageSizeStore';
	import DropdownPageSize from '../../../componentesGenericos/DropdownPageSize.svelte';
	let params = [
		{ llave: 'Nombre', valor: 'Nombre' },
		{ llave: 'Autor', valor: 'Autor' }
	];
	onMount(actualizarProductosAdmin);

	let currentPage = 1;
	$: paginatedItems =
		$productos && Array.isArray($productos)
			? paginate({ items: $productos, pageSize: $pageSize, currentPage })
			: [];
</script>

<!-- Contenedor principal -->
<div class="mx-auto mt-8 max-w-7xl space-y-6 px-4">
	<!-- Buscador + Botón -->
	<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
		<DropdownPageSize />

		<BuscadorGenerico {params} callback={actualizarProductosAdmin} />
		<BotonModalGenerico
			componente={CrearProducto}
			titulo={'Crear Producto'}
			textoBoton={'Crear Producto'}
			tipo={'Titulo'}
		/>
	</div>

	<!-- Tabla -->
	<div class="animate-fade-in rounded-2xl border border-gray-300 bg-white shadow-xl">
		<Table class="w-full table-auto text-sm text-gray-800">
			<thead class="bg-[#B22222] tracking-wide text-white uppercase">
				<tr>
					<th class="w-1/6 border-r border-[#a71d1d] px-6 py-3 text-left">Nombre</th>
					<th class="w-2/5 border-r border-[#a71d1d] px-6 py-3 text-left">Descripción</th>
					<th class="w-1/6 border-r border-[#a71d1d] px-6 py-3 text-left">Autor</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Precio</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Stock</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Estado</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Acciones Estado</th>
					<th class="px-6 py-3 text-left">Edición</th>
				</tr>
			</thead>
			<tbody>
				{#if $productos.length > 0}
					{#each paginatedItems as producto}
						<ItemProducto {producto} />
					{/each}
				{:else}
					<tr>
						<td colspan="8" class="py-6 text-center text-gray-500 italic">
							No hay productos registrados
						</td>
					</tr>
				{/if}
			</tbody>
		</Table>
	</div>
</div>
{#if $productos && $productos.length > $pageSize}
	<div class="d-flex justify-content-center mt-4">
		<LightPaginationNav
			totalItems={$productos?.length || 0}
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
</style>
