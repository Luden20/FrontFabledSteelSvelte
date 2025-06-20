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
    lanzarToast("Borrado exitoso", true);
  }

  async function desborrar() {
    await API.UNDELETE(endpoint, id, true);
    callback();
    lanzarToast("Desborrado exitoso", true);
  }
</script>

{#if estado === 'ACT'}
  <button class="btn-rojo" on:click={borrar}>Borrar</button>
{:else}
  <button class="btn-verde" on:click={desborrar}>Desborrar</button>
{/if}

<style>
  button {
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.25s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    color: white;
    cursor: pointer;
    border: none;
  }

  .btn-rojo {
    background-color: #B22222;
  }

  .btn-rojo:hover {
    background-color: #a11d1d;
    box-shadow: 0 0 0 2px rgba(178, 34, 34, 0.3);
    transform: scale(1.05);
  }

  .btn-verde {
    background-color: #15803d;
  }

  .btn-verde:hover {
    background-color: #166534;
    box-shadow: 0 0 0 2px rgba(21, 128, 61, 0.3);
    transform: scale(1.05);
  }

  button:focus {
    outline: none;
    transform: scale(0.98);
  }
</style>
