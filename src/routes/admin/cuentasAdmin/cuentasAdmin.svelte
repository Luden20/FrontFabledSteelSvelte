<script>
    import { onMount } from "svelte";
    import { Table } from "flowbite-svelte";
    import ItemCuenta from "./componentes/ItemCuenta.svelte";
    import { cuentas,actualizarCuentas } from "$lib/store/cuentasStore";
    import BuscadorGenerico from "../../../componentesGenericos/BuscadorGenerico.svelte";
    let buscar=[{llave:"cedula",valor:"Cedula"},
                {llave:"nombre",valor:"Nombre"}]
    onMount(actualizarCuentas);
</script>
<BuscadorGenerico
  params={buscar}
  callback={actualizarCuentas}
/>
<div class="table"><Table id="table">
  <thead>
    <tr>
      <th>Cliente</th>
      <th>Cedula</th>
      <th>Direccion</th>
      <th>Celular</th>
      <th>Creacion</th>
      <th>Email</th>
      <th>Estado</th>
      <th>Acciones Estado</th>
      <th>Edicion</th>
    </tr>
  </thead>
  <tbody>
    {#if $cuentas.length > 0}
      {#each $cuentas as cuenta}
        <ItemCuenta cuenta={cuenta} />
      {/each}
    {:else}
      <tr>
        <td colspan="3">CARGANDO...</td>
      </tr>
    {/if}
  </tbody>
</Table></div>

<style>  
    .table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 1rem;
  }

  thead {
    background-color: #1f2937; /* gris oscuro */
    color: white;
  }


  </style>