let productos = []

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })


const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")



botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible")
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = ""

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `

        contenedorProductos.append(div)
    })

    actualizarBotonesAgregar()
}



function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let productosEnCarrito

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
} else {
    productosEnCarrito = []
}

function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #961818, #d40505)",
          borderRadius: "2rem",
          textTransform: "uppercase"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast()

    const idBoton = e.target.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }



    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}