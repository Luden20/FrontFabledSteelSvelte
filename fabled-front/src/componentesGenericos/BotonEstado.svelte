<script>
    import { API } from "../service/apis.service";
    export let estado;
    export let id;
    export let endpoint;
    let url=null;
    export let callback=()=>{};
    async function borrar()
    {
        url=`${endpoint}/${id}`;
        await API.DELETE(url,true);
        callback();
    }
    async function desborrar()
    {
        await API.UNDELETE(endpoint,id,true);
        callback();
    }
</script>
{#if estado=='ACT'}
<button on:click={borrar}>Borrar</button>
{:else}
<button on:click={desborrar}>Desborrar</button>
{/if}