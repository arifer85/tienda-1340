// Lista de productos
const productos = [
  { id: 1, nombre: "Buzo Bordó Hombre (L)", precio: 30000, stock: 1, imagen: "assets/img/buzo-bordo-hombre.jpg" },
  { id: 2, nombre: "Buzo Blanco Hombre (XL)", precio: 30000, stock: 1, imagen: "assets/img/buzo-blanco-hombre.jpg" },
  { id: 3, nombre: "Buzo Uva Hombre (L)", precio: 30000, stock: 1, imagen: "assets/img/buzo-uva-hombre.jpg" },
  { id: 4, nombre: "Buzo Negro Hombre (XL)", precio: 30000, stock: 1, imagen: "assets/img/buzo-negro-hombre.jpg" },
  { id: 5, nombre: "Buzo Negro Dama (S)", precio: 30000, stock: 1, imagen: "assets/img/buzo-negro-dama.jpg" },
  { id: 6, nombre: "Buzo Camel Dama (L)", precio: 30000, stock: 1, imagen: "assets/img/buzo-camel.jpg" },
  { id: 7, nombre: "Buzo Chocolate Dama (M)", precio: 30000, stock: 1, imagen: "assets/img/buzo-chocolate.jpg" },
  { id: 8, nombre: "Buzo Blanco Dama (XL)", precio: 30000, stock: 1, imagen: "assets/img/buzo-blanco-dama.jpg" },
  { id: 9, nombre: "Remera Negra Hombre (M)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-hombre-m.jpg" },
  { id: 10, nombre: "Remera Negra Hombre (L)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-hombre-l.jpg" },
  { id: 11, nombre: "Remera Negra Hombre (XL)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-hombre-xl.jpg" },
  { id: 12, nombre: "Remera Blanca Hombre (L)", precio: 15000, stock: 1, imagen: "assets/img/remera-blanca-hombre-l.jpg" },
  { id: 13, nombre: "Remera Negra Dama (S)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-dama-s.jpg" },
  { id: 14, nombre: "Remera Negra Dama (XL)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-dama-xl.jpg" },
  { id: 15, nombre: "Remera Negra Dama (XXL)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-dama-xxl.jpg" },
];

let carrito = [];

// Renderizar productos
const listaProductos = document.getElementById("lista-productos");

function mostrarProductos() {
  listaProductos.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio.toLocaleString("es-AR")}</p>
      <p>Stock: ${prod.stock > 0 ? prod.stock : "Agotado"}</p>
      <button ${prod.stock === 0 ? "disabled" : ""} onclick="agregarAlCarrito(${prod.id})">
        ${prod.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    `;
    listaProductos.appendChild(div);
  });
}

// Agregar al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    producto.stock -= 1;

    const itemEnCarrito = carrito.find(p => p.id === id);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    mostrarCarrito();
    mostrarProductos();
  }
}

// Mostrar carrito
function mostrarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString("es-AR")}`;
    lista.appendChild(li);
    suma += item.precio * item.cantidad;
  });

  if (suma > 0) {
    total.textContent = `Total: $${suma.toLocaleString("es-AR")} (Envío gratis 🚚)`;
  } else {
    total.textContent = "Carrito vacío";
  }
}

// Inicializar
mostrarProductos();

// Newsletter (simulado)
document.getElementById("form-newsletter").addEventListener("submit", function(e){
  e.preventDefault();
  const email = document.getElementById("newsletter-email").value;
  document.getElementById("mensaje-newsletter").textContent = `¡Gracias por suscribirte, ${email}!`;
  this.reset();
});

// --- Checkout Modal ---
const checkoutModal = document.getElementById("checkout-modal");
const finalizarCompraBtn = document.getElementById("finalizar-compra");
const closeModal = document.querySelector(".modal .close");
const checkoutLista = document.getElementById("checkout-lista");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");

// Mostrar modal y resumen del carrito
finalizarCompraBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  checkoutLista.innerHTML = "";
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString("es-AR")}`;
    checkoutLista.appendChild(li);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  checkoutTotal.textContent = `Total: $${total.toLocaleString("es-AR")}`;

  checkoutModal.style.display = "block";
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  checkoutModal.style.display = "none";
});

// Enviar pedido por WhatsApp
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;

  let mensaje = `🛍️ *Nuevo pedido Luciano Clothing*%0A%0A`;
  mensaje += `👤 Cliente: ${nombre}%0A`;
  mensaje += `📍 Dirección: ${direccion}%0A`;
  mensaje += `📞 Teléfono: ${telefono}%0A`;
  mensaje += `✉️ Email: ${email}%0A%0A`;
  mensaje += `📦 *Pedido:*%0A`;

  carrito.forEach((item) => {
    mensaje += `- ${item.nombre} x${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString("es-AR")}%0A`;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  mensaje += `%0A💰 Total: $${total.toLocaleString("es-AR")}%0A%0A`;

  mensaje += `✅ Confirmar stock y forma de pago.`;

  const telefonoTienda = "5491159797549"; 
  const url = `https://wa.me/${telefonoTienda}?text=${mensaje}`;

  window.open(url, "_blank");

  checkoutModal.style.display = "none";
  checkoutForm.reset();
});
