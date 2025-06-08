import { URLS } from './apis.service.js';
export const FacturaService={
    async obtenerCuenta(cedula){
    const res = await fetch(`${URLS.PUBLIC_API_URL}/factura/cuentas/${cedula}`);
    let aux=await res.json();
    if(aux.message=="Cliente no encontrado")
    {
        return null;
    }
    return aux;
    },
  async Facturar(idCliente, carrito, cuenta) {
    const payload = {
      carritoList: carrito,
      cuenta: cuenta,
      idCliente: idCliente
    };

    const res = await fetch(
      `${URLS.PUBLIC_API_URL}/factura/cuentaSeleccionada`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    // parseamos siempre la respuesta JSON
    const data = await res.json();

    if (!res.ok) {
      // devolvemos objeto con error y mensaje del backend
      return { success: false, mensaje: data.mensaje || 'Error desconocido' };
    }

    // en caso OK devolvemos la misma estructura
    return { success: true, mensaje: data.mensaje };
  }
}