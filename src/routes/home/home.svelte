<script>
  // Lógica adicional si la necesitas
</script>

<!-- HERO REDISEÑADO -->
<section class="hero text-white d-flex flex-column justify-content-center align-items-center text-center">
  <div class="bg-overlay p-5 rounded-5 shadow-lg">
    <h1 class="display-3 fw-bold mb-3">FabledSteel</h1>
    <p class="lead mb-4">Entre historias forjadas y tinta eterna.</p>
    <a href="/tienda" class="btn-fabled-outline px-5 py-2">
      Explorar Tienda <i class="bi bi-arrow-right-circle ms-2"></i>
    </a>
  </div>
</section>

<!-- DESTACADOS -->
<section class="container my-5">
  <div class="row g-4 text-center">
    <div class="col-md-4">
      <div class="p-4 bg-glass rounded-4 h-100 shadow-sm">
        <i class="bi bi-book-half display-4 text-fabled"></i>
        <h4 class="mt-3">Colecciones Únicas</h4>
        <p>Libros raros, ediciones limitadas y nuevos lanzamientos.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="p-4 bg-glass rounded-4 h-100 shadow-sm">
        <i class="bi bi-box-seam display-4 text-fabled"></i>
        <h4 class="mt-3">Pedidos Seguros</h4>
        <p>Envuelve tu pasión en cada paquete que recibes.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="p-4 bg-glass rounded-4 h-100 shadow-sm">
        <i class="bi bi-chat-left-dots display-4 text-fabled"></i>
        <h4 class="mt-3">Atención Personalizada</h4>
        <p>Estamos aquí para ayudarte a encontrar tu próxima aventura.</p>
      </div>
    </div>
  </div>
</section>

<!-- LLAMADO FINAL -->
<section class="cta container my-5 text-center">
  <div class="p-5 rounded-5 shadow bg-fabled-dark text-white">
    <h2 class="fw-bold mb-3">¿Listo para descubrir tu próxima historia?</h2>
    <p class="mb-4">La aventura comienza con una sola página.</p>
    <a href="/tienda" class="btn-fabled px-5 py-2">
      Ir a la tienda <i class="bi bi-shop-window ms-2"></i>
    </a>
  </div>
</section>

<style>
  .hero {
    min-height: 80vh;
    background: url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f") center/cover no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .bg-overlay {
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(5px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    max-width: 700px;
  }

  .bg-glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #f8f8f8;
    transition: transform 0.3s ease;
  }

  .bg-glass:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 20px rgba(178, 34, 34, 0.4);
  }

  .text-fabled {
    color: #B22222;
  }

  .bg-fabled-dark {
    background: linear-gradient(135deg, #3e0d0d, #7b1e1e);
  }

  h1, h2, h4 {
    font-family: 'Cinzel', serif;
  }

  p, .lead {
    font-family: 'Lora', serif;
    color: #eee;
  }

  .btn-fabled {
    background-color: #B22222;
    color: white;
    border-radius: 999px;
    font-family: 'Cinzel', serif;
    font-weight: bold;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .btn-fabled:hover {
    background-color: #8B1A1A;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(178, 34, 34, 0.6);
  }

  .btn-fabled-outline {
    border: 2px solid #B22222;
    color: #B22222;
    background: transparent;
    border-radius: 999px;
    font-family: 'Cinzel', serif;
    transition: all 0.2s ease-in-out;
  }

  .btn-fabled-outline:hover {
    background-color: #B22222;
    color: white;
    transform: scale(1.05);
  }
</style>
