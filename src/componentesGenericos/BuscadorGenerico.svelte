<script>
    export let params;
    export let callback=()=>{};
    let param=params[0].llave;
    let buscado="";
</script>
<div class="col-auto">
    <select bind:value={param} class="form-select">
        {#each params as item}
        <option value={item.llave}>{item.valor}</option>
        {/each}
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
        on:click={() => callback(param, buscado)}
    >
        Buscar
    </button>
</div>
