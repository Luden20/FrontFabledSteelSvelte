<script>
	import { API } from '$lib/service/apis.service';
	import { actualizarCategoriasAdmin } from '$lib/store/categoriaAdminStore';
	import { createEventDispatcher } from 'svelte';
	import { toasts } from 'svelte-toasts';

	const dispatch = createEventDispatcher();

	export let categoria;
	let resultado = null;

	function callback(respuesta, error) {
		resultado = error ? { mensaje: 'Error al enviar los datos.', exito: false } : respuesta;
		actualizarCategoriasAdmin();
		if (resultado.exito) {
			dispatch('success', { mensaje: resultado.mensaje });
		} else {
			toasts.add({
				title: 'Error',
				description: resultado.mensaje,
				duration: 3000,
				placement: 'bottom-right',
				type: 'info',
				theme: 'dark',
				showProgress: true
			});
		}
	}

	const handleSubmit = API.FORMCALL('/categoria', 'PUT', callback, true);
</script>

<div class="d-flex justify-content-center">
	<form
		on:submit={handleSubmit}
		class="registro-form needs-validation"
		style="max-width: 500px; width: 100%;"
		
	>
		<input type="hidden" name="CAT_ID_PK" value={categoria.CAT_ID_PK} />
		<input type="hidden" name="ESTADO" value={categoria.ESTADO} />

		<div class="mb-3">
			<label for="CAT_NOMBRE" class="form-label">Nombre</label>
			<input
				class="form-control"
				id="CAT_NOMBRE"
				name="CAT_NOMBRE"
				type="text"
				bind:value={categoria.CAT_NOMBRE}
				required
			/>
		</div>

		<div class="mb-3">
			<label for="CAT_DECRIPCION" class="form-label">Descripción</label>
			<input
				class="form-control"
				id="CAT_DECRIPCION"
				name="CAT_DECRIPCION"
				type="text"
				bind:value={categoria.CAT_DECRIPCION}
				required
			/>
		</div>

		{#if !resultado || !resultado.exito}
			<div class="d-flex justify-content-center mt-4">
				<input type="submit" value="Guardar Cambios" class="btn-fabled px-5" />
			</div>
		{/if}
	</form>
</div>

<style>
	.registro-form {
		padding: 0.5rem;
		font-family: 'Lora', serif;
	}

	.form-label {
		font-family: 'Cinzel', serif;
		font-weight: bold;
		color: #b22222;
	}

	.form-control {
		background-color: #fff;
		color: #000;
		border: 1px solid #b22222;
		border-radius: 0.5rem;
	}

	.form-control::placeholder {
		color: #777;
	}

	.form-control:focus {
		border-color: #b22222;
		box-shadow: 0 0 0 0.25rem rgba(178, 34, 34, 0.25);
	}

	.btn-fabled {
		border: none;
		background-color: #b22222;
		color: #fff;
		border-radius: 999px;
		font-family: 'Cinzel', serif;
		font-weight: bold;
		transition: all 0.3s ease;
	}

	.btn-fabled:hover {
		background-color: #7b1e1e;
		transform: scale(1.05);
	}
</style>
