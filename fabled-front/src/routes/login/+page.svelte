<script>
  import { authService } from "../../service/auth.service";
  import { initAuth } from "../../lib/authStore.js";

  let user = "";
  let password = "";

  async function enviarFormulario(e) {
    e.preventDefault();
    try {
      const res = await authService.login(user, password);
      initAuth();
      window.alert(`Respuesta: ${JSON.stringify(res)}`);
    } catch (err) {
      window.alert("Ocurrió un error durante el login.");
    }
  }
</script>
<main class="login-wrapper">
    <div class="login-card card border-2 border-danger text-black p-4">
        <h2 class="text-center text-danger mb-4" style="font-family: 'Cinzel', serif;">Inicio de Sesión</h2>
        <form on:submit={enviarFormulario}>
                <label for="usuario" class="form-label">Email</label>
  <input type="text" class="form-control" id="usuario" name="usuario" required placeholder="Ingrese su email" maxlength="30"bind:value={user} />

                <label for="password" class="form-label">Contraseña</label>
  <input type="password" class="form-control" id="password" name="password" required placeholder="Ingrese su contraseña" maxlength="30"  bind:value={password} />

         <div class="d-flex justify-content-center mt-3">
             <button type="submit" class="btn btn-danger rounded-pill px-4">Ingresar</button>
         </div></form>
    </div>
    
</main>


<style>    .form-label {
        font-family: 'Cinzel', serif;
        font-weight: bold;
        color: #B22222;
    }

    .form-control {
        background-color: #fff;
        color: #000;
        border: 1px solid #B22222;
    }

        .form-control::placeholder {
            color: #777;
        }

        .form-control:focus {
            border-color: #B22222;
            box-shadow: 0 0 0 0.25rem rgba(178, 34, 34, 0.25);
        }

    .btn-danger {
        background-color: #B22222;
        border: none;
        font-family: 'Cinzel', serif;
        font-weight: bold;
        transition: all 0.3s ease;
    }

        .btn-danger:hover {
            background-color: #7B1E1E;
            color: white;
        }
</style>