<script>
  import { paginate, LightPaginationNav } from 'svelte-paginate';
  import TiendaItem from "./TiendaItem.svelte";
  import { onMount } from 'svelte';
  import { API } from "$lib/service/apis.service";

  export let param = "";
  export let buscado = "";

  export let productos = [];
  let currentPage = 1;
  let pageSize = 10;

  async function cargarProductos() {
    const result = await API.GET(`/productos/buscar?param=${param}&buscado=${buscado}`, false);
    productos = result ?? [];
    currentPage = 1;
  }

  onMount(cargarProductos);

  $: if (param || buscado) {
    cargarProductos();
  }

  $: paginatedItems = (productos && Array.isArray(productos))
    ? paginate({ items: productos, pageSize, currentPage })
    : [];
</script>

{#if productos === null}
  <p class="text-center mt-5">Cargando resultados...</p>
{:else if productos.length === 0}
  <p class="text-center mt-5">No hay resultados</p>
{:else}
  <div class="container mt-4">
    <div class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {#each paginatedItems as producto}
        <div class="col">
          <TiendaItem item={producto} />
        </div>
      {/each}
    </div>
  </div>
{/if}

{#if productos && productos.length > pageSize}
  <div class="d-flex justify-content-center mt-4">
    <LightPaginationNav
      totalItems={productos?.length || 0}
      {pageSize}
      {currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage={(e) => currentPage = e.detail.page}
    />
  </div>
{/if}
