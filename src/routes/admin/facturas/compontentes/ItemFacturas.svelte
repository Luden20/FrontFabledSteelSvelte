<script>
  import BotonEstado from "../../../../componentesGenericos/BotonEstado.svelte";
  import { actualizarFacturasAdmin } from "$lib/store/facturaAdminStore";
  import BotonDetalleFactura from "./BotonDetalleFactura.svelte";
  export let factura;

  let endpoint = '/facturas';
</script>

<tr class="hover:bg-red-50 transition-all text-sm text-gray-800">
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-center">
    {factura.FAC_CODIGO_PK}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-center">
    {factura.cliente.CLI_CEDULA}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-left">
    {factura.cliente.CLI_NOMBRE} {factura.cliente.cli_apellido}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-center">
    {factura.FAC_FECHA}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-right text-green-700 font-semibold">
    $ {factura.FAC_TOTAL.toFixed(2)}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-right">
    $ {factura.FAC_IVA.toFixed(2)}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-right font-bold text-red-600">
    $ {factura.FAC_TOTAL_IVA.toFixed(2)}
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-center">
    <span class={`text-sm font-semibold px-3 py-1 rounded-full 
      ${factura.ESTADO === 'ACT' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'}`}>
      {factura.ESTADO === 'ACT' ? 'Activo' : 'Anulado'}
    </span>
  </td>
  <td class="px-4 py-3 border-t border-gray-300 border-r align-middle text-center">
    <BotonEstado 
      estado={factura.ESTADO}
      id={factura.FAC_CODIGO_PK}
      endpoint={endpoint}
      callback={actualizarFacturasAdmin}
    />
  </td>
  <td class="px-4 py-3 border-t border-gray-300 align-middle text-center">
    <BotonDetalleFactura id={factura.FAC_CODIGO_PK} />
  </td>
</tr>

