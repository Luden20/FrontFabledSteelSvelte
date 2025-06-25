<script>
	import { onMount } from 'svelte';
	import { authStore } from '$lib/store/authStore';
	import TiendaLista from './componentes/TiendaLista.svelte';
	import Carrito from './componentes/Carrito.svelte';
	import Categoria from './componentes/Categoria.svelte';
	import DropdownPageSize from '../../componentesGenericos/DropdownPageSize.svelte';
	let param = 'Nombre';
	let buscado = '';
	let reloadKey = 0;
	let rol = null;
	let usuario = null;
	let categoria = -1;

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

	function buscarPorCategoria(idCat) {
		categoria = idCat;
		reloadKey += 1;
	}
</script>

<svelte:head>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
		rel="stylesheet"
	/>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
	></script>
	<script src="/scripts/carrito.js"></script>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container py-5">
	<div class="titulo-catalogo mb-5 text-center">
		<h2><i class="bi bi-book-half me-2"></i> Catálogo de Productos</h2>
		<div class="subrayado"></div>
	</div>

	<div class="row justify-content-center mb-4">
		<div class="col-12">
			<!-- Filtros en una sola fila -->
			<div class="d-flex align-items-end flex-wrap gap-3">
				<!-- Selector de filtro -->
				<div class="flex-grow-1" style="min-width: 180px;">
					<label
						for="filtro"
						class="form-label fw-bold"
						style="color: #B22222; font-family: 'Cinzel', serif;">Filtrar por</label
					>
					<select id="filtro" bind:value={param} class="form-select">
						<option value="Nombre">Nombre</option>
						<option value="Autor">Autor</option>
					</select>
				</div>

				<!-- Campo de búsqueda -->
				<div class="flex-grow-1" style="min-width: 200px;">
					<label
						for="busqueda"
						class="form-label fw-bold"
						style="color: #B22222; font-family: 'Cinzel', serif;">Buscar</label
					>
					<input
						id="busqueda"
						bind:value={buscado}
						type="text"
						class="form-control"
						placeholder="Buscar..."
					/>
				</div>

				<!-- Categoría -->
				<div class="flex-grow-1" style="min-width: 200px;">
					<Categoria callback={buscarPorCategoria} />
				</div>

				<!-- Botón Ver Todo -->
				<div style="min-width: 130px;">
					<button
						class="btn btn-outline-danger mt-4 w-100"
						on:click={() => {
							param = 'Nombre';
							buscado = '';
							categoria = -1;
							reloadKey += 1;
						}}
					>
						Ver Todo
					</button>
				</div>
				<div class="flex-grow-1" style="min-width: 200px;">
					<DropdownPageSize />
				</div>
			</div>
		</div>
	</div>

	<section class="pb-5">
		{#key reloadKey}
			<TiendaLista {param} {buscado} {categoria} productos={[]} />
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
		border: 1px solid #b22222;
		border-radius: 0.5rem;
		font-family: 'Lora', serif;
	}

	.form-control:focus,
	.form-select:focus {
		border-color: #b22222;
		box-shadow: 0 0 0 0.2rem rgba(178, 34, 34, 0.25);
	}

	.btn-outline-danger {
		border-radius: 999px;
		font-family: 'Cinzel', serif;
		font-weight: bold;
		background-color: white;
		color: #b22222;
		border: 2px solid #b22222;
		transition: all 0.2s ease-in-out;
	}

	.btn-outline-danger:hover {
		background-color: #b22222;
		color: #fff;
		transform: scale(1.03);
	}

	.titulo-catalogo h2 {
		font-family: 'Cinzel', serif;
		font-weight: bold;
		color: #b22222;
		font-size: 2.5rem;
		position: relative;
		animation: fadeIn 0.8s ease-in-out;
		display: inline-block;
	}

	.titulo-catalogo .subrayado {
		width: 120px;
		height: 4px;
		background-color: #b22222;
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
