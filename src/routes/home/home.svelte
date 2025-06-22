<script>
  // Puedes añadir aquí imports o lógica si necesitas
</script>

<!-- HERO PRINCIPAL -->
<section class="hero text-center text-white d-flex flex-column justify-content-center align-items-center">
  <h1 class="display-3 fw-bold">FabledSteel</h1>
  <p class="lead mb-4">Entre historias forjadas y tinta eterna.</p>
  <a href="/tienda" class="btn btn-outline-light btn-lg rounded-pill px-4 py-2">
    Explorar Tienda <i class="bi bi-arrow-right-circle ms-2"></i>
  </a>
</section>

<!-- DESTACADOS -->
<section class="container text-center my-5">
  <div class="row g-4">
    <div class="col-md-4">
      <div class="p-4 shadow rounded-4 bg-light h-100">
        <i class="bi bi-book-half display-4 text-danger"></i>
        <h4 class="mt-3">Colecciones Únicas</h4>
        <p class="text-muted">Libros raros, ediciones limitadas y nuevos lanzamientos.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="p-4 shadow rounded-4 bg-light h-100">
        <i class="bi bi-box-seam display-4 text-danger"></i>
        <h4 class="mt-3">Pedidos Seguros</h4>
        <p class="text-muted">Envuelve tu pasión en cada paquete que recibes.</p>
      </div>
    </div>
    <div class="col-md-4">
      <div class="p-4 shadow rounded-4 bg-light h-100">
        <i class="bi bi-chat-left-dots display-4 text-danger"></i>
        <h4 class="mt-3">Atención Personalizada</h4>
        <p class="text-muted">Estamos aquí para ayudarte a encontrar tu próxima aventura.</p>
      </div>
    </div>
  </div>
</section>

<!-- LLAMADO FINAL -->
<section class="cta container my-5 text-center">
  <div class="p-5 rounded-4 shadow bg-dark text-white">
    <h2 class="fw-bold">¿Listo para descubrir tu próxima historia?</h2>
    <p class="mb-4">La aventura comienza con una sola página.</p>
    <a href="/tienda" class="btn btn-danger btn-lg rounded-pill px-4 py-2">
      Ir a la tienda <i class="bi bi-shop-window ms-2"></i>
    </a>
  </div>
</section>

<style>
  .hero {
    height: 90vh;
    background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(178, 34, 34, 0.6)),
                url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f") center/cover no-repeat;
    font-family: 'Cinzel', serif;
    backdrop-filter: blur(2px);
    padding: 2rem;
  }

  h1, h2, h4 {
    font-family: 'Cinzel', serif;
  }

  p, .lead {
    font-family: 'Lora', serif;
  }

  .btn {
    font-family: 'Cinzel', serif;
    letter-spacing: 0.5px;
    transition: all 0.2s ease-in-out;
  }

  .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(178, 34, 34, 0.6);
  }

  .cta {
    font-family: 'Lora', serif;
  }
</style>
