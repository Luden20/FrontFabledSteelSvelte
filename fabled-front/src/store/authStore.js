import { writable } from 'svelte/store';

// Almacena la información de autenticación
export const authStore = writable({
  usuario: null,
  rol: null
});

// Leer datos almacenados en sessionStorage si existen
export function initAuth() {
  if (typeof window !== 'undefined') {
    const dataUsuario = sessionStorage.getItem('usuario');
    const usuario = dataUsuario ? JSON.parse(dataUsuario) : null;
    const rol = sessionStorage.getItem('rol') || null;
    authStore.set({ usuario, rol });
  }
}
