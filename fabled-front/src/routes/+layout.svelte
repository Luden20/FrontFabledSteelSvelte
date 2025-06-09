<script>
	import '../app.css';
	import 'flowbite';
	import { authService } from '../service/auth.service';
	import { onMount } from 'svelte';
	import { authStore, initAuth } from '../store/authStore';
	import Login from './layoutCompontes/Login.svelte';

        let rol = null;
        let usuario = null;
        let menuOpen = false;

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

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
	/>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Lora&display=swap"
		rel="stylesheet"
	/>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ajax-unobtrusive/3.2.6/jquery.unobtrusive-ajax.min.js"
	></script>
</svelte:head>

<!-- NAVBAR -->

<nav class="sticky top-0 z-50 bg-red-700 text-white">
        <div class="container mx-auto flex items-center justify-between px-4 py-2">
                <a href="/home" class="flex items-center">
                        <img src="https://i.imgur.com/eOwWwYW.png" alt="Logo FabledSteel" class="h-8 sm:h-12" />
                </a>
                <button class="md:hidden focus:outline-none" on:click={() => (menuOpen = !menuOpen)}>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                </button>
                <ul class="hidden md:flex items-center space-x-4">
                        {#if rol === 'admin' && usuario != null}
                                <li><a href="/panel" class="hover:underline">Panel</a></li>
                                <li><span class="text-red-300">ADMIN</span></li>
                                <li>
                                        <button class="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100" on:click={() => authService.cerrarSesion()}>Cerrar Sesión</button>
                                </li>
                        {:else if rol === 'cliente' && usuario !== null}
                                <li><span class="text-green-200">Bienvenido {usuario?.CUE_NOMBRE} {usuario?.CUE_APELLIDO}</span></li>
                                <li>
                                        <a href="/tienda" class="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100">Tienda</a>
                                </li>
                                <li>
                                        <button class="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100" on:click={() => authService.cerrarSesion()}>Cerrar Sesión</button>
                                </li>
                        {:else}
                                <li>
                                        <a href="/tienda" class="bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100">Tienda</a>
                                </li>
                                <li><Login /></li>
                                <li><a href="/registrarse" class="hover:underline">Registrarse</a></li>
                                <li><span class="text-gray-300">DESLOGEADO</span></li>
                        {/if}
                </ul>
        </div>
        <ul class={`md:hidden ${menuOpen ? 'block' : 'hidden'} px-4 pb-2 space-y-2 bg-red-700`}>
                {#if rol === 'admin' && usuario != null}
                        <li><a href="/panel" class="block py-1">Panel</a></li>
                        <li><span class="block py-1 text-red-300">ADMIN</span></li>
                        <li>
                                <button class="w-full bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100" on:click={() => authService.cerrarSesion()}>Cerrar Sesión</button>
                        </li>
                {:else if rol === 'cliente' && usuario !== null}
                        <li><span class="block py-1 text-green-200">Bienvenido {usuario?.CUE_NOMBRE} {usuario?.CUE_APELLIDO}</span></li>
                        <li>
                                <a href="/tienda" class="block bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100">Tienda</a>
                        </li>
                        <li>
                                <button class="w-full bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100" on:click={() => authService.cerrarSesion()}>Cerrar Sesión</button>
                        </li>
                {:else}
                        <li>
                                <a href="/tienda" class="block bg-white text-red-700 px-3 py-1 rounded hover:bg-red-100">Tienda</a>
                        </li>
                        <li><Login /></li>
                        <li><a href="/registrarse" class="block py-1 hover:underline">Registrarse</a></li>
                        <li><span class="block py-1 text-gray-300">DESLOGEADO</span></li>
                {/if}
        </ul>
</nav>
<!-- PÁGINAS -->
<main class="container mt-4 mb-5">
	<slot />
</main>

<!-- FOOTER -->
<footer class="footer-glass mt-auto py-3 text-center text-white">
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
                background-color: #7b1e1e;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 0.9rem;
        }

        .footer-glass {
                border-top: 2px solid #b22222;
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
                color: #b22222;
        }
</style>
