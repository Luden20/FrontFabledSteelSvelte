import { URLS } from './apis.service.js';

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
        return "Logeo correcto"
    }
    return "Error al logearse"
  },
  obtenerUsuario(){
    const data=sessionStorage.getItem("usuario");
    return data ? JSON.parse(data):null;
  },
  obtenerRol()
  {
    return sessionStorage.getItem("rol")||null;
  },
  cerrarSesion()
  {
      sessionStorage.clear(); 
  }
};
