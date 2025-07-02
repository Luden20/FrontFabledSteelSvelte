import { writable } from 'svelte/store';
import { API } from '$lib/service/apis.service';
export const pageSize = writable(10);
export async function actualizarPageSize(size) {
    pageSize.set(size);
}
