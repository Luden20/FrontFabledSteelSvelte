<script>
    import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
    import LoginForm from "./LoginForm.svelte";
    import { showLoginModal, openLoginModal, closeLoginModal } from "../../store/loginModalStore";

    function handleLogin() {
        closeLoginModal();
    }
</script>
<button on:click={openLoginModal}>Logearse</button>
<ModalGenerico
  mostrar={$showLoginModal}
  on:close={closeLoginModal}
  titulo="Logearse"
  componente={LoginForm}
  on:logeado={handleLogin}
/>