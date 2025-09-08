// Lista de productos
const productos = [
  // Buzos hombre
  { id: 1, nombre: "Buzo Bordó Hombre (L)", precio: 27000, stock: 1, imagen: "assets/img/buzo-bordo-hombre.jpg" },
  { id: 2, nombre: "Buzo Blanco Hombre (XL)", precio: 27000, stock: 1, imagen: "assets/img/buzo-blanco-hombre.jpg" },
  { id: 3, nombre: "Buzo Uva Hombre (L)", precio: 27000, stock: 1, imagen: "assets/img/buzo-uva-hombre.jpg" },
  { id: 4, nombre: "Buzo Negro Hombre (XL)", precio: 27000, stock: 1, imagen: "assets/img/buzo-negro-hombre.jpg" },

  // Buzos dama
  { id: 5, nombre: "Buzo Negro Dama (S)", precio: 27000, stock: 1, imagen: "assets/img/buzo-negro-dama.jpg" },
  { id: 6, nombre: "Buzo Camel Dama (L)", precio: 27000, stock: 1, imagen: "assets/img/buzo-camel.jpg" },
  { id: 7, nombre: "Buzo Chocolate Dama (M)", precio: 27000, stock: 1, imagen: "assets/img/buzo-chocolate.jpg" },
  { id: 8, nombre: "Buzo Blanco Dama (XL)", precio: 27000, stock: 1, imagen: "assets/img/buzo-blanco-dama.jpg" },

  // Remeras hombre
  { id: 9, nombre: "Remera Negra Hombre (M)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-hombre-m.jpg" },
  { id: 10, nombre: "Remera Negra Hombre (L)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-hombre-l.jpg" },
  { id: 11, nombre: "Remera Negra Hombre (XL)", precio: 15000, stock: 1, imagen: "assets/img/remera-negra-hombre-xl.jpg" },
  { id: 12, nombre: "Remera Blanca Hombre (L)", precio: 15000, stock: 1, imagen: "assets/img/remera-blanca-hombre-l.jpg" },

  // Remeras dama
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
    carrito.push(producto);
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

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString("es-AR")}`;
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = `Total: $${suma.toLocaleString("es-AR")}`;
}

// Inicializar
mostrarProductos();

// Newsletter (simulado)
document.getElementById("form-newsletter").addEventListener("submit", function(e){
  e.preventDefault();
  const email = document.getElementById("email").value;
  document.getElementById("mensaje-newsletter").textContent = `¡Gracias por suscribirte, ${email}!`;
  this.reset();
});
