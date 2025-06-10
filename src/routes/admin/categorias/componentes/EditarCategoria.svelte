<script>
  import { onMount } from "svelte";
  import { API } from "$lib/service/apis.service";
  import { categorias,actualizarCategoriasAdmin } from "$lib/store/categoriaAdminStore"
  import { createEventDispatcher } from "svelte";
  import Resultado from "../../../../componentesGenericos/Resultado.svelte";
  import ToastGenerico from "../../../../componentesGenericos/ToastGenerico.svelte";
  export let categoria;
  let abierto = false;
  let resultado = null;

  function callback(respuesta, error) {
    resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
    actualizarCategoriasAdmin();
  }
    const handleSubmit = API.FORMCALL("/categoria",'PUT',callback,true);

</script>
  <form on:submit={handleSubmit}>
    <input name="CAT_ID_PK" type="hidden" bind:value={categoria.CAT_ID_PK}/>
    <input name="ESTADO" type="hidden" bind:value={categoria.ESTADO}/>
    <label>
      Nombre
      <input name="CAT_NOMBRE" type="text" bind:value={categoria.CAT_NOMBRE}/>
    </label>
    <label>
      Descripción
    <input name="CAT_DECRIPCION" type="text" bind:value={categoria.CAT_DECRIPCION}/>
    </label>
    {#if !resultado}
        <button type="submit">ENVIAR</button>
    {/if}  </form>

  {#if resultado}
  <ToastGenerico
   mensaje={resultado.mensaje}
   exito={resultado.exito}/>
  {/if}
