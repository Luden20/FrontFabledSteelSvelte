try {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
} catch (e) {
    carrito = [];
}
function prepararCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    document.getElementById("carritoJson").value = JSON.stringify(carrito);
    return true;
}
function agregar(id, nombre, descripcion, precio, imagen, autor,stock,cantidad) {
if (typeof precio === 'string') {
    precio = parseFloat(precio.replace(",", "."));
} else {
    precio = parseFloat(precio);
}

    let existe = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].producto.PRD_ID_PK == id) {
            let nueva_cantidad = carrito[i].cantidad + cantidad;
            if (nueva_cantidad > stock) {
                console.log("esta de mas que el stock")
                alert("No existen el suficiente stock")
                return;
            }
            console.log("esta bien")
            carrito[i].cantidad = nueva_cantidad;
            existe = true;
            break;
        }
    }

    if (!existe) {
        let producto = {
            PRD_ID_PK: id,
            PRD_NOMBRE: nombre,
            PRD_DESCRIPCION: descripcion,
            PRD_PRECIO: precio,
            PRD_AUTOR: autor,
            PRD_STOCK:stock,
            imagen: {
                IMG__URL: imagen
            }
        };
        carrito.push({
            producto: producto,
            cantidad: cantidad
        });
    }

    guardarCarrito();
    generar_carrito();
}
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function generar_carrito() {
    var detalle_carrito = document.getElementById("detalle_carrito");
    var carritoJson = document.getElementById("carritoJson");

    if (!detalle_carrito || !carritoJson) {
        console.log("Carrito aún no está cargado en el DOM");
        prepararCarrito();
        return;
    }

    detalle_carrito.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        detalle_carrito.innerHTML += generarElementoCarrito(carrito[i]);
    }
    carritoJson.value = JSON.stringify(carrito);
    calcular_totales_subtotales();
}

function generarElementoCarrito(item) {
    const producto = item.producto;
    return `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="ms-2 me-auto">
                <h4>${producto.PRD_NOMBRE}</h4>
                <div class="fw-bold">Autor:${producto.PRD_AUTOR}</div>
                <div class="fw-bold">Descripcion:${producto.PRD_DESCRIPCION}</div>
                <div class="fw-bold">Cantidad:${item.cantidad}</div>
                <button type="button" class="btn btn-secondary" onclick=restar_boton_modal(${producto.PRD_ID_PK})>-</button>
                <button type="button" class="btn btn-secondary" onclick=agregar_boton_modal(${producto.PRD_ID_PK})>+</button>
            </div>
            <div class="position-relative">
                <img src="${producto.imagen.IMG__URL}" class="img-fluid rounded" style="max-width: 100px;">
                <span class="position-absolute top-0 end-0 badge text-bg-primary rounded-pill">${producto.PRD_PRECIO} USD</span>
            </div>
            <div class="d-flex justify-content-center align-items-center ms-3">
                <button type="button" class="btn btn-danger bi bi-trash" style="transform: scale(1.3);" onclick="quitar_producto('${producto.PRD_ID_PK}', this)"></button>
            </div>
        </li>
    `;
}
function quitar_producto(id, boton) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].producto.PRD_ID_PK == id) {
            carrito.splice(i, 1);
            break;
        }
    }
    guardarCarrito();
    generar_carrito();
}
function agregar_boton_modal(id) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].producto.PRD_ID_PK == id) {
            if (carrito[i].cantidad + 1 > carrito[i].producto.PRD_STOCK) {
                alert("demas")
                return;
            }
            carrito[i].cantidad = carrito[i].cantidad + 1;
            generar_carrito();
            break;
        }
    }
    guardarCarrito();
    generar_carrito();
}
function restar_boton_modal(id) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].producto.PRD_ID_PK == id) {
            carrito[i].cantidad = carrito[i].cantidad + -1;
            if (carrito[i].cantidad == 0) {
                quitar_producto(id)
            }
            generar_carrito();
            break;
        }
    }
    guardarCarrito();
    generar_carrito();
}
function calcular_totales_subtotales() {
    let total = 0;
    let cantidadTotal = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += parseFloat(carrito[i].producto.PRD_PRECIO) * carrito[i].cantidad;
        cantidadTotal += carrito[i].cantidad;
    }
    document.getElementById("subtotal_pagar").innerText = "Subtotal: " + total.toFixed(2) + " USD";
    document.getElementById("iva").innerText = "IVA: " + (total * 0.15).toFixed(2) + " USD";
    document.getElementById("total_pagar").innerText = "Total: " + (total * 1.15).toFixed(2) + " USD";
    document.getElementById("cantidad_carrito").innerText = cantidadTotal;
}
document.addEventListener('DOMContentLoaded', function () {
    let intentos = 0;
    function intentarCargar() {
        const detalle = document.getElementById("detalle_carrito");
        const json = document.getElementById("carritoJson");

        if (detalle && json) {
            generar_carrito();
        } else if (intentos < 10) {
            intentos++;
            console.log("Esperando elementos del carrito en el DOM...");
            setTimeout(intentarCargar, 300); // espera más entre intentos
        } else {
            console.warn("No se encontraron los elementos del carrito");
        }
    }
    intentarCargar();
});
