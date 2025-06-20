<script>
  import { onMount } from "svelte";
  import { Table } from "flowbite-svelte";
  import ItemCuenta from "./componentes/ItemCuenta.svelte";
  import { cuentas, actualizarCuentas } from "$lib/store/cuentasStore";
  import BuscadorGenerico from "../../../componentesGenericos/BuscadorGenerico.svelte";

  let buscar = [
    { llave: "cedula", valor: "Cédula" },
    { llave: "nombre", valor: "Nombre" }
  ];

  onMount(actualizarCuentas);
</script>

<!-- Contenedor principal -->
<div class="max-w-7xl mx-auto px-4 mt-8 space-y-6">
  <!-- Buscador -->
  <div class="flex justify-between items-center">
    <BuscadorGenerico params={buscar} callback={actualizarCuentas} />
  </div>

  <!-- Tabla -->
  <div class="bg-white border border-gray-300 rounded-2xl shadow-xl animate-fade-in">
    <Table class="w-full text-sm text-gray-800 table-auto">
      <thead class="bg-[#B22222] text-white uppercase tracking-wide">
        <tr>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Cliente</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Cédula</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Dirección</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Celular</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Creación</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Email</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Estado</th>
          <th class="px-6 py-3 text-left border-r border-[#a71d1d]">Acciones Estado</th>
          <th class="px-6 py-3 text-left">Edición</th>
        </tr>
      </thead>
      <tbody>
        {#if $cuentas.length > 0}
          {#each $cuentas as cuenta}
            <ItemCuenta cuenta={cuenta} />
          {/each}
        {:else}
          <tr>
            <td colspan="9" class="text-center py-6 text-gray-500 italic">
              No hay cuentas registradas
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
