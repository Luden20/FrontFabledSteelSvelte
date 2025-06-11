<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>
<script>
  import FacturasAdmin from "./facturas/facturasAdmin.svelte";
  import CategoriasAdmin from "./categorias/categoriasAdmin.svelte";
  import CuentasAdmin from "./cuentasAdmin/cuentasAdmin.svelte";
  import ProductosAdmin from "./productos/productosAdmin.svelte";
  import Estadisticas from "./estadisticas/estadisticas.svelte";
  import { authStore,initAuth } from "$lib/store/authStore";
  import { onMount } from "svelte";
  let rol=null;
	import { goto } from "$app/navigation";
    authStore.subscribe(($auth) => {
    rol = $auth.rol;
  });

  // Refresca la información desde sessionStorage al montar
  onMount(() => {
    initAuth();
    if(rol!="admin")
    {
      goto("/tienda");
    }
  });

  let tabs = [
    {nombre:"Estadisticas",componente:Estadisticas},
    {nombre:"Productos",componente:ProductosAdmin},
    {nombre:"Cuentas y clientes",componente:CuentasAdmin},
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
