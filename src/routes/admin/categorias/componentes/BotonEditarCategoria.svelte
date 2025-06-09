<script>
    import ModalGenerico from "../../../componentesGenericos/ModalGenerico.svelte";
    import EditarCategoria from "./EditarCategoria.svelte";
    export let categoria;
    let mostrarModal = false;
    function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
</script>
<button on:click={abrir}>Editar categoria</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Crear Categoria"
  componente={EditarCategoria}
  props={{ categoria: categoria}}
/>