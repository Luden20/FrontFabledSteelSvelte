<script>
    import ModalGenerico from "./ModalGenerico.svelte";
    export let componente;
    export let textoBoton;
    export let titulo;
    export let props={};
    export let tipo="normal";
    let mostrarModal = false;
   function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
</script>
<button on:click={abrir}>{textoBoton}</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo={titulo}
  componente={componente}
  props={ props }
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