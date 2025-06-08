<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</svelte:head>

<script>
  import ModalDetalle from './ModalDetalle.svelte';

  export let item;
  let cantidad = 1;
  let showModal = false;

  function abrirModal() {
    showModal = true;
  }
</script>

<div class="card h-100 shadow-lg border-0">
  <img
    class="card-img-top"
    src={item.imagen.IMG__URL}
    alt="Imagen"
    style="height: 200px; object-fit: cover;"
  />

  <div class="card-body d-flex flex-column">
    <h5 class="card-title">{item.PRD_NOMBRE}</h5>
    <p class="card-text">{item.PRD_DESCRIPCION}</p>
  </div>

  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <strong>Autor:</strong> {item.PRD_AUTOR}
    </li>
    <li class="list-group-item">
      <strong>Precio:</strong> {item.PRD_PRECIO} USD
    </li>
    <li class="list-group-item">
      <select bind:value={cantidad} class="form-select">
        {#each Array(item.PRD_STOCK).fill(0).map((_, i) => i + 1) as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
    </li>
  </ul>

  <div class="card-body d-flex justify-content-between mt-auto">
    <button
      class="btn btn-primary"
      on:click={() =>
        window.agregar(
          item.PRD_ID_PK,
          item.PRD_NOMBRE,
          item.PRD_DESCRIPCION,
          item.PRD_PRECIO,
          item.imagen.IMG__URL,
          item.PRD_AUTOR,
          item.PRD_STOCK,
          cantidad
        )
      }
    >
      Comprar
    </button>

    <!-- Aqui usamos Bootstrap en vez de Flowbite -->
    <button class="btn btn-outline-primary" on:click={abrirModal}>
      Ver detalles
    </button>
  </div>
</div>

<!-- Montamos el modal una sola vez -->
{#if showModal}
  <ModalDetalle id={item.PRD_ID_PK} on:close={() => (showModal = false)} />
{/if}


<style>
  .card {
    background-color: rgba(255, 255, 255, 0.92);
    border: 2px solid #B22222;
    border-radius: 1rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    transform: translateY(30px);
    min-height: 600px;
  }
  .card:hover {
    transform: scale(1.03);
    border-color: #7B1E1E;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
  }
</style>
