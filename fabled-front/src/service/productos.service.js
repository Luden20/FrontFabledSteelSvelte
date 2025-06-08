import { URLS } from './apis.service.js';
export const productosService={
  async ObtenerProductos(param, buscado) {
    const res = await fetch(`${URLS.PUBLIC_API_URL}/productos/buscar?param=${param}&buscado=${buscado}`);
    return await res.json();
  },
  async ObtenerDetalle(id){
    const res = await fetch(`${URLS.PUBLIC_API_URL}/productos/${id}`);
    let prd=null;
    prd=await res.json();
    console.error(prd);
    return prd;
  }

}
