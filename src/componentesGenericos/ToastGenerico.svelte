<script>
	import { onMount } from 'svelte';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
    export let mensaje;
    export let exito;
	const showToast = () => {
		toasts.add({
			title: exito?'Exito':'Error',
			description: mensaje,
			duration: 3000,
			placement: 'bottom-right',
			type: exito ? "success" : "info",
			theme: 'dark',
			showProgress: true
		});
	};

	onMount(() => {
		showToast();
	});
</script>
<ToastContainer let:data={data}>
	<FlatToast {data} />
</ToastContainer>
