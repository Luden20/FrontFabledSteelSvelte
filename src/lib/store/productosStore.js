import { writable } from 'svelte/store';
import { API } from '$lib/service/apis.service';
export const productos = writable([]);
export async function actualizarProductosAdmin(param = "", buscado = "") {
    const data = await API.GET(`/productos?param=${param}&buscado=${buscado}`, true);
    productos.set(data);
}
