<script>
  import ItemCategoria from "./componentes/ItemCategoria.svelte";
  import { onMount } from "svelte";
  import { Table } from "flowbite-svelte";
  import { categorias, actualizarCategoriasAdmin } from "$lib/store/categoriaAdminStore";
  import BotonModalGenerico from "../../../componentesGenericos/BotonModalGenerico.svelte";
  import CrearCategoria from "./componentes/CrearCategoria.svelte";

  onMount(actualizarCategoriasAdmin);
</script>

<!-- Contenedor principal -->
<div class="max-w-7xl mx-auto px-4 mt-8 space-y-6">
  <!-- Botón Crear -->
  <div class="flex justify-between items-center">
    <BotonModalGenerico
      componente={CrearCategoria}
      textoBoton="Crear"
      titulo="Crear categoría"
    />
  </div>

  <!-- Tabla de Categorías -->
  <div class="bg-white border border-gray-300 rounded-2xl shadow-xl animate-fade-in">
    <Table class="w-full text-sm text-gray-800 table-auto">
      <thead class="bg-[#B22222] text-white uppercase tracking-wide">
        <tr>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Nombre</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Descripción</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Estado</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Acciones Estado</th>
          <th class="px-6 py-3 text-left">Edición</th>
        </tr>
      </thead>
      <tbody>
        {#if $categorias.length > 0}
          {#each $categorias as categoria}
            <ItemCategoria categoria={categoria} />
          {/each}
        {:else}
          <tr>
            <td colspan="5" class="text-center py-6 text-gray-500 italic">
              No hay categorías registradas
            </td>
          </tr>
        {/if}
      </tbody>
    </Table>
  </div>
</div>

<style>
  .animate-fade-in {
    animation: fade-in 0.4s ease-in-out;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  th, td {
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    padding: 0.75rem;
    text-align: left;
    vertical-align: middle;
  }

  th {
    font-family: 'Cinzel', serif;
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #fdf2f2;
    transition: background-color 0.3s ease;
  }
</style>
