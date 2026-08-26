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
(function menu() {
	const gatilho = document.querySelector('.cabecalho_menu');
	const lista = document.querySelector('.cabecalho_menu_lista');

	if (!gatilho || !lista) {
		return;
	}

	gatilho.addEventListener('click', () => {
		lista.classList.toggle('hidden');
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

	botao.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// A pagina pode abrir ja rolada, por ancora ou por restauracao de posicao.
	atualiza();
})();
