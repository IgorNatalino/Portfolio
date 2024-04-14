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
const temaBotao = document.querySelector('.dark_input');

function obterTemaAtual() {
	return html.getAttribute('data-mode');
}

function trocaTema(tema) {
	html.setAttribute('data-mode', tema);
	/* banner.setAttribute('src', `/imagens/${contexto}.png`); */ // TODO IMGS DARK MODE
}

temaBotao.addEventListener('click', () => {
	const temaAtual = obterTemaAtual();

	if (temaAtual === 'light') {
		trocaTema('dark');
	} else if (temaAtual === 'dark') {
		trocaTema('light');
	}
});
