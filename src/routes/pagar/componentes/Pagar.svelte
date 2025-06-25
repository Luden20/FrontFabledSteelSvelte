<script>
	import { onMount } from 'svelte';
	import { FacturaService } from '$lib/service/factura.service';
	import InfoBanco from './InfoBanco.svelte';
	import CuentasItem from './CuentasItem.svelte';
	import ToastGenerico from '../../../componentesGenericos/ToastGenerico.svelte';
	export let cedula;
	export let total;
	export let carrito;
	export let idCliente;

	let cuentaSeleccionada = null;
	let info = null;
	let res = null;
	let mensaje = null;
	let exito = null;
	let porPagar = true;
	onMount(async () => {
		info = await FacturaService.obtenerCuenta(cedula);
	});

	function seleccionarCuenta(event) {
		cuentaSeleccionada = event.detail;
	}

	async function pagar() {
		if (cuentaSeleccionada) {
			const payload = {
				carritoList: carrito,
				cuenta: cuentaSeleccionada.cuenta_id,
				idCliente: idCliente
			};
			res = await FacturaService.Facturar(idCliente, carrito, cuentaSeleccionada.cuenta_id);
			mensaje = res.mensaje;
			exito = res.success;
			porPagar = false;
			localStorage.setItem('carrito', JSON.stringify([]));
		}
	}
</script>

{#if info && info.error}
	<h5 class="text-danger mt-3">No tiene cuenta, por favor contacte al banco</h5>
{:else if info}
	<InfoBanco cliente={info} />
	<div class="cliente-info-container mb-4">
		<h4 class="text-warning mb-3 text-center">Información del Cliente desde el banco</h4>

		{#each info.Cuentas as cuenta (cuenta.cuenta_id)}
			<CuentasItem
				{cuenta}
				deuda={total}
				seleccionado={cuentaSeleccionada?.cuenta_id === cuenta.cuenta_id}
				on:seleccionar={seleccionarCuenta}
			/>
		{/each}
	</div>

	<div class="mt-4 text-center">
		{#if porPagar}
			<button class="btn btn-success" on:click={pagar} disabled={!cuentaSeleccionada}>
				{#if cuentaSeleccionada}
					Pagar con cuenta {cuentaSeleccionada.cuenta_id}
				{:else}
					Selecciona una cuenta para pagar
				{/if}
			</button>
		{/if}
	</div>
	{#if mensaje}
		<ToastGenerico {mensaje} {exito} />
		<a href="/tienda" class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;"
			>Volver a la tienda</a
		>
	{/if}
{:else}
	<h5 class="text-danger mt-3">Cargando</h5>
{/if}

<style>
	h2,
	h3,
	h4,
	h5,
	.modal-title {
		font-family: 'Cinzel', serif;
		color: #b22222;
	}

	.shopping-cart {
		background-color: rgba(255, 255, 255, 0.95);
		border: 2px solid #b22222;
		border-radius: 1rem;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
		color: #000;
	}

	.list-group-item {
		background-color: #ffffff;
		border: 1px solid #b22222;
		color: #000;
		border-radius: 0.5rem;
	}

	.cliente-info-container {
		background-color: rgba(255, 255, 255, 0.95);
		padding: 1rem;
		border: 2px solid #b22222;
		border-radius: 0.5rem;
		color: #000;
	}

	.text-warning,
	.text-light,
	.border-warning {
		color: #b22222 !important;
		border-color: #b22222 !important;
	}

	/* Tipografía */
	strong {
		color: #000;
	}
</style>
