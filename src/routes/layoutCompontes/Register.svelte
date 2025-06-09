    <script>
    import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
    import RegisterForm from "./RegisterForm.svelte";
    let mostrarModal = false;
   function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
</script>
<button on:click={abrir}>Registrar</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Registarse"
  componente={RegisterForm}
/>