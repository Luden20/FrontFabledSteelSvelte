<script>
  import { createEventDispatcher } from "svelte";
  export let mostrar = false;
  export let titulo = "Modal";
  export let componente = null;
  export let props = {};

  const dispatch = createEventDispatcher();

  function cerrar() {
    dispatch("close");
  }
</script>

{#if mostrar}
  <div class="modal-backdrop custom-backdrop" on:click={cerrar}></div>

  <div class="modal show d-block" tabindex="-1" role="dialog" on:click|stopPropagation>
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">

        <div class="modal-header bg-light border-bottom">
          <h5 class="modal-title">{titulo}</h5>
          <button type="button" class="btn-close" on:click={cerrar}></button>
        </div>

        <div class="modal-body">
          {#if componente}
            <svelte:component this={componente} {...props} />
          {/if}
        </div>

        <div class="modal-footer bg-light">
          <button class="btn btn-secondary" on:click={cerrar}>Cerrar</button>
        </div>

      </div>
    </div>
  </div>
{/if}
<style>
  .modal-backdrop.custom-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3); /* antes estaba 0.8, esto es más translúcido */
  backdrop-filter: blur(2px);     /* desenfoque opcional */
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

</style>