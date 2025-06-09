<script>
    let estado;
    let id;
    let endpoint;
    function borrar()
    {

    }
    function desborrar()
    {

    }
</script>
{#if estado='ACT'}
<button on:click={borrar}>Borrar</button>
{:else}
<button on:click={desborrar}>Borrar</button>

{/if}