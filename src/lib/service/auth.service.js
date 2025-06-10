import { URLS } from './apis.service.js';
import { API } from './apis.service.js';
import { authStore } from '../store/authStore.js';
import { closeLoginModal } from '../store/loginModalStore.js';

export const authService = {
	register(callback = null) {
		return async function (event) {
			event.preventDefault();
			const form = event.target;
			const datos = Object.fromEntries(new FormData(form).entries());
			const cuenta = {
				CUE_PASSWORD: datos.CUE_PASSWORD,
				CUE_NOMBRE: datos.CUE_NOMBRE,
				CUE_APELLIDO: datos.CUE_APELLIDO,
				CUE_EMAIL: datos.CUE_EMAIL,
				CUE_FECHA_CREACION: datos.CUE_FECHA_CREACION,
				cliente: {
					CLI_NOMBRE: datos.CUE_NOMBRE,
					CLI_APELLIDO: datos.CUE_APELLIDO,
					CLI_DIRECCION: datos.CLI_DIRECCION,
					CLI_CODIGO_POSTAL: datos.CLI_CODIGO_POSTAL,
					CLI_CELULAR: datos.CLI_CELULAR,
					CLI_CEDULA: datos.CLI_CEDULA
				}
			};
			const url = `${URLS.PUBLIC_API_URL}/auth`;
			let texto = {};
			try {
				const respuesta = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(cuenta)
				});

				const aux = await respuesta.json();
				if (respuesta.ok) {
					texto.mensaje = aux?.mensaje || aux?.message || 'Registro exitoso';
					texto.exito = true;
				} else {
					texto.mensaje = aux?.mensaje || aux?.message || 'Error al registro';
					texto.exito = false;
				}
			} catch (error) {
				texto.mensaje = 'Error al enviar los datos.';
				texto.exito = false;
				if (callback) callback(texto, error);
				return texto;
			}

			if (callback) callback(texto);
			return texto;
		};
	},
	async login(user, password) {
		const payload = {
			user: user,
			password: password
		};
		const adminRes = await fetch(`${URLS.ADMIN_API_URL}/adminAuth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
		let esAdmin = await adminRes.json();
		let respuesta = {};
		if (esAdmin == true) {
			sessionStorage.setItem('rol', 'admin');
			authStore.set({ rol: 'admin' });
			respuesta.mensaje = 'Admin bienvenido';
			respuesta.exito = true;
			return respuesta;
		}
		const res = await fetch(`${URLS.PUBLIC_API_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		let cuenta = await res.json();
		if (res.ok) {
			sessionStorage.setItem('usuario', JSON.stringify(cuenta));
			sessionStorage.setItem('rol', 'cliente');
			authStore.set({ usuario: cuenta, rol: 'cliente' });
			if (typeof window !== 'undefined' && window.generar_carrito) {
				window.generar_carrito();
			}
			respuesta.mensaje = 'Logeo correcto';
			respuesta.exito = true;
			return respuesta;
		}
		respuesta.mensaje = 'Error al logearse';
		respuesta.exito = false;
		return respuesta;
	},
	obtenerUsuario() {
		if (typeof window !== 'undefined') {
			const data = sessionStorage.getItem('usuario');
			return data ? JSON.parse(data) : null;
		}
		return null;
	},
	obtenerRol() {
		if (typeof window !== 'undefined') {
			return sessionStorage.getItem('rol') || null;
		}
		return null;
	},
	cerrarSesion() {
		if (typeof window !== 'undefined') {
			sessionStorage.clear();
			authStore.set({ usuario: null, rol: null });
			closeLoginModal();
		}
	}
};
