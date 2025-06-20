<script>
  import { Table } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { actualizarProductosAdmin, productos } from "$lib/store/productosStore";
  import ItemProducto from "./componentes/ItemProducto.svelte";
  import BuscadorGenerico from "../../../componentesGenericos/BuscadorGenerico.svelte";
  import BotonModalGenerico from "../../../componentesGenericos/BotonModalGenerico.svelte";
  import CrearProducto from "./componentes/CrearProducto.svelte";

  let params = [
    { llave: "Nombre", valor: "Nombre" },
    { llave: "Autor", valor: "Autor" }
  ];

  onMount(actualizarProductosAdmin);
</script>

<!-- Contenedor principal -->
<div class="max-w-7xl mx-auto px-4 mt-8 space-y-6">
  <!-- Buscador + Botón -->
  <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
    <BuscadorGenerico params={params} callback={actualizarProductosAdmin} />
    <BotonModalGenerico
      componente={CrearProducto}
      textoBoton={"Crear Producto"}
      tipo={"Titulo"}
    />
  </div>

  <!-- Tabla -->
  <div class="bg-white border border-gray-300 rounded-2xl shadow-xl animate-fade-in">
    <Table class="w-full text-sm text-gray-800 table-auto">
    <thead class="bg-[#B22222] text-white uppercase tracking-wide">
      <tr>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d] w-1/6">Nombre</th>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d] w-2/5">Descripción</th>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d] w-1/6">Autor</th>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Precio</th>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Stock</th>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Estado</th>
        <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Acciones Estado</th>
        <th class="px-6 py-3 text-left">Edición</th>
      </tr>
    </thead>
      <tbody>
        {#if $productos.length > 0}
          {#each $productos as producto}
            <ItemProducto producto={producto} />
          {/each}
        {:else}
          <tr>
            <td colspan="8" class="text-center py-6 text-gray-500 italic">
              No hay productos registrados
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
</style>
