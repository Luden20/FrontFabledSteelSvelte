<svelte:head>
<script src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>
    <script>
        import { onMount } from "svelte";
        import { API } from "$lib/service/apis.service";
        onMount(async()=>{
            var autores=await API.GET(`/estadisticas?stat=Autor`,true);
            var categorias=await API.GET(`/estadisticas?stat=categoria`,true);
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawChartCategorias);
            google.charts.setOnLoadCallback(drawChartAutores);

            function drawChartCategorias() {
                var datos = autores;
                var arrayData = [['Categoría', 'Cantidad']];
                for (var i = 0; i < datos.length; i++) {
                    arrayData.push([datos[i].dato, datos[i].cantidad]);
                }

                var data = google.visualization.arrayToDataTable(arrayData);
                var options = {
                    title: 'Ventas por Categoría',
                    legend: { position: 'none' },
                    hAxis: { title: 'Categoría' },
                    vAxis: { title: 'Cantidad' },
                    colors: ['#B22222']
                };

                var chart = new google.visualization.BarChart(document.getElementById('grafico_barras_cat'));
                chart.draw(data, options);
            }

            function drawChartAutores() {
                var datos = categorias;
                var arrayData = [['Autor', 'Cantidad']];
                for (var i = 0; i < datos.length; i++) {
                    arrayData.push([datos[i].dato, datos[i].cantidad]);
                }

                var data = google.visualization.arrayToDataTable(arrayData);
                var options = {
                    title: 'Ventas por Autor',
                    legend: { position: 'none' },
                    hAxis: { title: 'Autor' },
                    vAxis: { title: 'Cantidad' },
                    colors: ['#7B1E1E']
                };

                var chart = new google.visualization.BarChart(document.getElementById('grafico_barras_autor'));
                chart.draw(data, options);
            }
        })
    </script>
    <div class="grafico-card">
        <h4>Ventas por Autor</h4>
        <div id="grafico_barras_autor" style="width: 100%; height: 400px;"></div>
    </div>

    <div class="grafico-card">
        <h4>Ventas por Categoría</h4>
        <div id="grafico_barras_cat" style="width: 100%; height: 400px;"></div>
    </div>