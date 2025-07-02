<script>
	import { authService } from '$lib/service/auth.service';
	import { createEventDispatcher } from 'svelte';
	import ToastGenerico from '../../componentesGenericos/ToastGenerico.svelte';

	const dispatch = createEventDispatcher();
	let resultado = null;

	function callback(respuesta, error) {
		resultado = error ? { mensaje: 'Error al enviar los datos.', exito: false } : respuesta;

		resultado.key = Date.now();
	}

	function soloNumeros(event) {
		event.target.value = event.target.value.replace(/\D/g, '');
	}

	const handleSubmit = authService.register(callback);
</script>

<form on:submit={handleSubmit} class="registro-form needs-validation">
	<div class="row">
		<div class="col-md-6 mb-3">
			<label for="CUE_NOMBRE" class="form-label">Nombre</label>
			<input
				type="text"
				class="form-control"
				id="CUE_NOMBRE"
				name="CUE_NOMBRE"
				maxlength="30"
				required
				placeholder="Ingrese su nombre"
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CUE_APELLIDO" class="form-label">Apellido</label>
			<input
				type="text"
				class="form-control"
				id="CUE_APELLIDO"
				name="CUE_APELLIDO"
				maxlength="30"
				required
				placeholder="Ingrese su apellido"
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CUE_FECHA_NACIMIENTO" class="form-label">Fecha de nacimiento</label>
			<input
				type="date"
				class="form-control"
				id="CUE_FECHA_NACIMIENTO"
				name="CUE_FECHA_NACIMIENTO"
				max="2025-06-10"
				required
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CLI_CEDULA" class="form-label">Cédula</label>
			<input
				type="text"
				class="form-control"
				id="CLI_CEDULA"
				name="CLI_CEDULA"
				maxlength="10"
				pattern="[0-9]{10}"
				required
				placeholder="Ingrese su cédula"
				on:input={soloNumeros}
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CLI_CELULAR" class="form-label">Celular</label>
			<input
				type="tel"
				class="form-control"
				id="CLI_CELULAR"
				name="CLI_CELULAR"
				maxlength="10"
				pattern="[0-9]{(7, 15)}"
				required
				placeholder="Ingrese su celular"
				on:input={soloNumeros}
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CUE_EMAIL" class="form-label">Correo Electrónico</label>
			<input
				type="email"
				class="form-control"
				id="CUE_EMAIL"
				name="CUE_EMAIL"
				maxlength="30"
				required
				placeholder="Ingrese su correo"
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CUE_PASSWORD" class="form-label">Contraseña</label>
			<input
				type="password"
				class="form-control"
				id="CUE_PASSWORD"
				name="CUE_PASSWORD"
				maxlength="30"
				required
				placeholder="Ingrese su contraseña"
			/>
		</div>

		<div class="col-md-6 mb-3">
			<label for="CLI_DIRECCION" class="form-label">Dirección</label>
			<input
				type="text"
				class="form-control"
				id="CLI_DIRECCION"
				name="CLI_DIRECCION"
				maxlength="40"
				required
				placeholder="Ingrese su dirección"
			/>
		</div>

		<div class="col-md-6 mb-4">
			<label for="CLI_CODIGO_POSTAL" class="form-label">Código Postal</label>
			<input
				type="text"
				class="form-control"
				id="CLI_CODIGO_POSTAL"
				name="CLI_CODIGO_POSTAL"
				maxlength="5"
				pattern="[0-9]{(4, 5)}"
				required
				placeholder="Ingrese su código postal"
			/>
		</div>
	</div>

	<div class="d-flex justify-content-center">
		{#if !resultado || !resultado.exito}
			<button type="submit" class="btn-fabled px-5">Registrar</button>
		{/if}
	</div>
</form>

{#if resultado}
	{#key resultado.key}
		<ToastGenerico mensaje={resultado.mensaje} exito={resultado.exito} />
	{/key}
{/if}

<style>
	.registro-form {
		padding: 0.5rem;
		font-family: 'Lora', serif;
	}

	.titulo {
		text-align: center;
		color: #b22222;
		font-family: 'Cinzel', serif;
		font-weight: 600;
		margin-bottom: 1.8rem;
		font-size: 1.8rem;
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
