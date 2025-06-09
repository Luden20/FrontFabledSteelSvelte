import { URLS } from './apis.service.js';
import { authStore } from '../store/authStore.js';

export const authService = {
  
   async login(user, password){
    const payload = {
      user: user,
      password: password
    };

    const res = await fetch(`${URLS.PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    let cuenta= await res.json();
    if(cuenta.CUE_ID_PK!=-1)
    {
        sessionStorage.setItem("usuario",JSON.stringify(cuenta));
        sessionStorage.setItem("rol","cliente");
        authStore.set({ usuario: cuenta, rol: 'cliente' });
        return "Logeo correcto"
    }
    return "Error al logearse"
  },
obtenerUsuario() {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  }
  return null;
},
obtenerRol() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem("rol") || null;
  }
  return null;
}
,

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      authStore.set({ usuario: null, rol: null });
    }
  }
};
