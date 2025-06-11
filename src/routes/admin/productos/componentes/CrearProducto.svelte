<svelte:head>
  <script src="/scripts/crearProducto.js"></script>
</svelte:head>
<script>
    import Resultado from "../../../../componentesGenericos/Resultado.svelte";
    import { API } from "$lib/service/apis.service";
    import { productos,actualizarProductosAdmin } from "$lib/store/productosStore";
    import { onMount } from "svelte";
    import ToastGenerico from "../../../../componentesGenericos/ToastGenerico.svelte";
    let categorias=[];
    let resultado=null;
    onMount(async()=>{
        categorias= await API.GET(`/categoria/all`,true);
    })
    function callback(respuesta, error) {
        resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
        actualizarProductosAdmin();
    }
function transformarProducto(data) {
  const imagenes = JSON.parse(data.imagenesJson );
  const categoriasJson  = JSON.parse(data.categoriasJson) ;
  const categorias = categoriasJson.map(cat => parseInt(cat.id));
  const prd = {
    PRD_ID_PK: 0,
    PRD_NOMBRE: data.PRD_NOMBRE,
    PRD_DESCRIPCION: data.PRD_DESCRIPCION,
    PRD_AUTOR: data.PRD_AUTOR,
    PRD_PRECIO: parseFloat(data.PRD_PRECIO)||0 ,
    PRD_STOCK: parseInt(data.PRD_STOCK) || 0,
    ESTADO: "ACT",
  };
  return{
        
    prd,
    categorias: categorias.map(id => parseInt(id)),
    imagenes
  }
}


    const handleSubmit=API.FORMCALL(`/productos`,`POST`,callback,true,transformarProducto)
</script>
<form on:submit={handleSubmit}>            
    <div class="mb-3">
                <label for="PRD_NOMBRE" class="form-label">Nombre</label>
                <input class="form-control text-box single-line" id="PRD_NOMBRE" name="PRD_NOMBRE" type="text" value="">
                <span class="field-validation-valid text-danger" data-valmsg-for="PRD_NOMBRE" data-valmsg-replace="true"></span>
            </div>
            <div class="mb-3">
                <label for="PRD_DESCRIPCION" class="form-label">Descripción</label>
                <input class="form-control text-box single-line" id="PRD_DESCRIPCION" name="PRD_DESCRIPCION" type="text" value="">
                <span class="field-validation-valid text-danger" data-valmsg-for="PRD_DESCRIPCION" data-valmsg-replace="true"></span>
            </div>
            <div class="mb-3">
                <label for="PRD_AUTOR" class="form-label">Autor</label>
                <input class="form-control text-box single-line" id="PRD_AUTOR" name="PRD_AUTOR" type="text" value="N/A">
                <span class="field-validation-valid text-danger" data-valmsg-for="PRD_AUTOR" data-valmsg-replace="true"></span>
            </div>
            <div class="mb-3">
                <label for="PRD_PRECIO" class="form-label">Precio</label>
                <input class="form-control text-box single-line" data-val="true" data-val-number="The field PRD_PRECIO must be a number." id="PRD_PRECIO" min="0.01" name="PRD_PRECIO" step="0.01" type="number" value="">
                <span class="field-validation-valid text-danger" data-valmsg-for="PRD_PRECIO" data-valmsg-replace="true"></span>
            </div>
            <div class="mb-3">
                <label for="PRD_STOCK" class="form-label">Stock</label>
                <input class="form-control text-box single-line" data-val="true" data-val-number="The field PRD_STOCK must be a number." id="PRD_STOCK" min="1" name="PRD_STOCK" step="0.01" type="number" value="">
                <span class="field-validation-valid text-danger" data-valmsg-for="PRD_STOCK" data-valmsg-replace="true"></span>
            </div>
            <div class="mb-3">
                <label for="categoriaSelect" class="form-label">Categorías</label>
                <select id="categoriaSelect" name="categoria" class="form-select">
                    {#each categorias as categoria}
                        <option value={categoria.CAT_ID_PK}>{categoria.CAT_NOMBRE}</option>
                    {/each}
                    </select>
                <button type="button" class="btn btn-outline-danger mt-2" on:click={agregarCategoria}>Agregar Categoría</button>
                <div id="tagsCategorias" class="mt-3"></div>
            </div>
            <div class="mb-3">
                <label for="inputImgs" class="form-label">URL de Imagen</label>
                <input type="text" id="inputImgs" placeholder="URL IMGS" class="form-control" maxlength="500">
                <button type="button" class="btn btn-outline-primary mt-2" on:click={agregarIMG}>Agregar Imagen</button>
                <ul id="listaURL" class="mt-3"></ul>
            </div>
            <input type="hidden" name="imagenesJson" id="imagenesJson">
            <input type="hidden" name="categoriasJson" id="categoriasJson">
            {#if !resultado}
            <div class="text-center mt-4">
                <input type="submit" value="Crear Producto" class="btn btn-success px-4 rounded-pill">
            </div>
            {/if}
</form>

  {#if resultado}
  <ToastGenerico
   mensaje={resultado.mensaje}
   exito={resultado.exito}/>
  {/if}
