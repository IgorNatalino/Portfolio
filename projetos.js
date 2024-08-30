const icones = {
	HTML5: 'assets/Icons/html-5-svgrepo-com.svg',
	CSS3: 'assets/Icons/css-3-svgrepo-com.svg',
	JavaScript: 'assets/Icons/js-svgrepo-com.svg',
	Sass: 'assets/Icons/sass-svgrepo-com.svg',
	Git: 'assets/Icons/git-svgrepo-com.svg',
	Photoshop: 'assets/Icons/adobe-photoshop-svgrepo-com.svg',
	Figma: 'assets/Icons/figma-svgrepo-com.svg',
	NodeJS: 'assets/Icons/nodejs-icon-svgrepo-com.svg',
	Tailwind: 'assets/Icons/tailwind-svgrepo-com.svg',
	Wordpress: 'assets/Icons/wordpress-icon-logo-svgrepo-com.svg',
	TypeScript: 'assets/Icons/typescript-svgrepo-com.svg',
	MySQL: 'assets/Icons/mysql-svgrepo-com.svg',
	Angular: 'assets/Icons/angular-svgrepo-com.svg',
	AWS: 'assets/Icons/aws-svgrepo-com.svg',
};

function gerarIcone(nome) {
	return `<img src="${icones[nome]}" loading="lazy" class="projetos_skills_img" alt="${nome} Logo">`;
}

const projetos = [
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
			code: `https://github.com/IgorNatalino/`,
		},
	},
];
