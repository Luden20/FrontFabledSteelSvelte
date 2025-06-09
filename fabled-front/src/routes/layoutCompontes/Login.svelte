<script>
    import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
    import LoginForm from "./LoginForm.svelte";
    let mostrarModal=false;
    export let onLogin=()=>{}
    function abrir() {
        mostrarModal = true;
    }

    function cerrar() {
        mostrarModal = false;
    }
    function abrirModal() {
        showModal = true;
    }
    function handleLogin() {
    cerrar();
    onLogin(); // propaga evento hacia el layout
  }
</script>
<button on:click={abrir}>Logearse</button>
<ModalGenerico
  mostrar={mostrarModal}
  on:close={cerrar}
  titulo="Logearse"
  componente={LoginForm}
  on:logeado={handleLogin}
/>