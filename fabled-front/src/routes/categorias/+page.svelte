<script>
    import CrearCategoria from "./componentes/CrearCategoria.svelte";
    import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
    import ItemCategoria from "./componentes/ItemCategoria.svelte";
    import { API } from "../../service/apis.service";
    import { onMount } from "svelte";
    import { Table } from 'flowbite-svelte';
    import { categorias,actualizarCategoriasAdmin } from "../../store/categoriaAdminStore";

    let mostrarModal = false;
    function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
    function abrirModal() {
        showModal = true;
    }
    onMount(actualizarCategoriasAdmin)
</script>
<button on:click={abrir}>Crear categoria</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Crear Categoría"
  componente={CrearCategoria}
  props={{ extraProp: "algo" }}
/>

<Table id="table">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Descripcion</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    {#if $categorias.length > 0}
      {#each $categorias as categoria}
        <ItemCategoria categoria={categoria} />
      {/each}
    {:else}
      <tr>
        <td colspan="3">CARGANDO...</td>
      </tr>
    {/if}
  </tbody>
</Table>
<style>  
    .table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 1rem;
  }

  thead {
    background-color: #1f2937; /* gris oscuro */
    color: white;
  }
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