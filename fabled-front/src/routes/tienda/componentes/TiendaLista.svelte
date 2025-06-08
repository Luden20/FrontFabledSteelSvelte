<script>
  import TiendaItem from "./TiendaItem.svelte";
  import { onMount } from 'svelte';
  import { productosService } from "../../../service/productos.service";

  export let param = "";
  export let buscado = "";

  let productos = null;

  async function cargarProductos() {
    productos = await productosService.ObtenerProductos(param, buscado);
  }

  onMount(cargarProductos);

  $: if (param && buscado) {
    cargarProductos(); 
  }
</script>

{#if productos}

  <div class="container mt-4">
    <div class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5">
      {#each productos as producto}
        <TiendaItem item={producto} />
      {/each}
    </div>
  </div>
{:else}
  <p class="text-center mt-5">Cargando resultados...</p>
{/if}
