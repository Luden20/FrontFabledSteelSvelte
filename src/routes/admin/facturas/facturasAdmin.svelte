<script>
  import { facturas, actualizarFacturasAdmin } from "$lib/store/facturaAdminStore";
  import { Table } from "flowbite-svelte";
  import BuscadorGenerico from "../../../componentesGenericos/BuscadorGenerico.svelte";
  import { onMount } from "svelte";
  import ItemFacturas from "./compontentes/ItemFacturas.svelte";

  let params = [
    { llave: "cedula", valor: "Cédula" },
    { llave: "Nfactura", valor: "# de Factura" }
  ];

  onMount(actualizarFacturasAdmin);
</script>

<!-- Contenedor principal -->
<div class="max-w-7xl mx-auto px-4 mt-8 space-y-6">
  <!-- Buscador -->
  <BuscadorGenerico
    params={params}
    callback={actualizarFacturasAdmin}
  />

  <!-- Tabla -->
  <div class="bg-white border border-gray-300 rounded-2xl shadow-xl overflow-auto animate-fade-in">
    <Table class="w-full text-sm text-gray-800 table-auto min-w-[950px]">
      <thead class="bg-[#B22222] text-white uppercase tracking-wide">
        <tr>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Numero</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Cédula</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Nombre</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Fecha</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Subtotal</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">IVA</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Total</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Estado</th>
          <th class="px-6 py-3 border-r border-[#a71d1d]">Edición</th>
          <th class="px-6 py-3">Detalle</th>
        </tr>
      </thead>
      <tbody>
        {#if $facturas.length > 0}
          {#each $facturas as factura}
            <ItemFacturas factura={factura} />
          {/each}
        {:else}
          <tr>
            <td colspan="10" class="text-center py-6 text-gray-500 italic">
              No hay facturas registradas
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

  /* Responsive scroll si se pasa el ancho */
  .overflow-auto::-webkit-scrollbar {
    height: 8px;
  }

  .overflow-auto::-webkit-scrollbar-thumb {
    background-color: #B22222;
    border-radius: 4px;
  }

  .overflow-auto::-webkit-scrollbar-track {
    background-color: #eee;
  }
</style>
