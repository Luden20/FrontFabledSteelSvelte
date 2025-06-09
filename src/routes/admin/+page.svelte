<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>
<script>
  import FacturasAdmin from "./facturas/facturasAdmin.svelte";
  import CategoriasAdmin from "./categorias/categoriasAdmin.svelte";

  let tabs = [
    { nombre: "Facturas", componente: FacturasAdmin },
    { nombre: "Categorías", componente: CategoriasAdmin }
  ];

  let actual = tabs[0].componente;
</script>

<div class="flex space-x-4 border-b mb-4">
  {#each tabs as tab}
    <button
      class="px-4 py-2 border-b-2 transition-all duration-300 hover:text-blue-600"
      class:border-blue-600={actual === tab.componente}
      on:click={() => actual = tab.componente}>
      {tab.nombre}
    </button>
  {/each}
</div>

<div class="transition-opacity duration-300 animate-fade">
  <svelte:component this={actual} />
</div>

<style>
  @keyframes fade {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
  .animate-fade {
    animation: fade 0.3s ease-in-out;
  }
</style>
