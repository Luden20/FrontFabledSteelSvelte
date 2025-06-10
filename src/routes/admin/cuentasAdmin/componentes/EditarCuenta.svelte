<script>
    import { API } from "$lib/service/apis.service";
    import { onMount } from "svelte";
    import { cuentas,actualizarCuentas } from "$lib/store/cuentasStore";
    export let id;

    let cuenta = null;
    let resultado = null;

    // Formatea "YYYY-MM-DDTHH:mm:ss.sssZ" → "YYYY-MM-DD"
    function toDateOnly(isoString) {
        return isoString ? isoString.slice(0, 10) : '';
    }

    function transformarCuenta(datos) {
        const cuenta = {
            CUE_ID_PK: Number(datos.CUE_ID_PK),
            CLI_ID_PK: Number(datos.CLI_ID_PK),
            CUE_NOMBRE: datos.CUE_NOMBRE,
            CUE_APELLIDO: datos.CUE_APELLIDO,
            CUE_EMAIL: datos.CUE_EMAIL,
            CUE_PASSWORD: datos.CUE_PASSWORD,
            CUE_FECHA_NACIMIENTO: datos.CUE_FECHA_NACIMIENTO,
            CUE_FECHA_CREACION: datos.CUE_FECHA_CREACION || new Date().toISOString(),
            ESTADO: datos.ESTADO || 'ACT',
            cliente: {
                CLI_ID_PK: Number(datos.CLI_ID_PK),
                CLI_NOMBRE: datos.CLI_NOMBRE,
                CLI_APELLIDO: datos.CLI_APELLIDO,
                CLI_DIRECCION: datos.CLI_DIRECCION,
                CLI_CODIGO_POSTAL: datos.CLI_CODIGO_POSTAL,
                CLI_CELULAR: datos.CLI_CELULAR,
                CLI_CEDULA: datos.CLI_CEDULA,
                ESTADO: datos.ESTADO || 'ACT'
            }
        };
        console.log(cuenta);
        return cuenta;
    }

    function callback(respuesta, error) {
        resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
        actualizarCuentas();
    }

    onMount(async () => {
        cuenta = await API.GET(`/cuentaCliente/cue/${id}`, true);
    });

    const handleSubmit = API.FORMCALL(`/cuentaCliente`, `PUT`, callback, true, transformarCuenta);
</script>

{#if cuenta}
<form on:submit={handleSubmit}>
    <input type="hidden" name="CUE_ID_PK" value={cuenta.CUE_ID_PK} />
    <input type="hidden" name="CLI_ID_PK" value={cuenta.cliente?.CLI_ID_PK} />

    <hr class="border-danger">
    <div class="mb-3">
        <label class="form-label" for="CUE_PASSWORD">Password</label>
        <input class="form-control custom-input" id="CUE_PASSWORD" name="CUE_PASSWORD" type="text" value={cuenta.CUE_PASSWORD} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CUE_NOMBRE">Nombre</label>
        <input class="form-control custom-input" id="CUE_NOMBRE" name="CUE_NOMBRE" type="text" value={cuenta.CUE_NOMBRE} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CUE_APELLIDO">Apellido</label>
        <input class="form-control custom-input" id="CUE_APELLIDO" name="CUE_APELLIDO" type="text" value={cuenta.CUE_APELLIDO} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CUE_FECHA_NACIMIENTO">Fecha de Nacimiento</label>
        <input class="form-control custom-input" id="CUE_FECHA_NACIMIENTO" name="CUE_FECHA_NACIMIENTO" type="date" value={toDateOnly(cuenta.CUE_FECHA_NACIMIENTO)} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CUE_FECHA_CREACION">Fecha de Creación</label>
        <input class="form-control custom-input" id="CUE_FECHA_CREACION" name="CUE_FECHA_CREACION" type="date" value={toDateOnly(cuenta.CUE_FECHA_CREACION)} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CUE_EMAIL">Email</label>
        <input class="form-control custom-input" id="CUE_EMAIL" name="CUE_EMAIL" type="email" value={cuenta.CUE_EMAIL} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="ESTADO">Estado</label>
        <input class="form-control custom-input" id="ESTADO" name="ESTADO" type="text" value={cuenta.ESTADO} />
    </div>

    <h4 class="text-danger mt-4">Cliente</h4>
    <hr class="border-danger">
    <div class="mb-3">
        <label class="form-label" for="CLI_NOMBRE">Nombre Cliente</label>
        <input class="form-control custom-input" id="CLI_NOMBRE" name="CLI_NOMBRE" type="text" value={cuenta.cliente?.CLI_NOMBRE} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CLI_APELLIDO">Apellido Cliente</label>
        <input class="form-control custom-input" id="CLI_APELLIDO" name="CLI_APELLIDO" type="text" value={cuenta.cliente?.CLI_APELLIDO} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CLI_DIRECCION">Dirección Cliente</label>
        <input class="form-control custom-input" id="CLI_DIRECCION" name="CLI_DIRECCION" type="text" value={cuenta.cliente?.CLI_DIRECCION} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CLI_CODIGO_POSTAL">Código Postal</label>
        <input class="form-control custom-input" id="CLI_CODIGO_POSTAL" name="CLI_CODIGO_POSTAL" type="text" value={cuenta.cliente?.CLI_CODIGO_POSTAL} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CLI_CELULAR">Celular</label>
        <input class="form-control custom-input" id="CLI_CELULAR" name="CLI_CELULAR" type="text" value={cuenta.cliente?.CLI_CELULAR} />
    </div>
    <div class="mb-3">
        <label class="form-label" for="CLI_CEDULA">Cédula</label>
        <input class="form-control custom-input" id="CLI_CEDULA" name="CLI_CEDULA" type="text" value={cuenta.cliente?.CLI_CEDULA} />
    </div>

    <div class="d-flex justify-content-between mt-4">
        <input type="submit" value="Guardar" class="btn btn-outline-danger px-4" />
        <a href="/Cuenta" class="btn btn-outline-light px-4">Cancelar</a>
    </div>
</form>
{/if}

{#if resultado}
  <p>{resultado.mensaje}</p>
{/if}
