const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const aside = document.querySelector('#aside');
const botonesCategorias = document.querySelectorAll('.boton-categoria');

export function abrirMenu() {
    openMenu.addEventListener('click', () => {
        aside.classList.add("aside-visible");
    })
}

export function cerrarMenu() {
    closeMenu.addEventListener('click', () => {
        aside.classList.remove("aside-visible");
    })
}

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible")
}))

