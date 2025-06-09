<script>
    import ModalGenerico from "../../../componentesGenericos/ModalGenerico.svelte";
    import CrearCategoria from "./CrearCategoria.svelte";
    let mostrarModal = false;
    function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
    function abrirModal() {
        showModal = true;
    }
</script>
<button on:click={abrir}>Crear categoria</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Crear Categoría"
  componente={CrearCategoria}
  props={{ extraProp: "algo" }}
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