<script>
    import BotonEstado from "../../../componentesGenericos/BotonEstado.svelte";
    import { actualizarFacturasAdmin } from "$lib/store/facturaAdminStore";
    import BotonDetalleFactura from "./BotonDetalleFactura.svelte";
    export let factura;
    let endpoint='/facturas';
</script>
<tr>
    <td>{factura.FAC_CODIGO_PK}</td>
    <td>{factura.cliente.CLI_CEDULA}</td>
    <td>{factura.cliente.CLI_NOMBRE} {factura.cliente.cli_apellido}</td>
    <td>{factura.FAC_FECHA}</td>
    <td>{factura.FAC_TOTAL} $</td>
    <td>{factura.FAC_IVA} $</td>
    <td>{factura.FAC_TOTAL_IVA} $</td>
    <td>{factura.ESTADO}</td>
    <td> 
      <BotonEstado 
        estado={factura.ESTADO}
        id={factura.FAC_CODIGO_PK}
        endpoint={endpoint}
        callback={actualizarFacturasAdmin}
      />
    </td>
    <td>
      <BotonDetalleFactura id={factura.FAC_CODIGO_PK}/>
    </td>
  </tr>
