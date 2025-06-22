<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</svelte:head>

<script>
  import Detalle from './Detalle.svelte';
  import ModalGenerico from '../../../componentesGenericos/ModalGenerico.svelte';

  export let item;
  let cantidad = 1;
  let mostrarModal = false;

  function abrir() {
    mostrarModal = true;
  }

  function cerrar() {
    mostrarModal = false;
  }
</script>

<div class="card h-100 shadow-lg">
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
      <label class="form-label text-danger fw-bold" style="font-family: 'Cinzel', serif;">Cantidad</label>
      <select bind:value={cantidad} class="form-select">
        {#each Array(item.PRD_STOCK).fill(0).map((_, i) => i + 1) as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
    </li>
  </ul>

  <div class="card-body d-flex justify-content-between mt-auto">
    <button
      class="btn-fabled px-3 d-flex align-items-center gap-2"
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
      <i class="bi bi-cart-plus"></i> Comprar
    </button>

    <button class="btn-fabled-outline px-3 d-flex align-items-center gap-2" on:click={abrir}>
      <i class="bi bi-info-circle"></i> Mas Info
    </button>
  </div>
</div>

<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Detalle del Producto"
  componente={Detalle}
  props={{ id: item.PRD_ID_PK }}
/>

<style>
  .card {
    background-color: rgba(255, 255, 255, 0.92);
    border: 2px solid #B22222;
    border-radius: 1rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    transform: translateY(20px);
    min-height: 600px;
    font-family: 'Lora', serif;
  }

  .card:hover {
    transform: scale(1.03);
    border-color: #7B1E1E;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6);
  }

  .card-title {
    font-family: 'Cinzel', serif;
    font-weight: bold;
    color: #B22222;
  }

  .card-text {
    color: #333;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .form-select {
    font-family: 'Lora', serif;
    border: 1px solid #B22222;
    border-radius: 0.5rem;
  }

  .form-select:focus {
    border-color: #B22222;
    box-shadow: 0 0 0 0.2rem rgba(178, 34, 34, 0.25);
  }

  .btn-fabled {
    border: none;
    background-color: #B22222;
    color: #fff;
    border-radius: 999px;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .btn-fabled:hover {
    background-color: #7B1E1E;
    transform: scale(1.05);
  }

  .btn-fabled,
  .btn-fabled-outline {
    padding-top: 0.25rem;  /* antes era como 0.5rem */
    padding-bottom: 0.25rem;
    font-size: 0.9rem; /* también podemos bajar un poco la fuente si quieres más compacto */
    line-height: 1.2;
  }

  .btn-fabled i,
  .btn-fabled-outline i {
    font-size: 1rem;
  }
</style>
