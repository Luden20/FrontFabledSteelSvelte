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
<nav class="navbar sticky-top bg-white shadow-sm z-3">
  <div class="container">
    <!-- Logo para responsive (30px en móvil, 50px en desktop) -->
    <a href="/home" class="navbar-brand">
      <img src="https://i.imgur.com/eOwWwYW.png" alt="Logo FabledSteel" class="d-block d-sm-none" style="height: 30px;">
      <img src="https://i.imgur.com/eOwWwYW.png" alt="Logo FabledSteel" class="d-none d-sm-block" style="height: 50px;">
    </a>

    <!-- Botón hamburguesa para menú colapsable -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menú dependiendo del rol del usuario -->
    {#if rol === "admin"}
      <!-- Enlaces de administrador -->
      <li class="nav-item"><a class="nav-link" href="/admin">Panel</a></li>
      <li class="nav-item"><span class="nav-link text-danger">ADMIN</span></li>
      <li class="nav-item">
        <button class="btn btn-sm ms-2 mt-1" style="background-color:#B22222; color:#FFFFFF;" on:click={authService.cerrarSesion()}>Cerrar Sesión</button>
      </li>
    {:else if rol === "cliente" && usuario !== null}
      <!-- Enlaces para clientes logueados -->
      <li class="nav-item"><span class="nav-link text-success">Bienvenido {usuario?.CUE_NOMBRE} {usuario?.CUE_APELLIDO}</span></li>
      <li class="nav-item"><a href="/tienda" class="btn btn-sm ms-2 mt-1" style="...">Tienda</a></li>
      <li class="nav-item"><button class="btn btn-sm ms-2 mt-1" style="...">Cerrar Sesión</button></li>
    {:else}
      <!-- Enlaces para no autenticados -->
      <li class="nav-item"><a href="/tienda" class="btn btn-sm ms-2 mt-1" style="...">Tienda</a></li>
      <li class="nav-item"><Login /></li>
      <li class="nav-item"><Register /></li>
      <li class="nav-item"><span class="nav-link text-muted">DESLOGEADO</span></li>
    {/if}

    <!-- Contenedor colapsable -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto"></ul>
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
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    z-index: 1060 !important;
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
  
</style>
