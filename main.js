const menuHamburguer = document.querySelector('.cabecalho_menu');
const menuLista = document.querySelector('.cabecalho_menu_lista');

function abreMenu() {
	menuLista.classList.toggle('hidden');
}

// Adiciona um evento de clique ao elemento menuHamburguer
menuHamburguer.addEventListener('click', abreMenu);
