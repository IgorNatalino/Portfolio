// MENU HAMBURGUER

const menuHamburguer = document.querySelector('.cabecalho_menu');
const menuLista = document.querySelector('.cabecalho_menu_lista');

function abreMenu() {
	menuLista.classList.toggle('hidden');
}

// Adiciona um evento de clique ao elemento menuHamburguer
menuHamburguer.addEventListener('click', abreMenu);

// DE VOLTA AO TOPO

let mybutton = document.getElementById('myBtn');

window.onscroll = function () {
	AparecerBotao();
};

function AparecerBotao() {
	// Pixels para o botão aparecer
	if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
	}
}

mybutton.addEventListener('click', VoltoAoTopo());

function VoltoAoTopo() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}
