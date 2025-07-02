<script>
	import { toasts } from 'svelte-toasts';
	export let mensaje;
	export let exito;

	$: if (mensaje && exito !== undefined) {
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
