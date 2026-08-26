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

function gerarCards() {
	const container = document.querySelector('.projetos_display');

	projetos.forEach((projeto) => {
		// Criar o card
		const card = document.createElement('div');
		card.classList.add('projetos_card');

		// Adicionar imagem
		const imagemDiv = document.createElement('div');
		imagemDiv.classList.add('projetos_card_imagem');
		const imagem = document.createElement('img');
		imagem.src = projeto.imagem;
		imagem.alt = projeto.titulo;
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

// Chame a função para gerar os cards ao carregar a página
document.addEventListener('DOMContentLoaded', gerarCards);
