<script>
    import { facturas,actualizarFacturasAdmin } from "$lib/store/facturaAdminStore";
    import { Table } from "flowbite-svelte";
    import BuscadorGenerico from "../../../componentesGenericos/BuscadorGenerico.svelte";
    import { onMount } from "svelte";
	  import ItemFacturas from "./compontentes/ItemFacturas.svelte";
    let params=[{llave:"cedula",valor:"Cédula"},{llave:"Nfactura",valor:"# de Factura"}]
    onMount(actualizarFacturasAdmin);
</script>
<BuscadorGenerico
  params={params}
  callback={actualizarFacturasAdmin}
/>
<div class="table">
    <Table>
  <thead>
    <tr>
      <th># Factura</th>
      <th>Cedula</th>
      <th>Nombre</th>
      <th>Fecha</th>
      <th>Subtotal</th>
      <th>IVA</th>
      <th>Total</th>
      <th>Estado</th>
      <th>Edicion</th>
      <th>Detalle</th>
    </tr>
  </thead>
  <tbody>
    {#if $facturas.length>0}
        {#each $facturas as factura}
        <ItemFacturas factura={factura}/>
        {/each}
    {:else}
    <tr>
        <td></td>
    </tr>
    {/if}
  </tbody>
    </Table>
</div>
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