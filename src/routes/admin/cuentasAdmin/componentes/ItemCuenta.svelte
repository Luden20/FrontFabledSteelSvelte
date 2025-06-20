<script>
  import BotonEstado from "../../../../componentesGenericos/BotonEstado.svelte";
  import { actualizarCuentas } from "$lib/store/cuentasStore";
  import BotonModalGenerico from "../../../../componentesGenericos/BotonModalGenerico.svelte";
  import EditarCuenta from "./EditarCuenta.svelte";

  export let cuenta;
  let endpoint = "/cuentaCliente";
</script>

<tr class="hover:bg-red-50 transition-all text-sm text-gray-800">
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle">
    {cuenta.CUE_NOMBRE} {cuenta.CUE_APELLIDO}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle">
    {cuenta.cliente.CLI_CEDULA}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle">
    {cuenta.cliente.CLI_DIRECCION}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <span class="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
      {cuenta.cliente.CLI_CELULAR}
    </span>
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    {cuenta.CUE_FECHA_CREACION}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle">
    {cuenta.CUE_EMAIL}
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <span class={`text-sm font-semibold px-3 py-1 rounded-full 
      ${cuenta.ESTADO === 'ACT' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-red-100 text-red-700'}`}>
      {cuenta.ESTADO === 'ACT' ? 'Activo' : 'Inactivo'}
    </span>
  </td>
  <td class="px-6 py-4 border-t border-gray-300 border-r align-middle text-center">
    <BotonEstado 
      estado={cuenta.ESTADO}
      id={cuenta.CUE_ID_PK}
      endpoint={endpoint}
      callback={actualizarCuentas}
    />
  </td>
  <td class="px-6 py-4 border-t border-gray-300 align-middle text-center">
    <BotonModalGenerico
      componente={EditarCuenta}
      textoBoton={"Editar"}
      titulo={"Editar Cuenta"}
      props={{ id: cuenta.CUE_ID_PK }}
    />
  </td>
</tr>
