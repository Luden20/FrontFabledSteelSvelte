<script>
    import ModalGenerico from "../../../../componentesGenericos/ModalGenerico.svelte";
    import EditarCuenta from "./EditarCuenta.svelte";
    export let id;
    let mostrarModal = false;
   function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
</script>
<button on:click={abrir}>Editar</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Editar Cuenta"
  componente={EditarCuenta}
  props={{ id: id }}
/>