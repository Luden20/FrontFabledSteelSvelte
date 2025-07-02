<script>
	import { onMount } from 'svelte';
	import { Table } from 'flowbite-svelte';
	import ItemCuenta from './componentes/ItemCuenta.svelte';
	import { cuentas, actualizarCuentas } from '$lib/store/cuentasStore';
	import BuscadorGenerico from '../../../componentesGenericos/BuscadorGenerico.svelte';
	import { paginate, LightPaginationNav } from 'svelte-paginate';
	import { pageSize, actualizarPageSize } from '$lib/store/pageSizeStore';
	import DropdownPageSize from '../../../componentesGenericos/DropdownPageSize.svelte';
	let buscar = [
		{ llave: 'cedula', valor: 'Cédula' },
		{ llave: 'nombre', valor: 'Nombre' }
	];

	onMount(actualizarCuentas);
	let currentPage = 1;
	$: paginatedItems =
		$cuentas && Array.isArray($cuentas)
			? paginate({ items: $cuentas, pageSize: $pageSize, currentPage })
			: [];
	$: {
		if ($cuentas && $cuentas.length > 0) {
			const totalPages = Math.ceil($cuentas.length / $pageSize);
			if (currentPage > totalPages) {
				currentPage = totalPages; // O vuelve a 1 si prefieres
			}
		}
	}
</script>

<!-- Contenedor principal -->
<div class="mx-auto mt-8 max-w-7xl space-y-6 px-4">
	<!-- Buscador -->
	<div class="flex items-center justify-between">
		<DropdownPageSize />

		<BuscadorGenerico params={buscar} callback={actualizarCuentas} />
	</div>

	<!-- Tabla -->
	<div class="animate-fade-in rounded-2xl border border-gray-300 bg-white shadow-xl">
		<Table class="w-full table-auto text-sm text-gray-800">
			<thead class="bg-[#B22222] tracking-wide text-white uppercase">
				<tr>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Cliente</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Cédula</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Celular</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Creación</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Email</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Estado</th>
					<th class="border-r border-[#a71d1d] px-6 py-3 text-left">Acciones Estado</th>
					<th class="px-6 py-3 text-left">Edición</th>
				</tr>
			</thead>
			<tbody>
				{#if $cuentas.length > 0}
					{#each paginatedItems as cuenta}
						<ItemCuenta {cuenta} />
					{/each}
				{:else}
					<tr>
						<td colspan="9" class="py-6 text-center text-gray-500 italic">
							No hay cuentas registradas
						</td>
					</tr>
				{/if}
			</tbody>
		</Table>
	</div>
</div>
{#if $cuentas && $cuentas.length > $pageSize}
	<div class="d-flex justify-content-center mt-4">
		<LightPaginationNav
			totalItems={$cuentas?.length || 0}
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
