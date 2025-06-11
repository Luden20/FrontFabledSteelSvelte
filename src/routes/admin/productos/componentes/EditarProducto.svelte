<svelte:head>
  <script src="/scripts/editarProducto.js"></script>
</svelte:head>
<script>
    import { API } from "$lib/service/apis.service";
    import { actualizarProductosAdmin } from "$lib/store/productosStore";
    import { onMount } from "svelte";
    import Resultado from "../../../../componentesGenericos/Resultado.svelte";
    import ToastGenerico from "../../../../componentesGenericos/ToastGenerico.svelte";
    export let id;
    let resultado=null;
    let producto=null;
    let categorias=[];
    onMount(async()=>{
        categorias= await API.GET(`/categoria/all`,true);
        producto=await API.GET(`/productos/${id}`,false);
    })
    
    function callback(respuesta, error) {
        resultado = error ? { mensaje: "Error al enviar los datos." } : respuesta;
        actualizarProductosAdmin();
    }
    function transfomarProductoEditado(data){
          const catsNuevas  = JSON.parse(data.categoriasJson).map(cat => parseInt(cat)) ;
          const catsBorrar  = JSON.parse(data.categoriasEliminadasJson).map(cat => parseInt(cat)) ;
          const imgsBorrar  = JSON.parse(data.imagenesEliminadasJson).map(img => parseInt(img)) ;
          const nuevaUrls  = JSON.parse(data.imagenesJson) ;

            const prd = {
            PRD_ID_PK: data.PRD_ID_PK,
            PRD_NOMBRE: data.PRD_NOMBRE,
            PRD_DESCRIPCION: data.PRD_DESCRIPCION,
            PRD_AUTOR: data.PRD_AUTOR,
            PRD_PRECIO: parseFloat(data.PRD_PRECIO)||0 ,
            PRD_STOCK: parseInt(data.PRD_STOCK) || 0,
            ESTADO: "ACT",
        };
        return{
            prd,catsNuevas,catsBorrar,imgsBorrar,nuevaUrls
        }
    }
    const handleSubmit=API.FORMCALL(`/productos`,`PUT`,callback,true,transfomarProductoEditado);
</script>
{#if producto}
<form on:submit={handleSubmit}>
    <div class="mb-3">
    <div class="mb-3">
        <p>Nombre</p>
        <input
        value={producto.PRD_NOMBRE}
        class="form-control text-box single-line"
        id="PRD_NOMBRE"
        name="PRD_NOMBRE"
        type="text"
        />
        <span class="field-validation-valid text-danger" data-valmsg-for="PRD_NOMBRE" data-valmsg-replace="true"></span>
    </div>

    <div class="mb-3">
        <p>Descripcion</p>
        <input
        value={producto.PRD_DESCRIPCION}
        class="form-control text-box single-line"
        id="PRD_DESCRIPCION"
        name="PRD_DESCRIPCION"
        type="text"
        />
        <span class="field-validation-valid text-danger" data-valmsg-for="PRD_DESCRIPCION" data-valmsg-replace="true"></span>
    </div>

    <div class="mb-3">
        <p>Autor</p>
        <input
        value={producto.PRD_AUTOR}
        class="form-control text-box single-line"
        id="PRD_AUTOR"
        name="PRD_AUTOR"
        type="text"
        />
        <span class="field-validation-valid text-danger" data-valmsg-for="PRD_AUTOR" data-valmsg-replace="true"></span>
    </div>

    <div class="mb-3">
        <p>Precio</p>
        <input
        value={producto.PRD_PRECIO}
        class="form-control text-box single-line"
        id="PRD_PRECIO"
        inputmode="decimal"
        min="0.01"
        name="PRD_PRECIO"
        step="0.01"
        type="number"
        />
        <span class="field-validation-valid text-danger" data-valmsg-for="PRD_PRECIO" data-valmsg-replace="true"></span>
    </div>

    <div class="mb-3">
        <p>Stock</p>
        <input
        value={producto.PRD_STOCK}
        class="form-control text-box single-line"
        id="PRD_STOCK"
        min="1"
        name="PRD_STOCK"
        step="1"
        type="number"
        />
        <span class="field-validation-valid text-danger" data-valmsg-for="PRD_STOCK" data-valmsg-replace="true"></span>
    </div>

    <div class="mb-3">
        <p>Estado</p>
        <input
        value={producto.ESTADO}
        class="form-control text-box single-line"
        id="ESTADO"
        name="ESTADO"
        type="text"
        />
        <span class="field-validation-valid text-danger" data-valmsg-for="ESTADO" data-valmsg-replace="true"></span>
    </div>
            <hr class="my-4 border-danger">
            <h5 class="text-danger">Categorías actuales</h5>
            <div id="categorias_asignadas" class="mb-3">
                {#each producto.categoria as categoria}
                    <span class="badge bg-secondary m-1">
                        {categoria.CAT_NOMBRE}
                        <button type="button" on:click={()=>{eliminarTagExistente(categoria.CAT_ID_PK)}} class="btn-close btn-close-white btn-sm ms-2" aria-label="Eliminar"></button>
                    </span>
                {/each}
            </div>
            <label for="categoria_select" class="form-label">Agregar Categoría</label>
            <div class="d-flex mb-3">
                <select id="categoriaSelect" class="form-select me-2">
                {#each categorias as categoria}
                        <option value={categoria.CAT_ID_PK}>{categoria.CAT_NOMBRE}</option>
                    {/each}
                </select>
                <button type="button" class="btn btn-outline-primary" on:click={agregarCategoria}>Agregar</button>
            </div>
            <h5 class="text-danger">Imágenes actuales</h5>
            <div id="imagenes_asignadas" class="mb-4">
                {#each producto.imagenes as imagen}
                    <div class="d-inline-block position-relative m-2">
                        <img src={imagen.IMG__URL} style="width:100px; height:100px; object-fit:cover;">
                        <button type="button" class="btn-close btn-sm position-absolute top-0 end-0" aria-label="Eliminar" 
                        on:click={()=>{eliminarImgExistente(imagen.IMG_ID_PK)}}></button>
                    </div>
                    {/each}
            </div>
            <label for="nueva_imagen_url" class="form-label">Agregar Imagen (URL)</label>
            <div class="d-flex mb-3">
                <input type="text" id="nueva_imagen_url" class="form-control me-2" placeholder="URL de imagen">
                <button type="button" class="btn btn-outline-primary" on:click={agregarIMG()}>Agregar</button>
            </div>
            <ul id="listaURL" class="list-unstyled"></ul>
            <input type="hidden" name="PRD_ID_PK" id="PRD_ID_PK" value={producto.PRD_ID_PK}>
            <input type="hidden" name="imagenesJson" id="imagenesJson" value="[]">
            <input type="hidden" name="categoriasJson" id="categoriasJson" value="[]">
            <input type="hidden" name="categoriasEliminadasJson" id="categoriasEliminadasJson" value="[]">
            <input type="hidden" name="imagenesEliminadasJson" id="imagenesEliminadasJson" value="[]">
            {#if !resultado}
            <input type="submit" value="Guardar Cambios" class="btn btn-success px-4 rounded-pill">
            {/if}
</form>
{:else}
<h6>Cargando...</h6>
{/if}

  {#if resultado}
  <ToastGenerico
   mensaje={resultado.mensaje}
   exito={resultado.exito}/>
  {/if}
