<script>
    import { API } from "$lib/service/apis.service";
    import { actualizarProductosAdmin } from "$lib/store/productosStore";
    import { onMount } from "svelte";
    import ToastGenerico from "../../../../componentesGenericos/ToastGenerico.svelte";
    export let id;
    let resultado = null;
    let producto = null;
    let categorias = [];

    onMount(async () => {
        categorias = await API.GET(`/categoria/all`, true);
        producto = await API.GET(`/productos/${id}`, false);
    });

    function callback(respuesta, error) {
        resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
        actualizarProductosAdmin();
    }

    function transfomarProductoEditado(data) {
        const catsNuevas = JSON.parse(data.categoriasJson).map(cat => parseInt(cat));
        const catsBorrar = JSON.parse(data.categoriasEliminadasJson).map(cat => parseInt(cat));
        const imgsBorrar = JSON.parse(data.imagenesEliminadasJson).map(img => parseInt(img));
        const nuevaUrls = JSON.parse(data.imagenesJson);

        const prd = {
            PRD_ID_PK: data.PRD_ID_PK,
            PRD_NOMBRE: data.PRD_NOMBRE,
            PRD_DESCRIPCION: data.PRD_DESCRIPCION,
            PRD_AUTOR: data.PRD_AUTOR,
            PRD_PRECIO: parseFloat(data.PRD_PRECIO) || 0,
            PRD_STOCK: parseInt(data.PRD_STOCK) || 0,
            ESTADO: "ACT",
        };

        return { prd, catsNuevas, catsBorrar, imgsBorrar, nuevaUrls };
    }

    const handleSubmit = API.FORMCALL(`/productos`, `PUT`, callback, true, transfomarProductoEditado);
</script>

{#if producto}
<form on:submit={handleSubmit} class="registro-form needs-validation" novalidate>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="PRD_NOMBRE" class="form-label">Nombre</label>
            <input value={producto.PRD_NOMBRE} class="form-control" id="PRD_NOMBRE" name="PRD_NOMBRE" type="text" required />
        </div>

        <div class="col-md-6 mb-3">
            <label for="PRD_DESCRIPCION" class="form-label">Descripción</label>
            <input value={producto.PRD_DESCRIPCION} class="form-control" id="PRD_DESCRIPCION" name="PRD_DESCRIPCION" type="text" required />
        </div>

        <div class="col-md-6 mb-3">
            <label for="PRD_AUTOR" class="form-label">Autor</label>
            <input value={producto.PRD_AUTOR} class="form-control" id="PRD_AUTOR" name="PRD_AUTOR" type="text" required />
        </div>

        <div class="col-md-6 mb-3">
            <label for="PRD_PRECIO" class="form-label">Precio</label>
            <input value={producto.PRD_PRECIO} class="form-control" id="PRD_PRECIO" name="PRD_PRECIO" type="number" min="0.01" step="0.01" inputmode="decimal" required />
        </div>

        <div class="col-md-6 mb-3">
            <label for="PRD_STOCK" class="form-label">Stock</label>
            <input value={producto.PRD_STOCK} class="form-control" id="PRD_STOCK" name="PRD_STOCK" type="number" min="1" step="1" required />
        </div>

        <div class="col-md-6 mb-3">
            <label for="ESTADO" class="form-label">Estado</label>
            <input value={producto.ESTADO} class="form-control" id="ESTADO" name="ESTADO" type="text" readonly />
        </div>
    </div>

    <hr class="my-4 border-danger">

    <label for="nueva_imagen_url" class="form-label">Agregar Imagen (URL)</label>
    <div id="categorias_asignadas" class="mb-3">
        {#each producto.categoria as categoria}
            <span class="badge-fabled m-1">
            {categoria.CAT_NOMBRE}
            <button type="button" on:click={() => eliminarTagExistente(categoria.CAT_ID_PK)} class="btn-close btn-close-white btn-sm ms-2" aria-label="Eliminar"></button>
            </span>
        {/each}
    </div>

    <label for="categoriaSelect" class="form-label">Agregar Categoría</label>
    <div class="d-flex mb-3">
        <select id="categoriaSelect" class="form-select me-2">
            {#each categorias as categoria}
                <option value={categoria.CAT_ID_PK}>{categoria.CAT_NOMBRE}</option>
            {/each}
        </select>
        <button type="button" class="btn-fabled-outline" on:click={agregarCategoria}>Agregar</button>
    </div>

    <label for="nueva_imagen_url" class="form-label">Agregar Imagen (URL)</label>
    <div id="imagenes_asignadas" class="mb-4">
        {#each producto.imagenes as imagen}
            <div class="d-inline-block position-relative m-2">
                <img src={imagen.IMG__URL} style="width:100px; height:100px; object-fit:cover;">
                <button type="button" class="btn-close btn-sm position-absolute top-0 end-0" aria-label="Eliminar" on:click={() => eliminarImgExistente(imagen.IMG_ID_PK)}></button>
            </div>
        {/each}
    </div>

    <label for="nueva_imagen_url" class="form-label">Agregar Imagen (URL)</label>
    <div class="d-flex mb-3">
        <input type="text" id="nueva_imagen_url" class="form-control me-2" placeholder="URL de imagen">
        <button type="button" class="btn-fabled-outline" on:click={agregarIMG()}>Agregar</button>
    </div>

    <ul id="listaURL" class="list-unstyled"></ul>

    <input type="hidden" name="PRD_ID_PK" id="PRD_ID_PK" value={producto.PRD_ID_PK}>
    <input type="hidden" name="imagenesJson" id="imagenesJson" value="[]">
    <input type="hidden" name="categoriasJson" id="categoriasJson" value="[]">
    <input type="hidden" name="categoriasEliminadasJson" id="categoriasEliminadasJson" value="[]">
    <input type="hidden" name="imagenesEliminadasJson" id="imagenesEliminadasJson" value="[]">

    <div class="d-flex justify-content-center">
        {#if !resultado}
            <input type="submit" value="Guardar Cambios" class="btn-fabled px-5">
        {/if}
    </div>
</form>
{:else}
<h6>Cargando...</h6>
{/if}

{#if resultado}
  <ToastGenerico mensaje={resultado.mensaje} exito={resultado.exito} />
{/if}

<style>
  .registro-form {
    padding: 0.5rem;
    font-family: 'Lora', serif;
  }

  .form-label {
    font-family: 'Cinzel', serif;
    font-weight: bold;
    color: #B22222;
  }

  .form-control {
    background-color: #fff;
    color: #000;
    border: 1px solid #B22222;
    border-radius: 0.5rem;
  }

  .form-control::placeholder {
    color: #777;
  }

  .form-control:focus {
    border-color: #B22222;
    box-shadow: 0 0 0 0.25rem rgba(178, 34, 34, 0.25);
  }

  .btn-fabled {
    border: none;
    background-color: #B22222;
    color: #fff;
    border-radius: 999px;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .btn-fabled:hover {
    background-color: #7B1E1E;
    transform: scale(1.05);
  }

    .badge-fabled {
    background-color: #B22222;
    color: #fff;
    font-weight: bold;
    font-size: 0.9rem;
    padding: 0.5em 0.8em;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    }

    .btn-fabled-outline {
    border: 2px solid #B22222;
    background-color: #fff;
    color: #B22222;
    border-radius: 999px;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    transition: all 0.3s ease;
    }

    .btn-fabled-outline:hover {
    background-color: #B22222;
    color: #fff;
    transform: scale(1.05);
    }

    .badge-fabled-outline {
        background-color: transparent;
        color: #B22222;
        border: 2px solid #B22222;
        font-weight: bold;
        font-size: 0.9rem;
        padding: 0.5em 0.8em;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        }

</style>
