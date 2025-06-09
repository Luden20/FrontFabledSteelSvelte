<script>
    import { API } from "../service/apis.service";
    export let estado;
    export let id;
    export let endpoint;
    let url=null;
    export let callback=()=>{};
    async function borrar()
    {
        url=`${endpoint}/${id}`;
        await API.DELETE(url,true);
        callback();
    }
    async function desborrar()
    {
        await API.UNDELETE(endpoint,id,true);
        callback();
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