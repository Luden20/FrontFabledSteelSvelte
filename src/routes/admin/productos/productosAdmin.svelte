<script>
    import { Table } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { actualizarProductosAdmin,productos } from "$lib/store/productosStore";
    import ItemProducto from "./componentes/ItemProducto.svelte";
    import BuscadorGenerico from "../../../componentesGenericos/BuscadorGenerico.svelte";
    import BotonModalGenerico from "../../../componentesGenericos/BotonModalGenerico.svelte";
    import CrearProducto from "./componentes/CrearProducto.svelte";
    let params=[{llave:"Nombre",valor:"Nombre"},
                {llave:"Autor",valor:"Autor"}
    ]
    onMount(actualizarProductosAdmin)
</script>
<BuscadorGenerico
  params={params}
  callback={actualizarProductosAdmin}
/>
<BotonModalGenerico
    componente={CrearProducto}
    textoBoton={"Crear Producto"}
    tipo={"Titulo"}
/>
<div class="table">
    <Table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Descripcion</th>
      <th>Autor</th>
      <th>Precio</th>
      <th>Stock</th>
      <th>Estado</th>
      <th>Acciones Estado</th>
      <th>Edicion</th>
    </tr>
  </thead>
  <tbody>
    {#if $productos.length>0}
        {#each $productos as producto}
        <ItemProducto producto={producto}/>
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