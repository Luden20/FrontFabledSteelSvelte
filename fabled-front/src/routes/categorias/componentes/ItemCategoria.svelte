<script>
    export let categoria;
</script>
<tr>
    <td>{categoria.CAT_NOMBRE}</td>
    <td>{categoria.CAT_DECRIPCION}</td>
    <td>{categoria.ESTADO}</td>
</tr>
<style>


  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  tr:hover {
    background-color: #f3f4f6;
  }

  td:first-child {
    font-weight: 500;
  }

  th {
    font-weight: 600;
    font-size: 1rem;
  }
</style>
