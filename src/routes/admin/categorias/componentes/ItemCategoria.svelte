<script>
  import BotonEstado from "../../../../componentesGenericos/BotonEstado.svelte";
  import BotonModalGenerico from "../../../../componentesGenericos/BotonModalGenerico.svelte";
  import EditarCategoria from "./EditarCategoria.svelte";
  import { actualizarCategoriasAdmin } from "$lib/store/categoriaAdminStore";

  export let categoria;
  let endpoint = "/categoria";
</script>

<tr class="hover:bg-red-50 transition-all text-sm text-gray-800">
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle">
    {categoria.CAT_NOMBRE}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle">
    {categoria.CAT_DECRIPCION}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <span class={`text-sm font-semibold px-3 py-1 rounded-full 
      ${categoria.ESTADO === 'ACT' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'}`}>
      {categoria.ESTADO === 'ACT' ? 'Activo' : 'Inactivo'}
    </span>
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <BotonEstado
      estado={categoria.ESTADO}
      id={categoria.CAT_ID_PK}
      endpoint={endpoint}
      callback={actualizarCategoriasAdmin}
    />
  </td>
  <td class="px-6 py-4 border-t border-gray-300 align-middle text-center">
    <BotonModalGenerico
      componente={EditarCategoria}
      textoBoton={"Editar"}
      titulo={"Editar Categoría"}
      props={{ categoria }}
    />
  </td>
</tr>
<style>


  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  tr:hover {
    background-color: #f3f4f6;
  }

  td:first-child {
    font-weight: 500;
  }

  th {
    font-weight: 600;
    font-size: 1rem;
  }
</style>
