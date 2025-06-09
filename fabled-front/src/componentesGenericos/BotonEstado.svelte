<script>
	import { API } from '../service/apis.service';
	import { Button } from 'flowbite-svelte';
	export let estado;
	export let id;
	export let endpoint;
	let url = null;
	export let callback = () => {};
	async function borrar() {
		url = `${endpoint}/${id}`;
		await API.DELETE(url, true);
		callback();
	}
	async function desborrar() {
		await API.UNDELETE(endpoint, id, true);
		callback();
	}
</script>

{#if estado == 'ACT'}
	<Button color="failure" on:click={borrar}>Borrar</Button>
{:else}
	<Button color="info" on:click={desborrar}>Desborrar</Button>
{/if}
