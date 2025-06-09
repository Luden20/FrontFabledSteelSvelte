<script>
  import { scale } from 'svelte/transition';
  export let mensaje = '';
</script>

{#if mensaje}
  <div class="resultado" transition:scale>
    <div class="icono">&#10004;</div> <!-- ✓ -->
    <span>{mensaje}</span>
  </div>
{/if}

<style>
  .resultado {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    padding: 0.8rem 1.2rem;
    border-radius: 5px;
    margin-top: 1rem;
  }

  .icono {
    font-size: 1.5rem;
    animation: giro 1s ease-in-out;
  }

  @keyframes giro {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
