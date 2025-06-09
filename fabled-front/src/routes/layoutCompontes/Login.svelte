<script>
    import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
    import LoginForm from "./LoginForm.svelte";
    import { showLoginModal, openLoginModal, closeLoginModal } from "../../store/loginModalStore";

    function handleLogin() {
        closeLoginModal();
    }
</script>
<button
  class="px-3 py-1 rounded bg-red-700 text-white hover:bg-red-800 focus:outline-none"
  on:click={openLoginModal}
>
  Logearse
</button>
<ModalGenerico
  mostrar={$showLoginModal}
  on:close={closeLoginModal}
  titulo="Logearse"
  componente={LoginForm}
  on:logeado={handleLogin}
/>