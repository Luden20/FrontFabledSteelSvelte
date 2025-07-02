<script>
	import { facturas, actualizarFacturasAdmin } from '$lib/store/facturaAdminStore';
	import { Table } from 'flowbite-svelte';
	import BuscadorGenerico from '../../../componentesGenericos/BuscadorGenerico.svelte';
	import { onMount } from 'svelte';
	import ItemFacturas from './compontentes/ItemFacturas.svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { pageSize, actualizarPageSize } from '$lib/store/pageSizeStore';
	import DropdownPageSize from '../../../componentesGenericos/DropdownPageSize.svelte';
	let params = [
		{ llave: 'cedula', valor: 'Cédula' },
		{ llave: 'Nfactura', valor: '# de Factura' }
	];
	let currentPage = 1;
	$: {
		if ($facturas && Array.isArray($facturas)) {
			const totalPages = Math.ceil($facturas.length / $pageSize);
			if (currentPage > totalPages) {
				currentPage = totalPages || 1;
			}
		}
	}
	$: paginatedItems =
		$facturas && Array.isArray($facturas)
			? paginate({ items: $facturas, pageSize: $pageSize, currentPage })
			: [];

	onMount(actualizarFacturasAdmin);
</script>

<!-- Contenedor principal -->
<div class="mx-auto mt-8 max-w-7xl space-y-6 px-4">
	<div class="flex items-center justify-between">
		<DropdownPageSize />

		<BuscadorGenerico {params} callback={actualizarFacturasAdmin} />
	</div>

	<!-- Tabla -->
	<div class="animate-fade-in overflow-auto rounded-2xl border border-gray-300 bg-white shadow-xl">
		<Table class="w-full min-w-[950px] table-auto text-sm text-gray-800">
			<thead class="bg-[#B22222] tracking-wide text-white uppercase">
				<tr>
					<th class="border-r border-[#a71d1d] px-6 py-3">Num.</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Cédula</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Nombre</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Fecha</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Subtotal</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">IVA</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Total</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Estado</th>
					<th class="border-r border-[#a71d1d] px-6 py-3">Edición</th>
					<th class="px-6 py-3">Detalle</th>
				</tr>
			</thead>
			<tbody>
				{#if $facturas.length > 0}
					{#each paginatedItems as factura}
						<ItemFacturas {factura} />
					{/each}
				{:else}
					<tr>
						<td colspan="10" class="py-6 text-center text-gray-500 italic">
							No hay facturas registradas
						</td>
					</tr>
				{/if}
			</tbody>
		</Table>
	</div>
</div>
{#if $facturas && $facturas.length > $pageSize}
	<div class="d-flex justify-content-center mt-4">
		<LightPaginationNav
			totalItems={$facturas?.length || 0}
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

	/* Responsive scroll si se pasa el ancho */
	.overflow-auto::-webkit-scrollbar {
		height: 8px;
	}

	.overflow-auto::-webkit-scrollbar-thumb {
		background-color: #b22222;
		border-radius: 4px;
	}

	.overflow-auto::-webkit-scrollbar-track {
		background-color: #eee;
	}
</style>
