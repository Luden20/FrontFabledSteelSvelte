<script>
    import { onMount } from 'svelte';
    import { authService } from "$lib/service/auth.service";
    import { authStore, initAuth } from "$lib/store/authStore";
    import { goto } from '$app/navigation';
    import CuentasItem from './componentes/CuentasItem.svelte';
    import Pagar from './componentes/Pagar.svelte';
    let pTotal=0;
    let IVA=0;
    let pTotalIVA=0
    let carrito=[];
    onMount(() => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    pTotal = carrito.reduce((acc, item) => acc + item.producto.PRD_PRECIO * item.cantidad, 0);
    IVA=pTotal * 0.15;
    pTotalIVA=pTotal * 1.15;
    });

  let rol= null;
  let usuario=null;
onMount(() => {
    initAuth();
    const unsubscribe = authStore.subscribe(($auth) => {
        rol = $auth.rol;
        usuario = $auth.usuario;
        if (rol !== 'cliente') {
            goto('/tienda');
        }
    });
    return unsubscribe;
    });
    
</script>
<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-10">
            <div class="card shopping-cart p-4">
                <div class="row">
                    <!-- Lista de productos -->
                    <div class="col-lg-6">
                        <h3 class="mb-4 text-center text-warning fw-bold">Tus Productos</h3>

                        <ul class="list-group">
                            {#each carrito as item}
                                <li class="list-group-item d-flex align-items-center mb-3">
                                    <img src={item.producto.imagen.IMG__URL} alt="imagen" class="img-fluid rounded me-3" style="width: 100px; height: 100px; object-fit: cover;" />
                                    <div>
                                        <h5 class="text-warning mb-0">{item.producto.PRD_NOMBRE}</h5>
                                        <small class="text-light">{item.producto.PRD_AUTOR}</small><br />
                                        <small class="text-light">{item.producto.PRD_DESCRIPCION}</small><br />
                                        <small class="text-light">Cantidad: {item.cantidad}</small><br />
                                        <strong class="text-light">Precio: {item.producto.PRD_PRECIO} $</strong>
                                    </div>
                                </li>
                            {/each}
                        </ul>

                        <hr class="my-3 border-warning" />

                        <div class="text-end text-warning">
                            <p>Subtotal: ${pTotal}</p>
                            <p>IVA (15%): ${IVA.toFixed(2)}</p>
                            <h5>Total: ${pTotalIVA.toFixed(2)}</h5>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        {#if usuario && usuario.cliente}
                        <div class="cliente-info-container mb-4">
                            <h4 class="text-center text-warning mb-3">Información del Cliente</h4>
                            <p><strong>Cédula:</strong> {usuario.cliente.CLI_CEDULA ?? "No disponible"}</p>
                            <p><strong>Nombre:</strong> {usuario.cliente.CLI_NOMBRE} {usuario.cliente.CLI_APELLIDO}</p>
                            <p><strong>Dirección:</strong> {usuario.cliente.CLI_DIRECCION}, C.P. {usuario.cliente.CLI_CODIGO_POSTAL}</p>
                            <p><strong>Teléfono:</strong> {usuario.cliente.CLI_CELULAR ?? "No disponible"}</p>
                        </div>
                        <div id="zona-pago">
                            {#if pTotal>0}
                            <Pagar cedula={usuario.cliente.CLI_CEDULA} total={pTotal} carrito={carrito} idCliente={usuario.cliente.CLI_ID_PK}/>
                            {:else}
                            <h1>No tienes nada en el carrito</h1>
                            {/if}
                        </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>


<style>


    h2, h3, h4, h5, .modal-title {
        font-family: 'Cinzel', serif;
        color: #B22222;
    }

    .shopping-cart {
        background-color: rgba(255, 255, 255, 0.95);
        border: 2px solid #B22222;
        border-radius: 1rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        color: #000;
    }

    .list-group-item {
        background-color: #ffffff;
        border: 1px solid #B22222;
        color: #000;
        border-radius: 0.5rem;
    }

    .cliente-info-container {
        background-color: rgba(255, 255, 255, 0.95);
        padding: 1rem;
        border: 2px solid #B22222;
        border-radius: 0.5rem;
        color: #000;
    }

    .text-warning,
    .text-light,
    .border-warning {
        color: #B22222 !important;
        border-color: #B22222 !important;
    }

    /* Tipografía */
    strong {
        color: #000;
    }
</style>
