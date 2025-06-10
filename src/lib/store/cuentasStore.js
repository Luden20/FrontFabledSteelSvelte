import { writable } from 'svelte/store';
import { API } from '$lib/service/apis.service';
export const cuentas = writable([]);
export async function actualizarCuentas(param = "", buscado = "") {
    const data = await API.GET(`/cuentaCliente?param=${param}&buscado=${buscado}`, true);
    cuentas.set(data);
}
