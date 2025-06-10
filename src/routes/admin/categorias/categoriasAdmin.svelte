<script>
    import ItemCategoria from "./componentes/ItemCategoria.svelte";
    import { onMount } from "svelte";
    import { Table } from 'flowbite-svelte';
    import { categorias,actualizarCategoriasAdmin } from "$lib/store/categoriaAdminStore";
    import BotonModalGenerico from "../../../componentesGenericos/BotonModalGenerico.svelte";
    import CrearCategoria from "./componentes/CrearCategoria.svelte";
    onMount(actualizarCategoriasAdmin)
</script>
      <BotonModalGenerico
        componente={CrearCategoria}
        textoBoton={"Crear"}
        titulo={"Crear categoria"}
      />
<div class="table"><Table id="table">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Descripcion</th>
      <th>Estado</th>
      <th>Acciones Estado</th>
      <th>Edicion</th>
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
</Table></div>

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


  </style>