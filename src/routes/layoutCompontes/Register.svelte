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
<button class="btn-fabled" on:click={abrir}>
  <i class="bi bi-person-plus me-2"></i> Registrarse
</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Registarse"
  componente={RegisterForm}
/>