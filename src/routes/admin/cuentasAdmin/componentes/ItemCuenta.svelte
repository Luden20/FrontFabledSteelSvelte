<script>
	import BotonEstado from '../../../../componentesGenericos/BotonEstado.svelte';
	import { actualizarCuentas } from '$lib/store/cuentasStore';
	import BotonModalGenerico from '../../../../componentesGenericos/BotonModalGenerico.svelte';
	import EditarCuenta from './EditarCuenta.svelte';

	export let cuenta;
	let endpoint = '/cuentaCliente';
</script>

<tr class="text-sm text-gray-800 transition-all hover:bg-red-50">
	<td class="border-t border-r border-gray-300 px-6 py-4 align-middle">
		{cuenta.CUE_NOMBRE}
		{cuenta.CUE_APELLIDO}
	</td>
	<td class="border-t border-r border-gray-300 px-6 py-4 align-middle">
		{cuenta.cliente.CLI_CEDULA}
	</td>
	<td class="border-t border-r border-gray-300 px-6 py-4 text-center align-middle">
		<span class="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
			{cuenta.cliente.CLI_CELULAR}
		</span>
	</td>
	<td class="border-t border-r border-gray-300 px-6 py-4 text-center align-middle">
		{cuenta.CUE_FECHA_CREACION.slice(0, 10)}
	</td>
	<td class="border-t border-r border-gray-300 px-6 py-4 align-middle">
		{cuenta.CUE_EMAIL}
	</td>
	<td class="border-t border-r border-gray-300 px-6 py-4 text-center align-middle">
		<span
			class={`rounded-full px-3 py-1 text-sm font-semibold 
      ${cuenta.ESTADO === 'ACT' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
		>
			{cuenta.ESTADO === 'ACT' ? 'Activo' : 'Inactivo'}
		</span>
	</td>
	<td class="border-t border-r border-gray-300 px-6 py-4 text-center align-middle">
		<BotonEstado
			estado={cuenta.ESTADO}
			id={cuenta.CUE_ID_PK}
			{endpoint}
			callback={actualizarCuentas}
		/>
	</td>
	<td class="border-t border-gray-300 px-6 py-4 text-center align-middle">
		<BotonModalGenerico
			componente={EditarCuenta}
			textoBoton={'Editar'}
			titulo={'Editar Cuenta'}
			props={{ id: cuenta.CUE_ID_PK }}
		/>
	</td>
</tr>
