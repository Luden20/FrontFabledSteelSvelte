<script>
    import { productos,actualizarProductosAdmin } from "$lib/store/productosStore";
    let param="Nombre";
    let buscado="";
</script>
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

<div class="col-auto">
    <button 
        class="btn btn-primary"
        on:click={() => actualizarProductosAdmin(param, buscado)}
    >
        Buscar
    </button>
</div>
