// Tema, menu e botao de voltar ao topo. Cada comportamento num IIFE: antes
// tudo vivia em escopo global, onde um nome repetido em qualquer outro script
// sobrescreve o anterior sem aviso.

// ------------------------------------------------------------------- TEMA
(function tema() {
	const CHAVE = 'tema';
	const html = document.documentElement;
	const consultaSistema = window.matchMedia('(prefers-color-scheme: dark)');
	const switches = Array.from(document.querySelectorAll('.switch input, .switch_desk input'));

	function escolhaSalva() {
		try {
			return localStorage.getItem(CHAVE);
		} catch (erro) {
			// Navegacao privativa pode bloquear o acesso. Sem persistencia o
			// tema vale so nesta aba, e isso nao e motivo para quebrar a pagina.
			return null;
		}
	}

	function aplica(novoTema, persistir) {
		html.setAttribute('data-theme', novoTema);

		// Os dois switches existem ao mesmo tempo no DOM — um para mobile e um
		// para desktop, escondidos por breakpoint. Antes, mexer em um deixava o
		// outro mostrando o estado errado.
		switches.forEach((input) => {
			input.checked = novoTema === 'dark';
		});

		if (!persistir) {
			return;
		}

		try {
			localStorage.setItem(CHAVE, novoTema);
		} catch (erro) {
			/* segue sem persistir */
		}
	}

	function doSistema() {
		return consultaSistema.matches ? 'dark' : 'light';
	}

	// Ordem: escolha explicita do visitante, depois a preferencia do sistema.
	// O codigo antigo testava `if (prefersDarkColorScheme)` — a funcao, nao o
	// resultado da chamada — o que e sempre verdadeiro. Resultado: todo mundo
	// abria no dark, e quem preferia light era ignorado.
	aplica(escolhaSalva() || doSistema(), false);

	// So grava quando o visitante escolhe. Persistir a preferencia do sistema
	// na primeira visita congelaria o tema e o site pararia de acompanhar quem
	// troca o modo do sistema depois.
	switches.forEach((input) => {
		input.addEventListener('change', () => {
			aplica(input.checked ? 'dark' : 'light', true);
		});
	});

	consultaSistema.addEventListener('change', (evento) => {
		if (!escolhaSalva()) {
			aplica(evento.matches ? 'dark' : 'light', false);
		}
	});
})();

// ------------------------------------------------------------------- MENU
// O gatilho agora e um <button> (era o <svg> com um listener de click). Alem
// de abrir a lista, o estado tem de sair no aria-expanded, no rotulo do botao
// e no icone — antes so a classe .hidden mudava, e nem o leitor de tela nem
// quem navega de teclado sabia se o menu estava aberto.
(function menu() {
	const botao = document.querySelector('.cabecalho_menu_btn');
	const lista = document.querySelector('.cabecalho_menu_lista');

	if (!botao || !lista) {
		return;
	}

	const rotulo = botao.querySelector('.menu_rotulo');
	const desenho = botao.querySelector('path');
	const abre = document.getElementById('menu-abre');
	const fecha = document.getElementById('menu-fecha');
	const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)');

	const D_HAMBURGUER = 'M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7';
	const D_X = 'M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7';

	function estaAberto() {
		return botao.getAttribute('aria-expanded') === 'true';
	}

	function trocaIcone(aberto) {
		// Quem pede menos movimento recebe o icone trocado de uma vez. Neste
		// caminho o beginElement nunca roda, entao o setAttribute vale — se as
		// duas formas se misturassem, a animacao congelada (fill="freeze")
		// venceria o atributo e o icone travaria.
		if (semAnimacao.matches) {
			if (desenho) {
				desenho.setAttribute('d', aberto ? D_X : D_HAMBURGUER);
			}
			return;
		}

		const animacao = aberto ? abre : fecha;

		// beginElement so existe onde ha SMIL. Sem ele o icone fica parado no
		// hamburguer, e o menu continua abrindo e fechando normalmente.
		if (animacao && typeof animacao.beginElement === 'function') {
			try {
				animacao.beginElement();
			} catch (erro) {
				/* icone sem animacao nao impede o menu de funcionar */
			}
		}
	}

	function define(aberto) {
		lista.classList.toggle('hidden', !aberto);
		botao.setAttribute('aria-expanded', String(aberto));

		if (rotulo) {
			rotulo.textContent = aberto ? 'Fechar menu' : 'Abrir menu';
		}

		trocaIcone(aberto);
	}

	botao.addEventListener('click', () => {
		define(!estaAberto());
	});

	// Escape fecha e devolve o foco ao botao. Sem isso, quem abriu de teclado
	// so sai da lista tabulando ate o fim dela.
	document.addEventListener('keydown', (evento) => {
		if (evento.key === 'Escape' && estaAberto()) {
			define(false);
			botao.focus();
		}
	});

	// Clicar num item rola para a secao, mas o menu cobre 62% da tela: deixar
	// aberto tapa justamente o conteudo que a pessoa acabou de pedir.
	lista.querySelectorAll('.menu_lista_link').forEach((link) => {
		link.addEventListener('click', () => define(false));
	});
})();

// -------------------------------------------------------- VOLTAR AO TOPO
(function voltarAoTopo() {
	const botao = document.querySelector('.voltatopo_btn');

	if (!botao) {
		return;
	}

	const LIMITE = 120; // pixels de rolagem antes de o botao aparecer
	let agendado = false;

	function atualiza() {
		agendado = false;
		const y = window.scrollY || document.documentElement.scrollTop;
		botao.style.display = y > LIMITE ? 'block' : 'none';
	}

	// addEventListener em vez de window.onscroll, que sobrescreve qualquer
	// outro handler de scroll da pagina. E requestAnimationFrame para nao
	// escrever no style a cada evento — o scroll dispara dezenas por segundo.
	window.addEventListener(
		'scroll',
		() => {
			if (agendado) {
				return;
			}
			agendado = true;
			window.requestAnimationFrame(atualiza);
		},
		{ passive: true }
	);

	// O CSS ja desliga o scroll-behavior: smooth do html em
	// prefers-reduced-motion, mas o behavior passado aqui na chamada vence a
	// folha de estilo — precisa ler a mesma preferencia.
	const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)');

	botao.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: semAnimacao.matches ? 'auto' : 'smooth' });
	});

	// A pagina pode abrir ja rolada, por ancora ou por restauracao de posicao.
	atualiza();
})();
