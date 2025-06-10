<script>
    import BotonEstado from "../../../../componentesGenericos/BotonEstado.svelte";
    import { actualizarCuentas } from "$lib/store/cuentasStore";
    import BotonModalGenerico from "../../../../componentesGenericos/BotonModalGenerico.svelte";
    export let cuenta;
    import EditarCuenta from "./EditarCuenta.svelte";
    let endpoint="/cuentaCliente";
</script>
<tr>
    <td>{cuenta.CUE_NOMBRE} {cuenta.CUE_APELLIDO}</td>
    <td>{cuenta.cliente.CLI_CEDULA}</td>
    <td>{cuenta.cliente.CLI_DIRECCION}</td>
    <td>{cuenta.cliente.CLI_CELULAR}</td>
    <td>{cuenta.CUE_FECHA_CREACION}</td>
    <td>{cuenta.CUE_EMAIL}</td>
    <td>{cuenta.ESTADO}</td>
    <td> 
      <BotonEstado 
        estado={cuenta.ESTADO}
        id={cuenta.CUE_ID_PK}
        endpoint={endpoint}
        callback={actualizarCuentas}
      />
    </td>
    <td>
      <BotonModalGenerico
        componente={EditarCuenta}
        textoBoton={"Editar"}
        titulo={"Editar Cuenta"}
        props={{id:cuenta.CUE_ID_PK}}
      />
    </td>
</tr>