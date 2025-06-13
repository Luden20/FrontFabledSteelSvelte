<svelte:head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/scripts/carrito.js"></script>
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
        generar_carrito();}
      ;
      document.body.appendChild(script);

  });

</script>

<div class="row justify-content-center">
  <div class="col-md-auto">
    <div class="row g-2 align-items-center">
      
      <div class="col-auto">
        <select bind:value={param} class="form-select">
          <option value="Nombre">Nombre</option>
          <option value="Autor">Autor</option>
        </select>
      </div>
      
      <div class="col-auto">
        <input 
          bind:value={buscado} 
          type="text" 
          class="form-control" 
          placeholder="Buscar..." 
        />
      </div>
      <button class="btn btn-outline-danger mt-3" on:click={() => {
        param = "Nombre";
        buscado = "";
        reloadKey += 1;
      }}>
        Limpiar Filtros
      </button>


    </div>
  </div>
</div>

        
{#key reloadKey}
  <TiendaLista {param} {buscado} productos={[]} />
{/key}

<Carrito/>


<!-- Tipografía y Estilo final -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
