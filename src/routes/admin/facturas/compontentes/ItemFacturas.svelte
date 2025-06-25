<script>
	import BotonEstado from '../../../../componentesGenericos/BotonEstado.svelte';
	import { actualizarFacturasAdmin } from '$lib/store/facturaAdminStore';
	import BotonDetalleFactura from './BotonDetalleFactura.svelte';
	export let factura;

	let endpoint = '/facturas';
</script>

<tr class="text-sm text-gray-800 transition-all hover:bg-red-50">
	<td class="border-t border-r border-gray-300 px-4 py-3 text-center align-middle">
		{factura.FAC_CODIGO_PK}
	</td>
	<td class="border-t border-r border-gray-300 px-4 py-3 text-center align-middle">
		{factura.cliente.CLI_CEDULA}
	</td>
	<td class="border-t border-r border-gray-300 px-4 py-3 text-left align-middle">
		{factura.cliente.CLI_NOMBRE}
		{factura.cliente.cli_apellido}
	</td>
	<td class="border-t border-r border-gray-300 px-4 py-3 text-center align-middle">
		{factura.FAC_FECHA.slice(0, 10)}
	</td>
	<td
		class="border-t border-r border-gray-300 px-4 py-3 text-right align-middle font-semibold text-green-700"
	>
		$ {factura.FAC_TOTAL.toFixed(2)}
	</td>
	<td class="border-t border-r border-gray-300 px-4 py-3 text-right align-middle">
		$ {factura.FAC_IVA.toFixed(2)}
	</td>
	<td
		class="border-t border-r border-gray-300 px-4 py-3 text-right align-middle font-bold text-red-600"
	>
		$ {factura.FAC_TOTAL_IVA.toFixed(2)}
	</td>
	<td class="border-t border-r border-gray-300 px-4 py-3 text-center align-middle">
		<span
			class={`rounded-full px-3 py-1 text-sm font-semibold 
      ${factura.ESTADO === 'ACT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
		>
			{factura.ESTADO === 'ACT' ? 'Activo' : 'Anulado'}
		</span>
	</td>
	<td class="border-t border-r border-gray-300 px-4 py-3 text-center align-middle">
		<BotonEstado
			estado={factura.ESTADO}
			id={factura.FAC_CODIGO_PK}
			{endpoint}
			callback={actualizarFacturasAdmin}
		/>
	</td>
	<td class="border-t border-gray-300 px-4 py-3 text-center align-middle">
		<BotonDetalleFactura id={factura.FAC_CODIGO_PK} />
	</td>
</tr>
