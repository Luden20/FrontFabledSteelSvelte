<script>
	import FacturasAdmin from './facturas/facturasAdmin.svelte';
	import CategoriasAdmin from './categorias/categoriasAdmin.svelte';
	import CuentasAdmin from './cuentasAdmin/cuentasAdmin.svelte';
	import ProductosAdmin from './productos/productosAdmin.svelte';
	import Estadisticas from './estadisticas/estadisticas.svelte';
	import { authStore, initAuth } from '$lib/store/authStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let rol = null;
	authStore.subscribe(($auth) => {
		rol = $auth.rol;
	});

	onMount(() => {
		initAuth();
		if (rol !== 'admin') {
			goto('/tienda');
		}
	});

	let tabs = [
		{ nombre: 'Estadísticas', componente: Estadisticas, icono: 'bar-chart-line' },
		{ nombre: 'Productos', componente: ProductosAdmin, icono: 'box-seam' },
		{ nombre: 'Cuentas y clientes', componente: CuentasAdmin, icono: 'people-fill' },
		{ nombre: 'Facturas', componente: FacturasAdmin, icono: 'file-earmark-text' },
		{ nombre: 'Categorías', componente: CategoriasAdmin, icono: 'tags-fill' }
	];

	let tabActivo = tabs[0];
</script>

{#if rol == 'admin'}
	<div class="mx-auto w-full px-4 py-6">
		<!-- Tabs -->
		<div class="mb-6 flex flex-wrap justify-center gap-3 border-b-2 border-gray-300">
			{#each tabs as tab}
				<button
					class={`flex items-center gap-2 rounded-t-2xl border px-4 py-2 font-semibold shadow-sm transition-all duration-300 ease-in-out
          ${
						tab === tabActivo
							? 'scale-105 border-red-800 bg-red-800 text-white shadow-md'
							: 'border-gray-300 bg-white text-black hover:scale-105 hover:shadow-md'
					}`}
					on:click={() => (tabActivo = tab)}
				>
					<i class={`bi bi-${tab.icono}`}></i>
					{tab.nombre}
				</button>
			{/each}
		</div>

		<!-- Contenido -->
		<div class="animate-fade rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
			<svelte:component this={tabActivo.componente} />
		</div>
	</div>
{:else}
	<h1 class="mt-20 text-center text-3xl font-bold text-red-800">
		🚫 Acceso no autorizado. ¡Aquí solo entra el jefe!
	</h1>{/if}
<!-- Panel admin refinado -->

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
		rel="stylesheet"
	/>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	@keyframes fade {
		from {
			opacity: 0;
			transform: scale(0.97);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-fade {
		animation: fade 0.3s ease-in-out;
	}
</style>
