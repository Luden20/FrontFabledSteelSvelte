export function manejarEnvio(url, callback) {
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
