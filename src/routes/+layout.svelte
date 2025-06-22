<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Lora&display=swap" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ajax-unobtrusive/3.2.6/jquery.unobtrusive-ajax.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/flowbite@1.6.5/dist/flowbite.min.js"></script>

</svelte:head>

<script>
  import '../app.css'; // Estilos generales
  import { authService } from "$lib/service/auth.service"; // Lógica para cerrar sesión, etc.
  import { onMount } from 'svelte'; // Hook al cargar el componente
  import { authStore, initAuth } from "$lib/store/authStore"; // Store reactivo de autenticación
  import Login from "./layoutCompontes/Login.svelte"; // Componente de login
  import Register from './layoutCompontes/Register.svelte'; // Componente de registro
  import { ToastContainer, FlatToast } from 'svelte-toasts'; // Notificaciones
  import { goto } from '$app/navigation'; // Redirección de páginas

  let rol = null;
  let usuario = null;
  let mostrarRegister = false;
  let mostrarLogin = false;


  // Suscripción al store para obtener rol y datos del usuario
  authStore.subscribe(($auth) => {
    rol = $auth.rol;
    usuario = $auth.usuario;
  });

  // Al cargar la página, refresca desde sessionStorage
  onMount(() => {
    initAuth();
  });
</script>


<!-- NAVBAR -->
<nav class="navbar shadow-sm z-3">
  <div class="container d-flex align-items-center justify-content-between">
    <!-- Logo clickeable que va al HOME real -->
    <a href="/" class="navbar-brand d-flex align-items-center">
      <img src="https://i.imgur.com/eOwWwYW.png" alt="Logo FabledSteel" class="d-block" style="height: 50px;">
    </a>

    <!-- Menú visible -->
    <ul class="navbar-nav d-flex flex-row align-items-center gap-3 m-0">
      <li class="nav-item">
        <a href="/" class="btn-fabled">
          <i class="bi bi-house-fill me-2"></i> Home
        </a>
      </li>

      {#if rol === "admin"}
        <li class="nav-item">
          <a href="/admin" class="btn-fabled">
            <i class="bi bi-speedometer2 me-2"></i> Panel
          </a>
        </li>
        <li class="nav-item">
          <span class="btn-fabled-disabled">
            <i class="bi bi-person-gear me-2"></i> Sitio de Administrador
          </span>
        </li>
        <li class="nav-item">
          <button class="btn-fabled-outline" on:click={() => authService.cerrarSesion()}>
            <i class="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
          </button>
        </li>

      {:else if rol === "cliente" && usuario}
        <li class="nav-item">
          <span class="btn-fabled-disabled">Bienvenido {usuario?.CUE_NOMBRE} {usuario?.CUE_APELLIDO}</span>
        </li>
        <li class="nav-item">
          <a href="/tienda" class="btn-fabled">
            <i class="bi bi-bag-fill me-2"></i> Tienda
          </a>
        </li>
        <li class="nav-item">
          <button class="btn-fabled-outline" on:click={() => authService.cerrarSesion()}>
            <i class="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
          </button>
        </li>

      {:else}
        <li class="nav-item">
          <a href="/tienda" class="btn-fabled">
            <i class="bi bi-bag-fill me-2"></i> Tienda
          </a>
        </li>
        <li class="nav-item">
          <button class="btn-fabled" on:click={() => mostrarLogin = true}>
            <i class="bi bi-box-arrow-in-right me-2"></i> Logearse
          </button>
        </li>
        <li class="nav-item">
          <button class="btn-fabled" on:click={() => mostrarRegister = true}>
            <i class="bi bi-person-plus me-2"></i> Registrarse
          </button>
        </li>
        <li class="nav-item"><span class="btn-fabled-disabled">DESLOGEADO</span></li>
      {/if}
    </ul>
  </div>
</nav>


<Register bind:mostrar={mostrarRegister} />
<Login bind:mostrar={mostrarLogin} on:logeado={() => authService.initSession()} />

<!-- PÁGINAS -->
<main class="container mt-4 mb-5">
  <slot />
</main>

<!-- FOOTER -->
<footer class="footer-glass text-center py-3 text-white mt-auto">
  <div class="container">
    <small>© 2025 FabledSteel. Todos los derechos reservados.</small>

    <div class="social-links mt-2">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <i class="bi bi-facebook me-2" aria-hidden="true"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <i class="bi bi-twitter me-2" aria-hidden="true"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <i class="bi bi-instagram" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</footer>

<ToastContainer let:data={data}>
  <FlatToast {data} />
</ToastContainer>

<style>
  :global(.navbar) {
    background-color: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(10px);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    z-index: 1060 !important;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }


  :global(.navbar .nav-link) {
    color: rgb(22, 3, 3) !important;
    display: inline-block;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  :global(.navbar-nav .nav-link:hover) {
    background-color: rgba(206, 4, 4, 0.15);
    transform: scale(1.07);
  }

  :global(.navbar-nav .nav-link:focus) {
    background-color: #B22222 !important;
    border-color: #ffffff;
    color: #d30808 !important;
  }

  :global(.navbar-brand img) {
    max-height: 70px;
    transition: transform 0.3s ease;
  }

  :global(.navbar-brand img:hover) {
    transform: scale(1.05);
  }

  :global(body) {
    background-image: url('https://i.imgur.com/G2ouTo5.jpeg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    min-height: 100vh;
  }

  :global(footer) {
    background-color: #7B1E1E;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
  }

  :global(.footer-glass) {
    border-top: 2px solid #B22222;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  :global(.footer-glass small) {
    color: rgba(255, 255, 255, 0.7);
  }

  :global(.social-links a) {
    font-size: 1.2rem;
    text-decoration: none;
    color: #fff;
    transition: color 0.3s ease;
  }

  :global(.social-links a:hover) {
    color: #B22222;
  }
  
  :global(.btn-fabled) {
    background-color: #B22222;
    color: white;
    border: none;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica', sans-serif;
    border-radius: 999px; /* bien ovalado */
    transition: all 0.2s ease-in-out;
    display: inline-block; /* esto es clave */
  }

  :global(.btn-fabled:hover) {
    background-color: #8B1A1A;
    transform: scale(1.05);
  }

  :global(.btn-fabled-outline) {
    border: 2px solid #B22222;
    background-color: transparent;
    color: #B22222;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    font-family: 'Lora', serif;
    border-radius: 999px; /* bien ovalado */
    transition: all 0.2s ease-in-out;
  }

  :global(.btn-fabled-outline:hover) {
    background-color: #B22222;
    color: white;
    transform: scale(1.05);
  }

  :global(.btn-fabled-disabled) {
    background-color: rgba(178, 34, 34, 0.1);
    color: #B22222;
    border: 2px solid #B22222;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    font-family: 'Segoe UI', 'Roboto', 'Helvetica', sans-serif;
    border-radius: 999px;
    cursor: default;
    opacity: 0.9;
    user-select: none;
  }

  :global(a.btn-fabled) {
    text-decoration: none;
  }

  :global(.nav-link),
  :global(.btn-fabled),
  :global(.btn-fabled-outline) {
    transition: all 0.2s ease-in-out;
  }
</style>
