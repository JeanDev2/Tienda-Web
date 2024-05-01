let productos = [];
import { cargarProductos, tipoCategoria  }  from './cargarDatos.js';
// import { productos } from './data.js';
import { abrirMenu, cerrarMenu } from './menu.js';

// fetch("./js/producto.json")
//     .then(response => response.json())
//     .then(data => {
//         productos = data;
//         cargarProductos(productos);
//     })

tipoCategoria();
abrirMenu()
cerrarMenu()