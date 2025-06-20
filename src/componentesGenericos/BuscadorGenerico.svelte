<script>
  export let params;
  export let callback = () => {};
  let param = params[0].llave;
  let buscado = "";
</script>

<div class="flex flex-wrap gap-2 items-center w-full">
  <!-- Select con ancho fijo adecuado -->
  <select bind:value={param} class="select-fabled min-w-[160px]">
    {#each params as item}
      <option value={item.llave}>{item.valor}</option>
    {/each}
  </select>

  <!-- Input con ancho flexible -->
  <input
    bind:value={buscado}
    type="text"
    class="input-fabled flex-1 min-w-[200px]"
    placeholder="Buscar..."
  />

  <!-- Botón -->
  <button
    class="btn-fabled"
    on:click={() => callback(param, buscado)}
  >
    Buscar
  </button>
</div>


<style>
  .select-fabled,
  .input-fabled {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .select-fabled:focus,
  .input-fabled:focus {
    border-color: #B22222;
    outline: none;
    box-shadow: 0 0 0 2px rgba(178, 34, 34, 0.2);
  }

  .btn-fabled {
    padding: 0.5rem 1rem;
    background-color: #B22222;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .btn-fabled:hover {
    background-color: #a11d1d;
    transform: scale(1.05);
    box-shadow: 0 2px 6px rgba(178, 34, 34, 0.3);
  }

  .btn-fabled:focus {
    outline: none;
    transform: scale(0.98);
  }
</style>
