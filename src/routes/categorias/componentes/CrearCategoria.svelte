<script>
  import { onMount } from "svelte";
  import { API } from "../../../service/apis.service";
  import { categorias,actualizarCategoriasAdmin } from "../../../store/categoriaAdminStore"
  import { createEventDispatcher } from "svelte";
  import Resultado from "../../../componentesGenericos/Resultado.svelte";
  let abierto = false;
  let resultado = null;

  function callback(respuesta, error) {
    resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
    actualizarCategoriasAdmin();
  }
    const handleSubmit = API.FORMCALL("/categoria",'POST',callback,true);

</script>


  <form on:submit={handleSubmit}>
    <label>
      Nombre
      <input name="CAT_NOMBRE" type="text" />
    </label>
    <label>
      Descripción
      <input name="CAT_DECRIPCION" type="text" />
    </label>
    <label>
      Estado
      <input name="ESTADO" type="text" />
    </label>
    <button type="submit">ENVIAR</button>
  </form>

  {#if resultado}
  <Resultado mensaje={resultado.mensaje}/>
  {/if}
