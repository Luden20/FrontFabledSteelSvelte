<script>
  import { onMount } from 'svelte';
  import { FacturaService } from '$lib/service/factura.service';
  import InfoBanco from './InfoBanco.svelte';
  import CuentasItem from './CuentasItem.svelte';
  import ToastGenerico from '../../../componentesGenericos/ToastGenerico.svelte';
  export let cedula;
  export let total;
  export let carrito;
  export let idCliente;

  let cuentaSeleccionada = null;
  let info = null;
  let res=null;
  let mensaje=null;
  let exito=null;
  let porPagar=true;
  onMount(async () => {
    info = await FacturaService.obtenerCuenta(cedula);
  });

  function seleccionarCuenta(event) {
    cuentaSeleccionada = event.detail;
  }

  async function pagar() {
    if (cuentaSeleccionada) {
            const payload = {
      carritoList: carrito,
      cuenta: cuentaSeleccionada.cuenta_id,
      idCliente: idCliente
    };
    res=await FacturaService.Facturar(idCliente,carrito,cuentaSeleccionada.cuenta_id);
    mensaje=res.mensaje;
    exito=res.success;
    porPagar=false;
localStorage.setItem('carrito', JSON.stringify([]));
  }
  }
</script>

{#if info}
  <InfoBanco cliente={info} />

  <h2 class="mt-4">Cuentas de banco disponibles</h2>

  {#each info.Cuentas as cuenta (cuenta.cuenta_id)}
    <CuentasItem
      {cuenta}
      deuda={total}
      seleccionado={cuentaSeleccionada?.cuenta_id === cuenta.cuenta_id}
      on:seleccionar={seleccionarCuenta}
    />
  {/each}

  <div class="mt-4 text-center">
    {#if porPagar}
        <button
        class="btn btn-success"
        on:click={pagar}
        disabled={!cuentaSeleccionada}
      >
        {#if cuentaSeleccionada}
          Pagar con cuenta {cuentaSeleccionada.cuenta_id}
        {:else}
          Selecciona una cuenta para pagar
        {/if}
      </button>
    {/if}
  </div>
  {#if mensaje}
    <ToastGenerico
    mensaje={mensaje}
    exito={exito}/>
     <a href="/tienda" class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;">Volver a la tienda</a>

  {/if}
{:else}
  <h5 class="text-danger mt-3">Cargando</h5>
{/if}
