<script>
  import BotonEstado from "../../../../componentesGenericos/BotonEstado.svelte";
  export let producto;
  let endpoint="/productos"
  import { actualizarProductosAdmin } from "$lib/store/productosStore";
</script>

<tr>
  <td>{producto.PRD_NOMBRE}</td>
  <td>{producto.PRD_DESCRIPCION}</td>
  <td>{producto.PRD_AUTOR}</td>
  <td>{producto.PRD_PRECIO}</td>
  <td>{producto.PRD_STOCK}</td>
  <td>{producto.ESTADO}</td>
  <td><BotonEstado estado={producto.ESTADO} id={producto.PRD_ID_PK} endpoint={endpoint} callback={actualizarProductosAdmin}/></td>
  <td><!-- botones de edición u otro contenido aquí --></td>
</tr>
