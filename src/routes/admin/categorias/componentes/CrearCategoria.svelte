<script>
	import { API } from '$lib/service/apis.service';
	import { actualizarCategoriasAdmin } from '$lib/store/categoriaAdminStore';
	import ToastGenerico from '../../../../componentesGenericos/ToastGenerico.svelte';

	let resultado = null;

	function callback(respuesta, error) {
		resultado = error ? { mensaje: 'Error al enviar los datos.' } : respuesta;
		actualizarCategoriasAdmin();
	}

	const handleSubmit = API.FORMCALL('/categoria', 'POST', callback, true);
</script>

<div class="container mt-3">
	<div class="col-md-6 mx-auto">
		<form on:submit={handleSubmit} class="registro-form needs-validation" novalidate>
			<div class="mb-3">
				<label for="CAT_NOMBRE" class="form-label">Nombre</label>
				<input class="form-control" id="CAT_NOMBRE" name="CAT_NOMBRE" type="text" required />
			</div>

			<div class="mb-3">
				<label for="CAT_DECRIPCION" class="form-label">Descripción</label>
				<input
					class="form-control"
					id="CAT_DECRIPCION"
					name="CAT_DECRIPCION"
					type="text"
					required
				/>
			</div>

			<div class="mb-3">
				<label for="ESTADO" class="form-label">Estado</label>
				<input class="form-control" id="ESTADO" name="ESTADO" type="text" required />
			</div>

			{#if !resultado || resultado.exito != 'Exito'}
				<div class="d-flex justify-content-center mt-4">
					<input type="submit" value="Guardar" class="btn-fabled px-5" />
				</div>
			{/if}
		</form>

		{#if resultado}
			<ToastGenerico mensaje={resultado.mensaje} exito={resultado.exito} />
		{/if}
	</div>
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
