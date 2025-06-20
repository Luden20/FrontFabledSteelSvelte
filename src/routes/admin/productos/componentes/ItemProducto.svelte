<script>
  import BotonEstado from "../../../../componentesGenericos/BotonEstado.svelte";
  export let producto;
  let endpoint = "/productos";
  import { actualizarProductosAdmin } from "$lib/store/productosStore";
  import EditarProducto from "./EditarProducto.svelte";
  import BotonModalGenerico from "../../../../componentesGenericos/BotonModalGenerico.svelte";
</script>

<tr class="hover:bg-red-50 transition-all text-sm text-gray-800">
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle w-1/6">
    {producto.PRD_NOMBRE}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle break-words w-2/5">
    {producto.PRD_DESCRIPCION}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle w-1/6">
    {producto.PRD_AUTOR}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-green-700 font-semibold text-right">
    $ {producto.PRD_PRECIO.toFixed(2)}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <span class="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
      {producto.PRD_STOCK}
    </span>
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <span class={`text-sm font-semibold px-3 py-1 rounded-full 
      ${producto.ESTADO === 'ACT' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'}`}>
      {producto.ESTADO === 'ACT' ? 'Activo' : 'Inactivo'}
    </span>
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <BotonEstado
      estado={producto.ESTADO}
      id={producto.PRD_ID_PK}
      endpoint={endpoint}
      callback={actualizarProductosAdmin}
    />
  </td>
  <td class="px-6 py-4 border-t border-gray-300 align-middle text-center">
    <BotonModalGenerico
      componente={EditarProducto}
      titulo={"Editar Producto"}
      textoBoton={"Editar"}
      props={{ id: producto.PRD_ID_PK }}
    />
  </td>
</tr>

