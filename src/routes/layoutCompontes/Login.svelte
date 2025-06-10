<script>
    import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
    import LoginForm from "./LoginForm.svelte";
    import ToastGenerico from "../../componentesGenericos/ToastGenerico.svelte";
    import { showLoginModal, openLoginModal, closeLoginModal } from "$lib/store/loginModalStore";

    let toastData = null;

    function handleLogin(event) {
        toastData = event.detail;
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
{#if toastData}
  {#key toastData}
    <ToastGenerico mensaje={toastData.mensaje} exito={toastData.exito} />
  {/key}
{/if}
