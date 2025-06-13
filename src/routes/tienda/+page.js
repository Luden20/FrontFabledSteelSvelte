export async function load({ fetch, url }) {
  const param = url.searchParams.get('param') || "";
  const buscado = url.searchParams.get('buscado') || "";

  const res = await fetch(`/productos/buscar?param=${param}&buscado=${buscado}`);
  const productos = await res.json();

  return { productos, param, buscado };
}