<script>
    import { Card } from 'flowbite-svelte';
    export let cliente;
</script>
<Card class="cursor-pointer hover:shadow-lg border p-4">
  {#if cliente}
    <h5>Cedula Banco {cliente.cliente_id}</h5>
  <h5>Nombre Banco {cliente.nombre}</h5>
  <h5>Email Banco {cliente.email}</h5>
  {:else}
  <h5>cargando..</h5>
  {/if}

</Card>