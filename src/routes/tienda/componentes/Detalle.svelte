<script>
  import { onMount } from "svelte";
  import { API } from "$lib/service/apis.service";
  export let id;
  export let onCerrar;

  let item = null;
  let cantidad = 1;
  let animar = false;

  onMount(async () => {
    try {
      item = await API.GET(`/productos/${id}`, false);
      // Activar animación luego de cargar
      setTimeout(() => (animar = true), 50);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  });
</script>

{#if item}
  <div class="row g-4 fade-slide-in {animar ? 'activo' : ''}">
    <div class="col-md-6">
      <dl class="row">
        <dt class="col-sm-4">Descripción:</dt>
        <dd class="col-sm-8">{item.PRD_DESCRIPCION}</dd>

        <dt class="col-sm-4">Autor:</dt>
        <dd class="col-sm-8">{item.PRD_AUTOR}</dd>

        <dt class="col-sm-4">Precio:</dt>
        <dd class="col-sm-8">${item.PRD_PRECIO}</dd>

        <dt class="col-sm-4">Categorías:</dt>
        <dd class="col-sm-8">
          {#each item.categoria as cat}
            <span class="badge rounded-pill bg-fabled me-1">{cat.CAT_NOMBRE}</span>
          {/each}
        </dd>

        <dt class="col-sm-4">Stock:</dt>
        <dd class="col-sm-8">
          <select bind:value={cantidad} class="form-select mb-2">
            {#each Array(item.PRD_STOCK).fill(0).map((_, i) => i + 1) as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
          <button
            class="btn btn-primary w-100"
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
        </dd>
      </dl>
    </div>

    <div class="col-md-6 d-flex justify-content-center align-items-center">
      <div class="carousel slide w-100" id="carouselExampleControls" data-bs-ride="carousel" style="max-width: 300px;">
        <div class="carousel-inner rounded border shadow">
          {#each item.imagenes as img, i}
            <div class="carousel-item {i === 0 ? 'active' : ''}">
              <img src={img.IMG__URL} class="d-block w-100 rounded" alt="Imagen producto" />
            </div>
          {/each}
        </div>
        <div class="d-flex justify-content-between mt-2">
          <button class="btn btn-outline-secondary" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <i class="bi bi-arrow-left-circle-fill"></i> Anterior
          </button>
          <button class="btn btn-outline-secondary" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            Siguiente <i class="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Cargando detalle del producto...</p>
{/if}

<style>
  .fade-slide-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease-out;
  }

  .fade-slide-in.activo {
    opacity: 1;
    transform: translateY(0);
  }

  dl.row dt {
    font-family: 'Cinzel', serif;
    font-weight: 600;
    color: #B22222;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  dl.row dd {
    font-family: 'Lora', serif;
    color: #333;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  select.form-select {
    border-radius: 999px;
    border: 2px solid #B22222;
    font-family: 'Lora', serif;
  }

  .btn-primary {
    background-color: #B22222;
    border: none;
    font-weight: 600;
    font-family: 'Cinzel', serif;
    padding: 0.5rem 1.5rem;
    border-radius: 999px;
    transition: all 0.2s ease-in-out;
  }

  .btn-primary:hover {
    background-color: #8B0000;
    transform: scale(1.05);
  }

  .carousel-inner img {
    max-height: 300px;
    object-fit: contain;
    border-radius: 1rem;
    border: 3px solid #B22222;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  .btn-outline-secondary {
    font-family: 'Cinzel', serif;
    border-radius: 999px;
    border: 2px solid #B22222;
    color: #B22222;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }

  .btn-outline-secondary:hover {
    background-color: #B22222;
    color: white;
    transform: scale(1.05);
  }

  .badge.bg-fabled {
    background-color: #B22222;
    color: white;
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  p {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    text-align: center;
    color: #666;
  }
</style>
