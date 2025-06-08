<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>

<script>
  import { productosService } from "../../../service/productos.service";
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let id;

  let item = null;
  let cantidad = 1; // ✅ VARIABLE DE ESTADO LOCAL

  const dispatch = createEventDispatcher();
  const cerrar = () => dispatch("close");

  onMount(async () => {
    try {
      item = await productosService.ObtenerDetalle(id);
      console.log("📦 Producto:", item);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  });
</script>

{#if item}
  <div class="modal-backdrop show" on:click={cerrar}></div>

  <div class="modal show d-block" tabindex="-1" role="dialog" on:click|stopPropagation>
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-light border-bottom">
          <h5 class="modal-title">{item.PRD_NOMBRE}</h5>
          <button type="button" class="btn-close" aria-label="Cerrar" on:click={cerrar}></button>
        </div>

        <div class="modal-body">
          <div class="row g-4">
            <!-- Columna izquierda -->
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

            <!-- Columna derecha -->
            <div class="col-md-6">
              <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
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
        </div>

        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-secondary" on:click={cerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="modal-backdrop show"></div>
  <div class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content text-center p-4">
        <p class="m-0">Cargando detalle del producto...</p>
      </div>
    </div>
  </div>
{/if}

<style>
.modal-backdrop.custom-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8); /* más oscuro */
  backdrop-filter: blur(1px); /* opcional: desenfoque suave */
  z-index: 1050 !important;
}
.modal {
  position: fixed;
  inset: 0;
  z-index: 1070 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .carousel-inner img {
    max-height: 400px;
    object-fit: contain;
  }
</style>
