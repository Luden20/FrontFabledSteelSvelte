   const PUBLIC_API_URL= 'https://backendrestfableedsteel.runasp.net/apiTiendaPublic';
   const ADMIN_API_URL = 'https://backendrestfableedsteel.runasp.net/admin';
   export const URLS = {
  PUBLIC_API_URL: 'https://backendrestfableedsteel.runasp.net/apiTiendaPublic',
  ADMIN_API_URL: 'https://backendrestfableedsteel.runasp.net/admin'
};

export const API ={
  async POST(payload,url,admin=false,callback=null) {
    const postUrl = (admin ? ADMIN_API_URL : PUBLIC_API_URL) + url;
    const res = await fetch(
      postUrl,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );
    const data = await res.json();
    if (callback)
      callback(data);
    if (!res.ok) {
      return { success: false, mensaje: data.mensaje || 'Error desconocido' };
    }
    return { success: true, mensaje: data.mensaje };
  },
  async GET(url,admin=false){
    const fetchUrl = (admin ? ADMIN_API_URL : PUBLIC_API_URL) + url;
    const res = await fetch(fetchUrl);
    return await res.json();
  },POSTFORM(url, callback) {
  return async function (event) {
    event.preventDefault();
    const form = event.target;
    const datos = Object.fromEntries(new FormData(form).entries());
    try {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const texto = await respuesta.json();
      if (callback) callback(texto);
      return texto;
    } catch (error) {
      if (callback) callback(null, error);
      return null;
    }
  };
}


  
}
