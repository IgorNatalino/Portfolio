// Menu Hamburguer

const menuHamburguer = document.querySelector('.cabecalho_menu');
const menuLista = document.querySelector('.cabecalho_menu_lista');

function abreMenu() {
	menuLista.classList.toggle('hidden');
}

menuHamburguer.addEventListener('click', abreMenu);

// De Volta ao Topo

let VoltaTopo = document.querySelector('.voltatopo_btn');

window.onscroll = function () {
	AparecerBotao();
};

function AparecerBotao() {
	// Pixels para o botão aparecer
	if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
		VoltaTopo.style.display = 'block';
	} else {
		VoltaTopo.style.display = 'none';
	}
}

VoltaTopo.addEventListener('click', VoltoAoTopo);

function VoltoAoTopo() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}

// Dark Mode
const html = document.querySelector('html');
const temaBotaoMobile = document.querySelector('.switch_desk input');
const temaBotaoDesk = document.querySelector('.switch_desk input');

function inicializaTema() {
	const prefersDarkColorScheme = () => window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (prefersDarkColorScheme) {
		temaBotaoMobile.checked = true;
		temaBotaoDesk.checked = true;
		trocaTema('dark');
	}
}

function obterTemaAtual() {
	return html.getAttribute('data-theme');
}

function trocaTema(tema) {
	html.setAttribute('data-theme', tema);
}

function ClickTrocaTema() {
	const temaAtual = obterTemaAtual();

	if (temaAtual === 'light') {
		trocaTema('dark');
	} else if (temaAtual === 'dark') {
		trocaTema('light');
	}
}

inicializaTema();

temaBotaoMobile.addEventListener('click', ClickTrocaTema);
temaBotaoDesk.addEventListener('click', ClickTrocaTema);
