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
        <dl class="row">
          <dt class="col-sm-4">Nombre de cuenta:</dt>
          <dd class="col-sm-8">{cuenta.CUE_NOMBRE} {cuenta.CUE_APELLIDO}</dd>

          <dt class="col-sm-4">Email:</dt>
          <dd class="col-sm-8">{cuenta.CUE_EMAIL}</dd>

          <dt class="col-sm-4">Fecha de nacimiento:</dt>
          <dd class="col-sm-8">{cuenta.CUE_FECHA_NACIMIENTO}</dd>

          <dt class="col-sm-4">Cliente:</dt>
          <dd class="col-sm-8">{cuenta.cliente.CLI_NOMBRE} {cuenta.cliente.CLI_APELLIDO}</dd>

          <dt class="col-sm-4">Dirección:</dt>
          <dd class="col-sm-8">{cuenta.cliente.CLI_DIRECCION}</dd>

          <dt class="col-sm-4">Celular:</dt>
          <dd class="col-sm-8">{cuenta.cliente.CLI_CELULAR}</dd>

          <dt class="col-sm-4">Cédula:</dt>
          <dd class="col-sm-8">{cuenta.cliente.CLI_CEDULA}</dd>
        </dl>
      </div>
    {:else}
      <div class="col-md-6"><h6>Cargando datos del cliente...</h6></div>
    {/if}

    <div class="col-md-6">
      <h4>Factura</h4>
      <dl class="row">
        <dt class="col-sm-4">Fecha:</dt>
        <dd class="col-sm-8">{factura.FAC_FECHA}</dd>

        <dt class="col-sm-4">Subtotal:</dt>
        <dd class="col-sm-8">{factura.FAC_TOTAL}</dd>

        <dt class="col-sm-4">IVA:</dt>
        <dd class="col-sm-8">{factura.FAC_IVA}</dd>

        <dt class="col-sm-4">Total con IVA:</dt>
        <dd class="col-sm-8">{factura.FAC_TOTAL_IVA}</dd>

        <dt class="col-sm-4">Estado Factura:</dt>
        <dd class="col-sm-8">{factura.FAC_ESTADO}</dd>

        <dt class="col-sm-4">Estado Registro:</dt>
        <dd class="col-sm-8">{factura.ESTADO}</dd>
      </dl>
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
            <td>{detalle.DTF_PRECIO}</td>
            <td>{(detalle.DTF_PRECIO * 0.15).toFixed(2)}</td>
            <td>{(detalle.DTF_PRECIO * 1.15).toFixed(2)}</td>
            <td>{detalle.ESTADO}</td>
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
