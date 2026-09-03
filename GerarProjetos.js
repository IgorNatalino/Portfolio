// Ancora estilizada de botao: <a> dentro de <button> e interativo dentro de
// interativo, e o teclado nao alcanca o link.
function criarBotao(texto, href, novaAba) {
	const link = document.createElement('a');
	link.classList.add('projetos_card_btn');
	link.href = href;
	link.textContent = texto;
	if (novaAba) {
		link.target = '_blank';
		link.rel = 'noopener';
	}
	return link;
}

// Se o JS falhar aqui a secao Projetos fica vazia e silenciosa: quem visita
// ve um titulo e nada embaixo, sem saber se acabou ou se quebrou. Esta funcao
// e o unico lugar que sabe disso, entao e ela que mostra o caminho alternativo.
function mostrarFalha(container, motivo) {
	console.error('gerarCards:', motivo);

	const aviso = document.createElement('p');
	aviso.classList.add('textos');
	aviso.textContent = 'Não foi possível carregar os projetos agora. A lista completa está em ';

	const link = document.createElement('a');
	link.classList.add('link_texto');
	link.href = 'https://github.com/IgorNatalino?tab=repositories';
	link.target = '_blank';
	link.rel = 'noopener';
	link.textContent = 'github.com/IgorNatalino';

	aviso.appendChild(link);
	aviso.appendChild(document.createTextNode('.'));
	container.appendChild(aviso);
}

function gerarCards() {
	const container = document.querySelector('.projetos_display');

	// Sem container nao ha nem onde escrever o aviso de erro.
	if (!container) {
		console.error('gerarCards: .projetos_display nao existe no DOM');
		return;
	}

	// projetos vem de projetos.js, carregado antes deste arquivo. Se aquele
	// script nao chegou, `projetos` nem esta definido — daria ReferenceError
	// no forEach abaixo e a secao ficaria vazia sem explicacao.
	if (typeof projetos === 'undefined' || !Array.isArray(projetos) || projetos.length === 0) {
		mostrarFalha(container, 'projetos.js nao carregou ou a lista esta vazia');
		return;
	}

	projetos.forEach((projeto) => {
		// Criar o card
		const card = document.createElement('div');
		card.classList.add('projetos_card');

		// Adicionar imagem
		const imagemDiv = document.createElement('div');
		imagemDiv.classList.add('projetos_card_imagem');
		const imagem = document.createElement('img');
		imagem.src = projeto.imagem;
		// alt vazio de proposito: o titulo do projeto vem como texto no card
		// logo abaixo. Repetir no alt faz o leitor de tela anunciar duas vezes.
		imagem.alt = '';
		imagem.loading = 'lazy';
		imagemDiv.appendChild(imagem);
		card.appendChild(imagemDiv);

		// Adicionar título e descrição
		const textoDiv = document.createElement('div');
		textoDiv.classList.add('projetos_card_texto');
		const titulo = document.createElement('p');
		titulo.classList.add('projetos_titulo');
		titulo.textContent = projeto.titulo;
		const descricao = document.createElement('p');
		descricao.classList.add('projetos_descricao');
		descricao.textContent = projeto.descricao;
		textoDiv.appendChild(titulo);
		textoDiv.appendChild(descricao);
		card.appendChild(textoDiv);

		// Adicionar tecnologias
		const skillsDiv = document.createElement('div');
		skillsDiv.classList.add('projetos_skills');
		projeto.tecnologias.forEach((tecnologia) => {
			const iconeContainer = document.createElement('div');
			iconeContainer.innerHTML = tecnologia.icone;
			skillsDiv.appendChild(iconeContainer);
		});
		card.appendChild(skillsDiv);

		// Adicionar botões
		const btnsDiv = document.createElement('div');
		btnsDiv.classList.add('projetos_card_btns');
		btnsDiv.appendChild(criarBotao('Site', projeto.links.site, true));
		btnsDiv.appendChild(criarBotao('Code', projeto.links.code, true));
		card.appendChild(btnsDiv);

		// Adicionar o card ao container
		container.appendChild(card);
	});
}

// Chame a função para gerar os cards ao carregar a página.
// O try/catch aqui e a rede: um projeto sem `links` ou sem `tecnologias`
// lancaria no meio do forEach, deixando a secao com metade dos cards e sem
// nenhum aviso de que o resto existia.
document.addEventListener('DOMContentLoaded', () => {
	try {
		gerarCards();
	} catch (erro) {
		const container = document.querySelector('.projetos_display');
		if (container) {
			mostrarFalha(container, erro);
		}
	}
});
