<script>
	import { toasts } from 'svelte-toasts';
	export let mensaje;
	export let exito;

	let ultimaLlamada = 0;

	$: {
		if (mensaje || exito !== undefined) {
			// Forzamos una pequeña espera para asegurarnos que incluso valores iguales se reconozcan como cambio
			const ahora = Date.now();
			if (ahora - ultimaLlamada > 100) {
				// evita múltiples toasts simultáneos
				ultimaLlamada = ahora;

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
		}
	}
</script>
