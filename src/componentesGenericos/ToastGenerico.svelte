<script>
	import { toasts } from 'svelte-toasts';
	export let mensaje;
	export let exito;

	// Cada vez que mensaje o exito cambien, se dispara showToast.
	$: if (mensaje || exito !== undefined) {
		showToast();
	}

	function showToast() {
		const esExito = exito === true || exito === 'Exito' || exito === 'true';
		// Agrega un sufijo único (timestamp) para forzar la unicidad del mensaje
		toasts.add({
			title: esExito ? 'Éxito' : 'Error',
			description: `${mensaje} - ${Date.now()}`,
			duration: 3000,
			placement: 'bottom-right',
			type: esExito ? 'success' : 'info',
			theme: 'dark',
			showProgress: true
		});
	}
</script>
