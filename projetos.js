// Logo multicolorido continua como arquivo. MySQL e AWS entraram no sprite de
// <symbol> porque a parte escura deles precisa seguir o tema — era isso que os
// arquivos "-branco" resolviam duplicando. Referencia que começa com # e sprite.
const icones = {
	HTML5: 'assets/Icons/html-5-svgrepo-com.svg',
	CSS3: 'assets/Icons/css-3-svgrepo-com.svg',
	JavaScript: 'assets/Icons/js-svgrepo-com.svg',
	Sass: 'assets/Icons/sass-svgrepo-com.svg',
	Git: 'assets/Icons/git-svgrepo-com.svg',
	Figma: 'assets/Icons/figma-svgrepo-com.svg',
	NodeJS: 'assets/Icons/nodejs-icon-svgrepo-com.svg',
	Tailwind: 'assets/Icons/tailwind-svgrepo-com.svg',
	TypeScript: 'assets/Icons/typescript-svgrepo-com.svg',
	Angular: 'assets/Icons/angular-svgrepo-com.svg',
};

function gerarIcone(nome) {
	const ref = icones[nome];

	if (!ref) {
		console.warn(`gerarIcone: nao existe icone para "${nome}"`);
		return '';
	}

	if (ref.startsWith('#')) {
		return `<svg class="projetos_skills_img" role="img"><title>${nome}</title><use href="${ref}" /></svg>`;
	}

	return `<img src="${ref}" loading="lazy" class="projetos_skills_img" alt="${nome} Logo">`;
}

const projetos = [
	{
		imagem: 'assets/projetos/calculator_preview.png',
		titulo: 'Calculadora com JavaScript',
		descricao: 'Calculadora feita em JavaScript com 3 Temas de cores',
		tecnologias: [
			{
				nome: 'HTML5',
				icone: gerarIcone('HTML5'),
			},
			{
				nome: 'CSS3',
				icone: gerarIcone('CSS3'),
			},
			{
				nome: 'JavaScript',
				icone: gerarIcone('JavaScript'),
			},
		],
		links: {
			site: `https://reallysimplecalculator.netlify.app/`,
			code: `https://github.com/IgorNatalino/Calculadora`,
		},
	},
	{
		imagem: 'assets/projetos/socialmedialinks_preview.png',
		titulo: 'Links de Social Media',
		descricao: 'Projeto agregador de Links, desenvolvido com foco no Tailwind',
		tecnologias: [
			{
				nome: 'HTML5',
				icone: gerarIcone('HTML5'),
			},
			{
				nome: 'CSS3',
				icone: gerarIcone('CSS3'),
			},
			{
				nome: 'Tailwind',
				icone: gerarIcone('Tailwind'),
			},
		],
		links: {
			site: `https://socialmedia-links.netlify.app/`,
			code: `https://github.com/IgorNatalino/Social-Media-Links-Profile`,
		},
	},
	{
		imagem: 'assets/projetos/formsubmit_preview.png',
		titulo: 'Validação de Formulário',
		descricao: 'Projeto de Formulário com validação de preenchimento em JS',
		tecnologias: [
			{
				nome: 'HTML5',
				icone: gerarIcone('HTML5'),
			},
			{
				nome: 'CSS3',
				icone: gerarIcone('CSS3'),
			},
			{
				nome: 'JavaScript',
				icone: gerarIcone('JavaScript'),
			},
		],
		links: {
			site: `https://signformvalidation.netlify.app/`,
			code: `https://github.com/IgorNatalino/Signup-form`,
		},
	},
	{
		imagem: 'assets/projetos/qrcode_preview.png',
		titulo: 'Card CSS',
		descricao: 'Card com CSS Flexbox',
		tecnologias: [
			{
				nome: 'HTML5',
				icone: gerarIcone('HTML5'),
			},
			{
				nome: 'CSS3',
				icone: gerarIcone('CSS3'),
			},
		],
		links: {
			site: `https://in-qrcode.netlify.app/`,
			code: `https://github.com/IgorNatalino/QR-Code`,
		},
	},
	{
		imagem: 'assets/projetos/portfolio_preview.png',
		titulo: 'Figma Design',
		descricao: 'Design de Portfolio desenvolvido em Figma',
		tecnologias: [
			{
				nome: 'Figma',
				icone: gerarIcone('Figma'),
			},
		],
		links: {
			site: `#home`,
			code: `https://www.figma.com/design/NPmFMi5maAckHWOeL3ed59/Portfolio-Design?node-id=37-94&node-type=canvas&t=LUdPG8QjVWq2BN7D-0`,
		},
	},
];
