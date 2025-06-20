<svelte:head>
  <script src="/scripts/crearProducto.js"></script>
</svelte:head>

<script>
  import Resultado from "../../../../componentesGenericos/Resultado.svelte";
  import { API } from "$lib/service/apis.service";
  import { productos, actualizarProductosAdmin } from "$lib/store/productosStore";
  import { onMount } from "svelte";
  import ToastGenerico from "../../../../componentesGenericos/ToastGenerico.svelte";

  let categorias = [];
  let resultado = null;

  onMount(async () => {
    categorias = await API.GET(`/categoria/all`, true);
  });

  function callback(respuesta, error) {
    resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
    actualizarProductosAdmin();
  }

  function transformarProducto(data) {
    const imagenes = JSON.parse(data.imagenesJson);
    const categoriasJson = JSON.parse(data.categoriasJson);
    const categorias = categoriasJson.map(cat => parseInt(cat.id));
    const prd = {
      PRD_ID_PK: 0,
      PRD_NOMBRE: data.PRD_NOMBRE,
      PRD_DESCRIPCION: data.PRD_DESCRIPCION,
      PRD_AUTOR: data.PRD_AUTOR,
      PRD_PRECIO: parseFloat(data.PRD_PRECIO) || 0,
      PRD_STOCK: parseInt(data.PRD_STOCK) || 0,
      ESTADO: "ACT",
    };
    return {
      prd,
      categorias: categorias.map(id => parseInt(id)),
      imagenes
    }
  }

  const handleSubmit = API.FORMCALL(`/productos`, `POST`, callback, true, transformarProducto);
</script>

<form on:submit={handleSubmit} class="registro-form">
  <div class="mb-3">
    <label for="PRD_NOMBRE" class="form-label">Nombre</label>
    <input class="form-control" id="PRD_NOMBRE" name="PRD_NOMBRE" type="text" required />
  </div>

  <div class="mb-3">
    <label for="PRD_DESCRIPCION" class="form-label">Descripción</label>
    <input class="form-control" id="PRD_DESCRIPCION" name="PRD_DESCRIPCION" type="text" required />
  </div>

  <div class="mb-3">
    <label for="PRD_AUTOR" class="form-label">Autor</label>
    <input class="form-control" id="PRD_AUTOR" name="PRD_AUTOR" type="text" value="N/A" required />
  </div>

  <div class="mb-3">
    <label for="PRD_PRECIO" class="form-label">Precio</label>
    <input class="form-control" id="PRD_PRECIO" name="PRD_PRECIO" type="number" min="0.01" step="0.01" required />
  </div>

  <div class="mb-3">
    <label for="PRD_STOCK" class="form-label">Stock</label>
    <input class="form-control" id="PRD_STOCK" name="PRD_STOCK" type="number" min="1" required />
  </div>

  <div class="mb-3">
    <label for="categoriaSelect" class="form-label">Categorías</label>
    <select id="categoriaSelect" name="categoria" class="form-select me-2">
      {#each categorias as categoria}
        <option value={categoria.CAT_ID_PK}>{categoria.CAT_NOMBRE}</option>
      {/each}
    </select>
    <button type="button" class="btn-fabled-outline mt-2" on:click={agregarCategoria}>Agregar Categoría</button>
    <div id="tagsCategorias" class="mt-3"></div>
  </div>

  <div class="mb-3">
    <label for="inputImgs" class="form-label">URL de Imagen</label>
    <input type="text" id="inputImgs" placeholder="URL IMGS" class="form-control" maxlength="500">
    <button type="button" class="btn-fabled-outline mt-2" on:click={agregarIMG}>Agregar Imagen</button>
    <ul id="listaURL" class="mt-3"></ul>
  </div>

  <input type="hidden" name="imagenesJson" id="imagenesJson">
  <input type="hidden" name="categoriasJson" id="categoriasJson">

  {#if !resultado}
    <div class="text-center mt-4">
      <input type="submit" value="Crear Producto" class="btn-fabled px-5">
    </div>
  {/if}
</form>

{#if resultado}
  <ToastGenerico mensaje={resultado.mensaje} exito={resultado.exito} />
{/if}

<style>
  .registro-form {
    padding: 1rem;
    font-family: 'Lora', serif;
  }

  .form-label {
    font-family: 'Cinzel', serif;
    font-weight: bold;
    color: #B22222;
  }

  .form-control, .form-select {
    background-color: #fff;
    color: #000;
    border: 1px solid #B22222;
    border-radius: 0.5rem;
  }

  .form-control:focus, .form-select:focus {
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

  #tagsCategorias span {
    background-color: transparent;
    color: #B22222;
    border: 2px solid #B22222;
    font-weight: bold;
    font-size: 0.9rem;
    padding: 0.4em 0.7em;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    margin: 0.3em;
  }

  #tagsCategorias span button {
    margin-left: 0.5em;
  }

  ul#listaURL li {
    background-color: #fff;
    border: 1px solid #B22222;
    border-radius: 0.5rem;
    padding: 0.3em 0.6em;
    margin-bottom: 0.5em;
    color: #000;
    font-family: 'Lora', serif;
  }
</style>
