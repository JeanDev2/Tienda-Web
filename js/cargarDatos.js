import { productos } from './data.js';

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const titutloPrinciapl = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numerito');

export function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
        actulizarBotonesAgregar()
    })
}

export function tipoCategoria () {
    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', (e) => {
            botonesCategorias.forEach(boton => boton.classList.remove('active'))
            e.currentTarget.classList.add('active')
            if(e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
                titutloPrinciapl.innerHTML = productoCategoria.categoria.nombre
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
                return cargarProductos(productosBoton)
            }else {
                titutloPrinciapl.innerHTML = 'Todos los productos'
                return cargarProductos(productos)
            }

        })
    })
    
}

function actulizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarCarrito)
    })
}

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-en-carrito")

if(productosCarritoLS){
    productosCarrito = JSON.parse(productosCarritoLS)
    actulizarNumerito()
}else {
    productosCarrito = [];
}

export function agregarCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    
    if(productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado)
    }

    actulizarNumerito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosCarrito))
}

function actulizarNumerito() {
    let nuevoNumerito = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0 )
    numerito.innerHTML = nuevoNumerito
}
