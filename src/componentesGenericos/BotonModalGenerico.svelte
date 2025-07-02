<script>
	import ModalGenerico from './ModalGenerico.svelte';
	import { toasts } from 'svelte-toasts';

	export let componente;
	export let textoBoton;
	export let titulo;
	export let props = {};
	export let tipo = 'normal';
	let mostrarModal = false;

	function abrir() {
		mostrarModal = true;
	}

	function cerrar() {
		mostrarModal = false;
	}

	function handleSuccess(event) {
		mostrarModal = false;
		const detalle = event?.detail || {};
		const mensaje = detalle.mensaje || 'Operación exitosa';
		setTimeout(() => {
			toasts.add({
				title: 'Éxito',
				description: mensaje,
				duration: 3000,
				placement: 'bottom-right',
				type: 'success',
				theme: 'dark',
				showProgress: true
			});
		}, 0);
	}
</script>

<button class="btn-facha" on:click={abrir}>
	{textoBoton}
</button>

<ModalGenerico
	mostrar={mostrarModal}
	on:close={cerrar}
	on:success={handleSuccess}
	{titulo}
	{componente}
	{props}
/>

<style>
	.btn-facha {
		background-color: white;
		color: black;
		border: 2px solid #b22222;
		font-size: 0.875rem;
		font-weight: 600;
		padding: 0.5rem 1.25rem;
		border-radius: 0.5rem;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.btn-facha:hover {
		transform: scale(1.05);
		border-color: #a11d1d;
		box-shadow: 0 2px 8px rgba(178, 34, 34, 0.2);
	}

	.btn-facha:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(178, 34, 34, 0.4);
	}
</style>
