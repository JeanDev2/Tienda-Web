import { abrirMenu, cerrarMenu } from './menu.js';


let productosCarrito = localStorage.getItem("productos-en-carrito");
productosCarrito = JSON.parse(productosCarrito)

const contenedorCarritoVacio = document.querySelector('#carrito-vacio')
const contenedorCarritoProductos = document.querySelector('#carrito-productos')
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones')
const contenedorCarrritoComprado = document.querySelector('#carrito-comprado')
let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar')
const botonVaciar = document.querySelector('#carrito-acciones-vaciar')
const contenedorTotal = document.querySelector('#total');
const botonComprar = document.querySelector('#carrito-acciones-comprar')

function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {

        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarrritoComprado.classList.add('disabled');
    
        contenedorCarritoProductos.innerHTML = '';
    
        productosCarrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
    
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button id="${producto.id}" class="carrito-producto-eliminar"><i class="bi bi-trash-fill"></i></button>
            `
            contenedorCarritoProductos.append(div);
            
        })
    
    
    }else {
    
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarrritoComprado.classList.add('disabled');
    }
    actulizarBotonesEliminar()
    actulizarTotal()
}

cargarProductosCarrito()

function actulizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar')

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarItemCarrito)
    })
}

function eliminarItemCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.find(producto => producto.id === idBoton)

    console.log(productosCarrito)
    productosCarrito.splice(index, 1)
    console.log(productosCarrito)
    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito))

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #9f8bee)",
          borderRadius: "2rem",
          fontSize: ".8rem"
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
}

botonVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito() {
    const totalCalculado = productosCarrito.reduce((acc,producto) => acc + producto.cantidad, 0)

    Swal.fire({
        title: "<strong>¿Estas seguro?</strong>",
        icon: "question",
        html: `
          Se van a borrar ${totalCalculado} productos
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Si
        `,
        cancelButtonText: `
          <i class="fa fa-thumbs-down"></i> No
        `
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        Swal.fire("Carrito Vaciado", "", "error");

        productosCarrito.length = 0;
        localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito))
        cargarProductosCarrito();
        
        } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        }
      });


}


function actulizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc,producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `${totalCalculado}`;
}

botonComprar.addEventListener('click', comprarCarrito)

function comprarCarrito() {
    productosCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosCarrito))
    
    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarrritoComprado.classList.remove('disabled');

}

abrirMenu()
cerrarMenu()