<script>
	import { API } from '$lib/service/apis.service';
	import { onMount } from 'svelte';
	import { cuentas, actualizarCuentas } from '$lib/store/cuentasStore';
	import { toasts } from 'svelte-toasts';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let id;

	let resultado = null;
	let cuenta = null;

	onMount(async () => {
		cuenta = await API.GET(`/cuentaCliente/cue/${id}`, true);
	});

	function toDateOnly(isoString) {
		return isoString ? isoString.slice(0, 10) : '';
	}

	function transformarCuenta(datos) {
		const cuenta = {
			CUE_ID_PK: Number(datos.CUE_ID_PK),
			CLI_ID_PK: Number(datos.CLI_ID_PK),
			CUE_NOMBRE: datos.CUE_NOMBRE,
			CUE_APELLIDO: datos.CUE_APELLIDO,
			CUE_EMAIL: datos.CUE_EMAIL,
			CUE_PASSWORD: datos.CUE_PASSWORD,
			CUE_FECHA_NACIMIENTO: datos.CUE_FECHA_NACIMIENTO,
			CUE_FECHA_CREACION: datos.CUE_FECHA_CREACION || new Date().toISOString(),
			ESTADO: datos.ESTADO || 'ACT',
			cliente: {
				CLI_ID_PK: Number(datos.CLI_ID_PK),
				CLI_NOMBRE: datos.CLI_NOMBRE,
				CLI_APELLIDO: datos.CLI_APELLIDO,
				CLI_DIRECCION: datos.CLI_DIRECCION,
				CLI_CODIGO_POSTAL: datos.CLI_CODIGO_POSTAL,
				CLI_CELULAR: datos.CLI_CELULAR,
				CLI_CEDULA: datos.CLI_CEDULA,
				ESTADO: datos.ESTADO || 'ACT'
			}
		};
		return cuenta;
	}

	function callback(respuesta, error) {
		resultado = error ? { mensaje: 'Error al enviar los datos.', exito: false } : respuesta;
		actualizarCuentas();
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

	const handleSubmit = API.FORMCALL(`/cuentaCliente`, `PUT`, callback, true, transformarCuenta);
</script>

{#if cuenta}
	<form on:submit={handleSubmit} class="registro-form needs-validation" novalidate>
		<div class="row">
			<input type="hidden" name="CUE_ID_PK" value={cuenta.CUE_ID_PK} />
			<input type="hidden" name="CLI_ID_PK" value={cuenta.cliente?.CLI_ID_PK} />

			<div class="col-md-6 mb-3">
				<label for="CUE_NOMBRE" class="form-label">Nombre</label>
				<input
					class="form-control"
					id="CUE_NOMBRE"
					name="CUE_NOMBRE"
					type="text"
					value={cuenta.CUE_NOMBRE}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CUE_APELLIDO" class="form-label">Apellido</label>
				<input
					class="form-control"
					id="CUE_APELLIDO"
					name="CUE_APELLIDO"
					type="text"
					value={cuenta.CUE_APELLIDO}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CUE_FECHA_NACIMIENTO" class="form-label">Fecha de Nacimiento</label>
				<input
					class="form-control"
					id="CUE_FECHA_NACIMIENTO"
					name="CUE_FECHA_NACIMIENTO"
					type="date"
					value={toDateOnly(cuenta.CUE_FECHA_NACIMIENTO)}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CUE_FECHA_CREACION" class="form-label">Fecha de Creación</label>
				<input
					class="form-control"
					id="CUE_FECHA_CREACION"
					name="CUE_FECHA_CREACION"
					type="date"
					value={toDateOnly(cuenta.CUE_FECHA_CREACION)}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CUE_EMAIL" class="form-label">Email</label>
				<input
					class="form-control"
					id="CUE_EMAIL"
					name="CUE_EMAIL"
					type="email"
					value={cuenta.CUE_EMAIL}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CUE_PASSWORD" class="form-label">Password</label>
				<input
					class="form-control"
					id="CUE_PASSWORD"
					name="CUE_PASSWORD"
					type="text"
					value={cuenta.CUE_PASSWORD}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="ESTADO" class="form-label">Estado</label>
				<input
					class="form-control"
					id="ESTADO"
					name="ESTADO"
					type="text"
					value={cuenta.ESTADO}
					readonly
				/>
			</div>
		</div>

		<hr class="border-danger my-4" />

		<h5 class="text-danger">Datos del Cliente</h5>
		<div class="row">
			<div class="col-md-6 mb-3">
				<label for="CLI_NOMBRE" class="form-label">Nombre</label>
				<input
					class="form-control"
					id="CLI_NOMBRE"
					name="CLI_NOMBRE"
					type="text"
					value={cuenta.cliente?.CLI_NOMBRE}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CLI_APELLIDO" class="form-label">Apellido</label>
				<input
					class="form-control"
					id="CLI_APELLIDO"
					name="CLI_APELLIDO"
					type="text"
					value={cuenta.cliente?.CLI_APELLIDO}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CLI_DIRECCION" class="form-label">Dirección</label>
				<input
					class="form-control"
					id="CLI_DIRECCION"
					name="CLI_DIRECCION"
					type="text"
					value={cuenta.cliente?.CLI_DIRECCION}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CLI_CODIGO_POSTAL" class="form-label">Código Postal</label>
				<input
					class="form-control"
					id="CLI_CODIGO_POSTAL"
					name="CLI_CODIGO_POSTAL"
					type="text"
					value={cuenta.cliente?.CLI_CODIGO_POSTAL}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CLI_CELULAR" class="form-label">Celular</label>
				<input
					class="form-control"
					id="CLI_CELULAR"
					name="CLI_CELULAR"
					type="text"
					value={cuenta.cliente?.CLI_CELULAR}
				/>
			</div>
			<div class="col-md-6 mb-3">
				<label for="CLI_CEDULA" class="form-label">Cédula</label>
				<input
					class="form-control"
					id="CLI_CEDULA"
					name="CLI_CEDULA"
					type="text"
					value={cuenta.cliente?.CLI_CEDULA}
				/>
			</div>
		</div>

		{#if !resultado || !resultado.exito}
			<div class="d-flex justify-content-center mt-4">
				<input type="submit" value="Guardar Cambios" class="btn-fabled px-5" />
			</div>
		{/if}
	</form>
{:else}
	<h6>Cargando...</h6>
{/if}

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
