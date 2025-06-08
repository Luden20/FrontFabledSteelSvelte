<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</svelte:head>
<script>
    import { authService } from "../../../service/auth.service";
    import { onMount } from 'svelte';

    let rol= null;
    let usuario=null;
    onMount(() => {
      rol = authService.obtenerRol();
      usuario = authService.obtenerUsuario();

      rol = `${rol}`; // forzar actualización de tipo string

    });
</script>
<!-- Carrito flotante -->
<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050;">
  <button type="button" class="btn btn-primary position-relative" data-bs-toggle="modal" data-bs-target="#carrito_vista_previa" style="transform: scale(1.3);">
    <i class="bi bi-cart-fill"></i>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cantidad_carrito">0</span>
  </button>
</div>

<!-- Modal Carrito -->
<div class="modal fade" id="carrito_vista_previa" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content bg-white text-dark border border-danger">
      <div class="modal-header border-bottom border-danger">
        <h5 class="modal-title fw-bold text-danger">Carrito de Compras</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" style="max-height: 50vh; overflow-y: auto;">
        <ul class="list-group list-group-numbered" id="detalle_carrito"></ul>
      </div>
      <div class="px-3 py-2">
        <h5 id="subtotal_pagar">Subtotal</h5>
        <h5 id="iva">IVA</h5>
        <h3 id="total_pagar">Total</h3>
      </div>
      <div class="modal-footer border-top border-danger">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        {#if rol=="cliente"}
        <button 
          class="btn btn-secondary" 
          data-bs-dismiss="modal" 
          on:click={() => window.location.href = '/pagar'}>
          Pagar
        </button>
        {:else}
      <button 
        class="btn btn-secondary" 
        data-bs-dismiss="modal" 
        on:click={() => window.location.href = '/login'}>
        Login
      </button>

        {/if}
        <input type="hidden" name="carritoJson" id="carritoJson" />
      </div>
    </div>
  </div>
</div>

<style>
  .modal-content {
    
    background-color: #fff;
    border: 2px solid #B22222;
    font-family: 'Lora', serif;
    color: #000;
  }

  .modal-dialog.modal-xl {
    max-width: 90vw;
      margin-top: 60px !important; /* Ajusta según el alto de tu navbar */

  }

  .modal-backdrop.show {
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }

  .btn-close-white {
    filter: invert(1);
  }

  .list-group-item {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    color: #000;
  }

  h5, h3, .modal-title {
    font-family: 'Cinzel', serif;
    color: #000;
  }
</style>
