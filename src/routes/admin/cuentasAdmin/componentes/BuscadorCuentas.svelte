<script>
    import { cuentas,actualizarCuentas } from "$lib/store/cuentasStore";
    let param="cedula";
    let buscado="";
</script>
<div class="col-auto">
    <select bind:value={param} class="form-select">
        <option value="cedula">Cédula</option>
        <option value="nombre">Nombre</option>
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
        on:click={() => actualizarCuentas(param, buscado)}
    >
        Buscar
    </button>
</div>
