<script>
  import { authService } from "$lib/service/auth.service";
  import { createEventDispatcher } from "svelte";
  import Resultado from "../../componentesGenericos/Resultado.svelte";

  const dispatch = createEventDispatcher();
  let resultado = null;

  function callback(respuesta, error) {
    resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
  }
  function soloNumeros(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
  }
  const handleSubmit = authService.register(callback);
</script>

<form on:submit={handleSubmit} class="needs-validation" novalidate>
  <div class="row">
    <div class="col-md-6 mb-3">
      <label for="CUE_NOMBRE">Nombre</label>
      <input
        type="text"
        class="form-control custom-input"
        id="CUE_NOMBRE"
        name="CUE_NOMBRE"
        placeholder="Ingrese su nombre"
        maxlength="30"
        required
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CUE_APELLIDO">Apellido</label>
      <input
        type="text"
        class="form-control custom-input"
        id="CUE_APELLIDO"
        name="CUE_APELLIDO"
        placeholder="Ingrese su apellido"
        maxlength="30"
        required
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CUE_FECHA_NACIMIENTO">Fecha de nacimiento</label>
      <input
        type="date"
        class="form-control custom-input"
        id="CUE_FECHA_NACIMIENTO"
        name="CUE_FECHA_NACIMIENTO"
        max="2025-06-10"
        required
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CLI_CEDULA">Cédula</label>
      <input
        type="text"
        class="form-control custom-input"
        id="CLI_CEDULA"
        name="CLI_CEDULA"
        maxlength="10"
        pattern="[0-9]{10}"
        placeholder="Ingrese su cédula"
        required
        on:input={soloNumeros}
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CLI_CELULAR">Celular</label>
      <input
        type="tel"
        class="form-control custom-input"
        id="CLI_CELULAR"
        name="CLI_CELULAR"
        maxlength="10"
        pattern="[0-9]{7,15}"
        placeholder="Ingrese su número de celular"
        required
        on:input={soloNumeros}
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CUE_EMAIL">Correo Electrónico</label>
      <input
        type="email"
        class="form-control custom-input"
        id="CUE_EMAIL"
        name="CUE_EMAIL"
        maxlength="30"
        placeholder="Ingrese su correo electrónico"
        required
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CUE_PASSWORD">Contraseña</label>
      <input
        type="password"
        class="form-control custom-input"
        id="CUE_PASSWORD"
        name="CUE_PASSWORD"
        maxlength="30"
        placeholder="Ingrese su contraseña"
        required
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CLI_DIRECCION">Dirección</label>
      <input
        type="text"
        class="form-control custom-input"
        id="CLI_DIRECCION"
        name="CLI_DIRECCION"
        maxlength="40"
        placeholder="Ingrese su dirección"
        required
      />
    </div>

    <div class="col-md-6 mb-3">
      <label for="CLI_CODIGO_POSTAL">Código Postal</label>
      <input
        type="text"
        class="form-control custom-input"
        id="CLI_CODIGO_POSTAL"
        name="CLI_CODIGO_POSTAL"
        maxlength="5"
        pattern="[0-9]{4,5}"
        placeholder="Ingrese su código postal"
        required
      />
    </div>
  </div>

  <div class="d-flex justify-content-center">
    <button type="submit" class="btn btn-fabled-red rounded-pill px-5">
      Registrar
    </button>
  </div>
</form>

{#if resultado}
  <Resultado mensaje={resultado.mensaje} />
{/if}
