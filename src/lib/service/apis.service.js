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
    return data;
  },
  async DELETE(url,admin=false,callback=null) {
    const postUrl = (admin ? ADMIN_API_URL : PUBLIC_API_URL) + url;
    const res = await fetch(
      postUrl,
      {
        method: 'DELETE',
      }
    );
    const data = await res.json();
    if (callback)
      callback(data);
    return data;
  },
  async UNDELETE(url,id,admin=false,callback=null) {
    const postUrl = (admin ? ADMIN_API_URL : PUBLIC_API_URL) + url+'/Undelete/'+id;
    const res = await fetch(
      postUrl,
      {
        method: 'POST',
      }
    );
    const data = await res.json();
    if (callback)
      callback(data);
    return data;
  },

  async GET(url,admin=false){
    const fetchUrl = (admin ? ADMIN_API_URL : PUBLIC_API_URL) + url;
    const res = await fetch(fetchUrl);
    return await res.json();
  },
  
  FORMCALL(endpoint,verb,callback=null,admin=false,transform=null) {
  return async function (event) {
    event.preventDefault();
    const form = event.target;
    const datos = Object.fromEntries(new FormData(form).entries());
    const payload = transform ? transform(datos) : datos;
    console.log(datos);
    const url = (admin ? ADMIN_API_URL : PUBLIC_API_URL) + endpoint;
    try {
      const respuesta = await fetch(url, {
        method: verb,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const texto = await respuesta.json();
      // Si querías añadir esa marca al objeto:
      texto.exito = respuesta.ok;
      if (callback) callback(texto);
      return texto;
    } 
    catch (error) {
      if (callback) callback(null, error);
      return { exito: false, error };
    }
  };
}
}
