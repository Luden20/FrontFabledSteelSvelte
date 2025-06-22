<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/scripts/carrito.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { authStore, initAuth } from "$lib/store/authStore";
  import TiendaLista from "./componentes/TiendaLista.svelte";
  import Carrito from './componentes/Carrito.svelte';

  let param = "Nombre";
  let buscado = "";
  let reloadKey = 0;
  let rol = null;
  let usuario = null;

  authStore.subscribe(($auth) => {
    rol = $auth.rol;
    usuario = $auth.usuario;
  });

  onMount(() => {
    const script = document.createElement('script');
    script.src = '/scripts/carrito.js';
    script.onload = () => {
      prepararCarrito();
      generar_carrito();
    };
    document.body.appendChild(script);
  });
</script>

<div class="container py-5">
  <div class="titulo-catalogo text-center mb-5">
    <h2>
      <i class="bi bi-book-half me-2"></i> Catálogo de Productos
    </h2>
    <div class="subrayado"></div>
  </div>

  <div class="row justify-content-center mb-4">
    <div class="col-md-10">
      <div class="row g-3 align-items-end">
        <div class="col-md-3">
          <label for="filtro" class="form-label fw-bold" style="color: #B22222; font-family: 'Cinzel', serif;">Filtrar por</label>
          <select id="filtro" bind:value={param} class="form-select">
            <option value="Nombre">Nombre</option>
            <option value="Autor">Autor</option>
          </select>
        </div>

        <div class="col-md-5">
          <label for="busqueda" class="form-label fw-bold" style="color: #B22222; font-family: 'Cinzel', serif;">Buscar</label>
          <input id="busqueda" bind:value={buscado} type="text" class="form-control" placeholder="Buscar..." />
        </div>

        <div class="col-md-4 d-grid">
          <button class="btn btn-outline-danger mt-4" on:click={() => {
            param = "Nombre";
            buscado = "";
            reloadKey += 1;
          }}>
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
  </div>

  <section class="pb-5">
    {#key reloadKey}
      <TiendaLista {param} {buscado} productos={[]} />
    {/key}
  </section>
</div>

<Carrito />

<style>
  h2 {
    font-size: 2rem;
  }

  .form-select,
  .form-control {
    border: 1px solid #B22222;
    border-radius: 0.5rem;
    font-family: 'Lora', serif;
  }

  .form-control:focus,
  .form-select:focus {
    border-color: #B22222;
    box-shadow: 0 0 0 0.2rem rgba(178, 34, 34, 0.25);
  }

  .btn-outline-danger {
    border-radius: 999px;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    background-color: white; /* 🎯 fondo blanco */
    color: #B22222;           /* 🎯 texto rojo */
    border: 2px solid #B22222;
    transition: all 0.2s ease-in-out;
  }

  .btn-outline-danger:hover {
    background-color: #B22222; /* rojo en hover */
    color: #fff;
    transform: scale(1.03);
  }


  .titulo-catalogo h2 {
    font-family: 'Cinzel', serif;
    font-weight: bold;
    color: #B22222;
    font-size: 2.5rem;
    position: relative;
    animation: fadeIn 0.8s ease-in-out;
    display: inline-block;
  }

  .titulo-catalogo .subrayado {
    width: 120px;
    height: 4px;
    background-color: #B22222;
    margin: 0.5rem auto 0;
    border-radius: 999px;
    opacity: 0.8;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

</style>
