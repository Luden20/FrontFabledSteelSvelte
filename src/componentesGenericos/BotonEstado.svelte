<script>
  import { API } from "$lib/service/apis.service";
  import { toasts } from "svelte-toasts"; 

  export let estado;
  export let id;
  export let endpoint;
  export let callback = () => {};

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

  async function borrar() {
    const url = `${endpoint}/${id}`;
    await API.DELETE(url, true);
    callback();
    lanzarToast("Borrado Exitoso", true);
  }

  async function desborrar() {
    await API.UNDELETE(endpoint, id, true);
    callback();
    lanzarToast("Desborrado Exitoso", true);
  }
</script>

{#if estado=='ACT'}
<button on:click={borrar}>Borrar</button>
{:else}
<button on:click={desborrar}>Desborrar</button>
{/if}
<style>
      button {
    background-color: #1f2937; /* gris oscuro */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #374151; /* gris más claro al pasar mouse */
  }

</style>