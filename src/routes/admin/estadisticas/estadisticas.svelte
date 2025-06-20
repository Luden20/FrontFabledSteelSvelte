<svelte:head>
  <script src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>

<script>
  import { onMount } from "svelte";
  import { API } from "$lib/service/apis.service";

  onMount(async () => {
    const datosAutores = await API.GET(`/estadisticas?stat=Autor`, true);
    const datosCategorias = await API.GET(`/estadisticas?stat=categoria`, true);

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() =>
      drawChart("Autor", datosAutores, "grafico_barras_autor")
    );
    google.charts.setOnLoadCallback(() =>
      drawChart("Categoría", datosCategorias, "grafico_barras_cat")
    );
  });

  function drawChart(tipo, datos, idElemento) {
    const arrayData = [[tipo, "Cantidad"]];
    datos.forEach((d) => arrayData.push([d.dato, d.cantidad]));

    const data = google.visualization.arrayToDataTable(arrayData);
    const options = {
      title: `Ventas por ${tipo}`,
      legend: { position: "none" },
      hAxis: { title: tipo },
      vAxis: { title: "Cantidad" },
      colors: tipo === "Autor" ? ["#7B1E1E"] : ["#B22222"],
      titleTextStyle: {
        fontSize: 18,
        bold: true,
        color: "#444"
      }
    };

    const chart = new google.visualization.BarChart(
      document.getElementById(idElemento)
    );
    chart.draw(data, options);
  }
</script>

<!-- Fondo general gris claro -->
<div class="bg-gray-50 py-10 min-h-screen">
  <!-- Título general -->
  <h2 class="text-3xl font-bold text-center text-gray-800 mb-10 tracking-wide fade-in">
    Estadísticas de Ventas
  </h2>

  <!-- Gráfico 1 -->
  <div class="max-w-5xl mx-auto mb-10 px-4 fade-in delay-1">
    <div class="bg-white border-2 border-[#7B1E1E] rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      <h3 class="text-2xl font-semibold text-[#7B1E1E] mb-4 text-center tracking-wide">Ventas por Autor</h3>
      <div id="grafico_barras_autor" class="w-full h-[400px]"></div>
    </div>
  </div>

  <!-- Gráfico 2 -->
  <div class="max-w-5xl mx-auto mb-10 px-4 fade-in delay-2">
    <div class="bg-white border-2 border-[#B22222] rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      <h3 class="text-2xl font-semibold text-[#B22222] mb-4 text-center tracking-wide">Ventas por Categoría</h3>
      <div id="grafico_barras_cat" class="w-full h-[400px]"></div>
    </div>
  </div>
</div>

<style>
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.7s ease-out forwards;
  }

  .delay-1 {
    animation-delay: 0.3s;
  }

  .delay-2 {
    animation-delay: 0.6s;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
