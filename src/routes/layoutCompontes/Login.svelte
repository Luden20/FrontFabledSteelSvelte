<script>
	import ModalGenerico from '../../componentesGenericos/ModalGenerico.svelte';
	import LoginForm from './LoginForm.svelte';
	export let mostrar = false;

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function cerrar() {
		mostrar = false;
		dispatch('close');
	}

	function handleLogin() {
		mostrar = false;
		dispatch('logeado');
	}
</script>

<ModalGenerico
	{mostrar}
	on:close={cerrar}
	on:logeado={handleLogin}
	titulo="Logearse"
	componente={LoginForm}
	tamanio="modal-custom-md"
/>
