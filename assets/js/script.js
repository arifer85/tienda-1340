const productos = [
  { id: 1, nombre: "Buzo Bordó L", precio: 27000, img: "buzo-bordo.jpg", stock: 1 },
  { id: 2, nombre: "Buzo Blanco XL", precio: 27000, img: "buzo-blanco.jpg", stock: 1 },
  { id: 3, nombre: "Buzo Uva L", precio: 27000, img: "buzo-uva.jpg", stock: 1 },
  { id: 4, nombre: "Buzo Negro XL", precio: 27000, img: "buzo-negro.jpg", stock: 1 },
  { id: 5, nombre: "Buzo Dama Negro S", precio: 27000, img: "buzo-dama-negro.jpg", stock: 1 },
  { id: 6, nombre: "Buzo Dama Camel L", precio: 27000, img: "buzo-dama-camel.jpg", stock: 1 },
  { id: 7, nombre: "Buzo Dama Chocolate M", precio: 27000, img: "buzo-dama-choco.jpg", stock: 1 },
  { id: 8, nombre: "Buzo Dama Blanco XL", precio: 27000, img: "buzo-dama-blanco.jpg", stock: 1 },
  { id: 9, nombre: "Remera Hombre Negra L", precio: 15000, img: "remera-negra-l.jpg", stock: 1 },
  { id: 10, nombre: "Remera Hombre Negra XL", precio: 15000, img: "remera-negra-xl.jpg", stock: 1 },
  { id: 11, nombre: "Remera Hombre Negra M", precio: 15000, img: "remera-negra-m.jpg", stock: 1 },
  { id: 12, nombre: "Remera Hombre Blanca L", precio: 15000, img: "remera-blanca-l.jpg", stock: 1 },
  { id: 13, nombre: "Remera Dama Negra XXL", precio: 15000, img: "remera-dama-negra-xxl.jpg", stock: 1 },
  { id: 14, nombre: "Remera Dama Gris L", precio: 15000, img: "remera-dama-gris-l.jpg", stock: 1 },
  { id: 15, nombre: "Remera Dama Negra XL", precio: 15000, img: "remera-dama-negra-xl.jpg", stock: 1 },
  { id: 16, nombre: "Remera Dama Negra S", precio: 15000, img: "remera-dama-negra-s.jpg", stock: 1 }
];

let carrito = [];

function cargarProductos() {
  const contenedor = document.getElementById("lista-productos");
  productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `
      <img src="assets/img/${p.img}" alt="${p.nombre}">
      <p>${p.nombre}</p>
      <span>$${p.precio}</span>
      <button onclick="agregarAlCarrito(${p.id})" ${p.stock === 0 ? "disabled" : ""}>
        ${p.stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    carrito.push(producto);
    producto.stock -= 1;
    actualizarCarrito();
    actualizarProductos();
  }
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = "";
  carrito.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    lista.appendChild(li);
  });
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  document.getElementById("total").textContent = `Total: $${total}`;
}

function actualizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";
  cargarProductos();
}

document.getElementById("form-newsletter").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  document.getElementById("mensaje-newsletter").textContent = "¡Gracias por suscribirte!";
  console.log("Nuevo suscriptor:", email);
});

document.getElementById("pagar-mp").addEventListener("click", function() {
  window.open("https://www.mercadopago.com.ar/", "_blank");
});

cargarProductos();