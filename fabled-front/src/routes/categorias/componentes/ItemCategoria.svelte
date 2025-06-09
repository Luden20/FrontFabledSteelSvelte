<script>
  import BotonEstado from "../../../componentesGenericos/BotonEstado.svelte";
    export let categoria;
    let endpoint='/categoria'
    import { actualizarCategoriasAdmin } from "../../../store/categoriaAdminStore";
    import EditarCategoria from "./EditarCategoria.svelte";
    import BotonEditarCategoria from "./BotonEditarCategoria.svelte";
</script>
<tr>
    <td>{categoria.CAT_NOMBRE}</td>
    <td>{categoria.CAT_DECRIPCION}</td>
    <td>{categoria.ESTADO}</td>
    <td> 
      <BotonEstado 
        estado={categoria.ESTADO}
        id={categoria.CAT_ID_PK}
        endpoint={endpoint}
        callback={actualizarCategoriasAdmin}
      /></td>
      <td>
        <BotonEditarCategoria categoria={categoria}/>
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
