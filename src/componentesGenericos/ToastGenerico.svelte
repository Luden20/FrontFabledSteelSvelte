<script>
	import { toasts } from 'svelte-toasts';
	import { tick } from 'svelte';
	export let mensaje;
	export let exito;

	let trigger = 0;

	$: trigger, showToast(); // se ejecuta cada vez que trigger cambie

	// Fuerza reinicio si se pasa el mismo mensaje/exito
	$: if (mensaje || exito !== undefined) {
		trigger += 1;
	}

	function showToast() {
		const esExito = exito === true || exito === 'Exito' || exito === 'true';
		toasts.add({
			title: esExito ? 'Éxito' : 'Error',
			description: mensaje,
			duration: 3000,
			placement: 'bottom-right',
			type: esExito ? 'success' : 'info',
			theme: 'dark',
			showProgress: true
		});
	}
</script>
