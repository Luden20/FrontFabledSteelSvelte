<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Lora&display=swap" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ajax-unobtrusive/3.2.6/jquery.unobtrusive-ajax.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/flowbite@1.6.5/dist/flowbite.min.js"></script>

</svelte:head>

<script>
  import '../app.css';
  import { authService } from "$lib/service/auth.service";
  import { onMount } from 'svelte';
  import { authStore, initAuth } from "$lib/store/authStore";
  import Login from "./layoutCompontes/Login.svelte";
	import Register from './layoutCompontes/Register.svelte';
  let rol = null;
  let usuario = null;

  // Actualiza las variables locales cuando cambie el store
  authStore.subscribe(($auth) => {
    rol = $auth.rol;
    usuario = $auth.usuario;
  });

  // Refresca la información desde sessionStorage al montar
  onMount(() => {
    initAuth();
  });



</script>

<!-- NAVBAR -->
<nav class="navbar sticky-top bg-white shadow-sm z-3">
  <div class="container">
    <a href="/home" class="navbar-brand">
      <img src="https://i.imgur.com/eOwWwYW.png" alt="Logo FabledSteel" class="d-block d-sm-none" style="height: 30px;">
      <img src="https://i.imgur.com/eOwWwYW.png" alt="Logo FabledSteel" class="d-none d-sm-block" style="height: 50px;">
    </a>
    
          {#if rol === "admin"&& usuario!=null}
          <li class="nav-item">
            <a class="nav-link" href="/panel">Panel</a>
          </li>
          <li class="nav-item">
            <span class="nav-link text-danger">ADMIN</span>
          </li>
          <li class="nav-item">
            <button class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;" on:click={() => authService.cerrarSesion()}>Cerrar Sesión</button>
          </li>
        {:else if rol === "cliente"&& usuario!==null}
          <li class="nav-item">
            <span class="nav-link text-success">Bienvenido {usuario?.CUE_NOMBRE} {usuario?.CUE_APELLIDO}</span>
                  </li>
        <li class="nav-item">
          <a href="/tienda" class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;">Tienda</a>
        </li>

          <li class="nav-item">
            <button class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;" on:click={() => authService.cerrarSesion()}>Cerrar Sesión</button>
          </li>

        {:else}
        <li class="nav-item">
          <a href="/tienda" class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;">Tienda</a>
        </li>
          <li class="nav-item">
            <Login />
          </li>
          <li class="nav-item">
            <Register />
          </li>

          <li class="nav-item">
            <span class="nav-link text-muted">DESLOGEADO</span>
          </li>
        {/if}
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
                  <li class="nav-item">
            <a class="nav-link" href="/panel">Panel</a>
          </li>
      </ul>
    </div>
  </div>
</nav>


<!-- PÁGINAS -->
<main class="container mt-4 mb-5">
  <slot />
</main>

<!-- FOOTER -->
<footer class="footer-glass text-center py-3 text-white mt-auto">
  <div class="container">
    <small>© 2025 FabledSteel. Todos los derechos reservados.</small>
    <div class="social-links mt-2">
      <a href="#"><i class="bi bi-facebook me-2"></i></a>
      <a href="#"><i class="bi bi-twitter me-2"></i></a>
      <a href="#"><i class="bi bi-instagram"></i></a>
    </div>
  </div>
</footer>

<style>
  
        /* === NAVBAR FIJA === */
                .navbar {
                  position: sticky;
                  top: 0;
                  z-index: 1055; /* más alto que el modal */
                  background-color: #d87272 !important;
                  color: white;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                    z-index: 1060 !important;

                }
                .navbar .nav-link {
                  color: rgb(22, 3, 3) !important;
                }


            .navbar-nav .nav-link:hover {
                background-color: rgba(206, 4, 4, 0.15);
                transform: scale(1.07);
            }

            .navbar-nav .nav-link:focus {
                background-color: #B22222 !important;
                border-color: #ffffff;
                color: #d30808 !important;
            }

        .navbar-brand img {
            max-height: 70px;
            transition: transform 0.3s ease;
        }

            .navbar-brand img:hover {
                transform: scale(1.05);
            }

        /* === CUERPO Y FONDO === */
        body {
            background-image: url('https://i.imgur.com/G2ouTo5.jpeg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            min-height: 100vh;
        }

        /* === FOOTER PEGADO === */
        footer {
            background-color: #7B1E1E;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 0.9rem;
        }

        .footer-glass {
            border-top: 2px solid #B22222;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

            .footer-glass small {
                color: rgba(255, 255, 255, 0.7);
            }

        .social-links a {
            font-size: 1.2rem;
            text-decoration: none;
            color: #fff;
            transition: color 0.3s ease;
        }

            .social-links a:hover {
                color: #B22222;
            }
            
</style>
