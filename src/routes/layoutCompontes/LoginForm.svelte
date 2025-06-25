<script>
	import { authService } from '$lib/service/auth.service';
	import { initAuth } from '$lib/store/authStore.js';
	import { createEventDispatcher } from 'svelte';
	import { toasts } from 'svelte-toasts';

	const dispatch = createEventDispatcher();
	let user = '';
	let password = '';
	let resultado = null;

	function lanzarToast(mensaje, exito = true) {
		toasts.add({
			title: exito ? 'Éxito' : 'Error',
			description: mensaje,
			type: exito ? 'success' : 'error',
			duration: 3000,
			placement: 'bottom-right',
			theme: 'dark',
			showProgress: true
		});
	}

	async function enviarFormulario(e) {
		e.preventDefault();
		resultado = await authService.login(user, password);
		lanzarToast(resultado.mensaje, resultado.exito);
		if (resultado.exito) {
			initAuth();
			dispatch('logeado');
		}
	}
</script>

<form class="login-form" on:submit={enviarFormulario}>
	<div class="mb-3">
		<label for="usuario" class="form-label">Email</label>
		<input
			type="text"
			class="form-control"
			id="usuario"
			name="usuario"
			required
			placeholder="Ingrese su email"
			maxlength="30"
			bind:value={user}
		/>
	</div>

	<div class="mb-4">
		<label for="password" class="form-label">Contraseña</label>
		<input
			type="password"
			class="form-control"
			id="password"
			name="password"
			required
			placeholder="Ingrese su contraseña"
			maxlength="30"
			bind:value={password}
		/>
	</div>

	<div class="d-flex justify-content-center">
		<button type="submit" class="btn-fabled px-4">Ingresar</button>
	</div>
</form>

<style>
	.login-form {
		padding: 0.5rem;
		font-family: 'Lora', serif;
	}

	.titulo {
		text-align: center;
		color: #b22222;
		font-family: 'Cinzel', serif;
		font-weight: 600;
		margin-bottom: 1.5rem;
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
