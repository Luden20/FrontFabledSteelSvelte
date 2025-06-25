<script>
	import { createEventDispatcher } from 'svelte';
	export let mostrar = false;
	export let titulo = 'Modal';
	export let componente = null;
	export let props = {};
	export let tamaño = 'xl';
	export let tamanio = 'modal-lg';

	const dispatch = createEventDispatcher();

	function cerrar() {
		dispatch('close');
	}
</script>

{#if mostrar}
	<div class="modal-backdrop custom-backdrop"></div>

	<div class="modal show d-block modal-wrapper" tabindex="-1" role="dialog">
		<div
			class="modal-dialog {tamanio} modal-dialog-centered"
			role="document"
			on:click|stopPropagation
		>
			<div class="modal-content custom-modal-content">
				<div class="modal-header custom-header">
					<h5 class="modal-title">{titulo}</h5>
					<button type="button" class="btn-close" on:click={cerrar}></button>
				</div>

				<div class="modal-body">
					{#if componente}
						<svelte:component this={componente} {...props} />
					{/if}
				</div>

				<div class="modal-footer custom-footer">
					<button class="btn btn-fabled-outline" on:click={cerrar}>Cerrar</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop.custom-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(2px);
		z-index: 1050 !important;
	}

	.modal {
		position: fixed;
		inset: 0;
		z-index: 1070 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-wrapper {
		position: fixed;
		inset: 0;
		z-index: 1070 !important;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
	}

	.custom-modal-content {
		border-radius: 1.25rem;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(6px);
		overflow: hidden;
	}

	.custom-header {
		background-color: #fff;
		border-bottom: 2px solid #b22222;
		padding: 1rem 1.5rem;
	}

	.custom-header .modal-title {
		font-family: 'Cinzel', serif;
		font-weight: 600;
		color: #b22222;
		font-size: 1.5rem;
	}

	.custom-footer {
		background-color: #f8f9fa;
		border-top: 1px solid #ddd;
		padding: 1rem;
		justify-content: center;
	}

	.btn-fabled-outline {
		border: 2px solid #b22222;
		background-color: transparent;
		color: #b22222;
		padding: 0.5rem 1.2rem;
		font-weight: 600;
		font-family: 'Lora', serif;
		border-radius: 999px;
		transition: all 0.2s ease-in-out;
	}

	.btn-fabled-outline:hover {
		background-color: #b22222;
		color: white;
		transform: scale(1.05);
	}
</style>
