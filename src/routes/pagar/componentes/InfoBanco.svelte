<script>
	export let cliente;
</script>

<div class="cliente-info-container mb-4">
	<h4 class="text-warning mb-3 text-center">Información del Cliente desde el banco</h4>
	{#if cliente}
		<p><strong>Cédula:</strong> {cliente.cliente_id}</p>
		<p><strong>Nombre:</strong> {cliente.nombre}</p>
		<p><strong>Email:</strong> {cliente.email}</p>
	{:else}
		<p class="text-center">Cargando...</p>
	{/if}
</div>

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
