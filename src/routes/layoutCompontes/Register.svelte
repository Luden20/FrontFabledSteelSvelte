<script>
  import ModalGenerico from "../../componentesGenericos/ModalGenerico.svelte";
  import RegisterForm from "./RegisterForm.svelte";
  export let mostrar = false; // Se controla desde fuera

  function cerrar() {
    mostrar = false;
    dispatch("close");
  }

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<ModalGenerico
  {mostrar}
  on:close={cerrar}
  titulo="Registrarse"
  componente={RegisterForm}
/>
