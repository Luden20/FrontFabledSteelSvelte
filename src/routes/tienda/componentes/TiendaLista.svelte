<script>
  import TiendaItem from "./TiendaItem.svelte";
  import { paginate, LightPaginationNav } from 'svelte-paginate';

  export let productos = [];
  export let param = "";
  export let buscado = "";

  let currentPage = 1;
  let pageSize = 4;

  $: paginatedItems = paginate({ productos, pageSize, currentPage });
</script>

<ul class="items">
  {#each paginatedItems as item}
    <li class="item">
      <TiendaItem item={item} />
    </li>
  {/each}
</ul>

<LightPaginationNav
  {pageSize}
  {currentPage}
  totalItems={productos.length}
  limit={1}
  showStepOptions={true}
  on:setPage={(e) => currentPage = e.detail.page}
/>
