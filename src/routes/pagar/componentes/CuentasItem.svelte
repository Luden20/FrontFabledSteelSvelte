<script>
  import { Card } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';

  export let cuenta;
  export let deuda;
  export let seleccionado = false;

  const dispatch = createEventDispatcher();

  function manejarClick() {
    console.log('Clic en cuenta:', cuenta);
    if (cuenta.saldo >= deuda) {
      dispatch('seleccionar', cuenta);
    }
  }
</script>

<button
  type="button"
  on:click={manejarClick}
  disabled={cuenta.saldo < deuda}
  class="w-full text-left"
>
  <Card
    class={`cursor-pointer border p-4 mb-2 ${
      cuenta.saldo >= deuda
        ? (seleccionado ? 'bg-green-200' : 'hover:shadow-lg')
        : 'bg-red-100 border-red-500 text-red-800 cursor-not-allowed'
    }`}
  >
    <h5>ID {cuenta.cuenta_id}</h5>
    <h5>Saldo: ${cuenta.saldo}</h5>
    {#if cuenta.saldo < deuda}
      <p class="text-danger">Saldo insuficiente</p>
    {:else}
      <p>Seleccionable</p>
    {/if}
  </Card>
</button>
