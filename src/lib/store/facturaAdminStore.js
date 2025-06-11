import { writable } from 'svelte/store';
import { API } from '$lib/service/apis.service';
export const facturas = writable([]);
export async function actualizarFacturasAdmin(param = "", buscado = "") {
    const data = await API.GET(`/facturas/buscar?param=${param}&buscado=${buscado}`, true);
    facturas.set(data);
}
