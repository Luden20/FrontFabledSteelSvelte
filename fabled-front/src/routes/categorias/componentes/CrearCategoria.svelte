<script>
  import { onMount } from "svelte";
    import { API } from "../../../service/apis.service";
  import { createEventDispatcher } from "svelte";
  let abierto = false;
  let resultado = null;

  function callback(respuesta, error) {
    resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
  }
    const handleSubmit = API.POSTFORM("https://backendrestfableedsteel.runasp.net/admin/categoria", callback);

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
    <p>{resultado.mensaje}</p>
  {/if}
