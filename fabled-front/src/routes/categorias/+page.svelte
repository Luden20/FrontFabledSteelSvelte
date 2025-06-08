<script>
    //esta funcion encapsula todo para formalarios simples
    import { manejarEnvio } from "../../service/forms.service";
    let resultado = null;

    function callback(respuesta, error) {
        if (error) 
        {
            resultado = { mensaje: "Error al enviar los datos." };
        } 
        else 
        {
            resultado = respuesta;
        }
  }
</script>
<form on:submit={manejarEnvio("https://backendrestfableedsteel.runasp.net/admin/categoria", callback)}>
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
  <h5>{resultado.mensaje}</h5>
{/if}
