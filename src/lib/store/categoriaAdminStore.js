import { writable } from 'svelte/store';
import { API } from '$lib/service/apis.service';
export const categorias = writable([]);
export async function actualizarCategoriasAdmin() {
    const data = await API.GET('/categoria/all',true);
    categorias.set(data);
}