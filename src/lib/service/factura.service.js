import { URLS } from './apis.service.js';
export const FacturaService = {
  async obtenerCuenta(cedula) {
    const res = await fetch(`${URLS.PUBLIC_API_URL}/factura/cuentas/${cedula}`);
    let aux = await res.json();
    if (aux.message == "Cliente no encontrado") {
      return { error: "Cliente no encontrado" };
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

    const data = await res.json();

    if (!res.ok) {
      return { success: false, mensaje: data.mensaje || 'Error desconocido' };
    }
    return { success: true, mensaje: data.mensaje };
  }
}