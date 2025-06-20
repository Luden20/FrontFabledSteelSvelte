<script>
    import { API } from "$lib/service/apis.service";
    import { onMount } from "svelte";
    export let id;
    let factura = null;
    let detalleFactura = null;
    let cuenta = null;

    onMount(async () => {
        factura = await API.GET(`/facturas/${id}`, true);
        cuenta = await API.GET(`/cuentaCliente/cli/${factura.CLI_ID_PK}`, true);
        detalleFactura = await API.GET(`/facturas/detalle?id=${factura.FAC_CODIGO_PK}`, true);
    });
</script>

{#if factura}
  <div class="row">
    {#if cuenta}
      <div class="col-md-6">
        <h4>Cuenta y Cliente</h4>
        <table class="table tabla-factura">
          <tbody>
            <tr><th>Nombre de cuenta</th><td>{cuenta.CUE_NOMBRE} {cuenta.CUE_APELLIDO}</td></tr>
            <tr><th>Email</th><td>{cuenta.CUE_EMAIL}</td></tr>
            <tr><th>Fecha de nacimiento</th><td>{cuenta.CUE_FECHA_NACIMIENTO}</td></tr>
            <tr><th>Cliente</th><td>{cuenta.cliente.CLI_NOMBRE} {cuenta.cliente.CLI_APELLIDO}</td></tr>
            <tr><th>Dirección</th><td>{cuenta.cliente.CLI_DIRECCION}</td></tr>
            <tr><th>Celular</th><td>{cuenta.cliente.CLI_CELULAR}</td></tr>
            <tr><th>Cédula</th><td>{cuenta.cliente.CLI_CEDULA}</td></tr>
          </tbody>
        </table>
      </div>
    {:else}
      <div class="col-md-6"><h6>Cargando datos del cliente...</h6></div>
    {/if}

    <div class="col-md-6">
      <h4>Factura</h4>
      <table class="table tabla-factura">
        <tbody>
          <tr><th>Fecha</th><td>{factura.FAC_FECHA}</td></tr>
          <tr><th>Subtotal</th><td>$ {factura.FAC_TOTAL.toFixed(2)}</td></tr>
          <tr><th>IVA</th><td>$ {factura.FAC_IVA.toFixed(2)}</td></tr>
          <tr><th>Total con IVA</th><td>$ {factura.FAC_TOTAL_IVA.toFixed(2)}</td></tr>
          <tr><th>Estado Factura</th><td>{factura.FAC_ESTADO}</td></tr>
          <tr><th>Estado Registro</th><td>{factura.ESTADO}</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  {#if detalleFactura}
    <h4>Detalle de Factura</h4>
    <table class="table factura-table mt-3">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>IVA</th>
          <th>Total</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {#each detalleFactura as detalle}
          <tr>
            <td>{detalle.PRD_NOMBRE}</td>
            <td>{detalle.DTT_CANTIDAD}</td>
            <td>$ {detalle.DTF_PRECIO.toFixed(2)}</td>
            <td>$ {(detalle.DTF_PRECIO * 0.15).toFixed(2)}</td>
            <td>$ {(detalle.DTF_PRECIO * 1.15).toFixed(2)}</td>
            <td>
              <span class={`badge-estado ${detalle.ESTADO === 'ACT' ? 'activo' : 'inactivo'}`}>
                {detalle.ESTADO === 'ACT' ? 'Activo' : 'Anulado'}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <h6>Cargando detalle de la factura...</h6>
  {/if}
{:else}
  <h6>Cargando factura...</h6>
{/if}

<style>
  h4, h5 {
    font-family: 'Cinzel', serif;
    color: #B22222;
    margin-top: 1rem;
  }

  .tabla-factura th {
    color: #B22222;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    width: 40%;
    vertical-align: middle;
    background-color: #f8d7da;
    text-align: right;
    padding-right: 1rem;
  }

  .tabla-factura td {
    font-family: 'Lora', serif;
    background-color: #fff;
    padding-left: 1rem;
  }

  .tabla-factura {
    border: 1px solid #B22222;
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 0.5rem;
  }

  .factura-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 0.5rem;
    overflow: hidden;
    font-family: 'Lora', serif;
  }

  .factura-table thead {
    background-color: #B22222;
    color: white;
  }

  .factura-table th,
  .factura-table td {
    border: 1px solid #B22222;
    padding: 0.75rem;
    text-align: center;
  }

  .factura-table tr:hover {
    background-color: #fceaea;
  }

  .badge-estado {
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    font-weight: bold;
    font-size: 0.85rem;
    display: inline-block;
  }

  .activo {
    background-color: #d1fae5;
    color: #065f46;
  }

  .inactivo {
    background-color: #fee2e2;
    color: #991b1b;
  }
</style>
