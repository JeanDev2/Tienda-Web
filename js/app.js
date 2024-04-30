import { cargarProductos, tipoCategoria  }  from './cargarDatos.js';
import { productos } from './data.js';
import { abrirMenu, cerrarMenu } from './menu.js';

cargarProductos(productos);
tipoCategoria();
abrirMenu()
cerrarMenu()