<script>
  import FacturasAdmin from "./facturas/facturasAdmin.svelte";
  import CategoriasAdmin from "./categorias/categoriasAdmin.svelte";
  import CuentasAdmin from "./cuentasAdmin/cuentasAdmin.svelte";
  import ProductosAdmin from "./productos/productosAdmin.svelte";
  import Estadisticas from "./estadisticas/estadisticas.svelte";
  import { authStore, initAuth } from "$lib/store/authStore";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let rol = null;
  authStore.subscribe(($auth) => {
    rol = $auth.rol;
  });

  onMount(() => {
    initAuth();
    if (rol !== "admin") {
      goto("/tienda");
    }
  });

  let tabs = [
    { nombre: "Estadísticas", componente: Estadisticas, icono: "bar-chart-line" },
    { nombre: "Productos", componente: ProductosAdmin, icono: "box-seam" },
    { nombre: "Cuentas y clientes", componente: CuentasAdmin, icono: "people-fill" },
    { nombre: "Facturas", componente: FacturasAdmin, icono: "file-earmark-text" },
    { nombre: "Categorías", componente: CategoriasAdmin, icono: "tags-fill" }
  ];

  let tabActivo = tabs[0];
</script>

<!-- Panel admin refinado -->
<div class="max-w-6xl mx-auto px-4 py-6">
  <!-- Tabs -->
  <div class="flex flex-wrap justify-center gap-3 border-b-2 border-gray-300 mb-6">
    {#each tabs as tab}
      <button
        class={`flex items-center gap-2 px-4 py-2 rounded-t-2xl font-semibold border shadow-sm transition-all duration-300 ease-in-out
          ${
            tab === tabActivo
              ? 'bg-red-800 text-white border-red-800 shadow-md scale-105'
              : 'bg-white text-black border-gray-300 hover:shadow-md hover:scale-105'
          }`}
        on:click={() => tabActivo = tab}
      >
        <i class={`bi bi-${tab.icono}`}></i>
        {tab.nombre}
      </button>
    {/each}
  </div>

  <!-- Contenido -->
  <div class="bg-white shadow-lg rounded-lg p-6 animate-fade border border-gray-200">
    <svelte:component this={tabActivo.componente} />
  </div>
</div>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</svelte:head>

<style>
  @keyframes fade {
    from { opacity: 0; transform: scale(0.97); }
    to { opacity: 1; transform: scale(1); }
  }

  .animate-fade {
    animation: fade 0.3s ease-in-out;
  }
</style>
