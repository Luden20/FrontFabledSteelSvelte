<script>
  import { onMount } from "svelte";
  import { API } from "$lib/service/apis.service";
  export let id;
  export let onCerrar;

  let item = null;
  let cantidad = 1;

  onMount(async () => {
    try {
      item = await API.GET(`/productos/${id}`,false)
    } catch (error) {
      console.error("❌ Error:", error);
    }
  });
</script>

{#if item}
  <div class="row g-4">
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
            <span class="badge rounded-pill bg-secondary me-1">{cat.CAT_NOMBRE}</span>
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

    <div class="col-md-6">
      <div class="carousel slide" id="carouselExampleControls" data-bs-ride="carousel">
        <div class="carousel-inner rounded border">
          {#each item.imagenes as img, i}
            <div class="carousel-item {i === 0 ? 'active' : ''}">
              <img src={img.IMG__URL} class="d-block w-100" alt="Imagen producto" />
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
