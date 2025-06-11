<script>
        import ModalGenerico from "../../../../componentesGenericos/ModalGenerico.svelte";
    import DetalleFactura from "./DetalleFactura.svelte";
    export let id;
    let mostrarModal = false;
   function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
</script>
<button on:click={abrir}>Ver Detalle</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Detalle"
  componente={DetalleFactura}
  props={{ id: id }}
/>
<style>
      button {
    background-color: #1f2937; /* gris oscuro */
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #374151; /* gris más claro al pasar mouse */
  }

</style>