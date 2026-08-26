# Portfólio — Igor Natalino

Site pessoal de uma página. No ar em <https://igornatalino.github.io/Portfolio/>,
publicado pelo GitHub Pages a partir da branch `main`.

## Stack

HTML, CSS e JavaScript puros. Sem build, sem framework, sem dependência — o
repositório é o site. O único recurso externo é a fonte Poppins, do Google Fonts.

## Como rodar

Abrir `index.html` no navegador funciona. Para servir por HTTP, que é o que o
Pages faz:

```bash
python -m http.server 8000
# http://localhost:8000
```

## Estrutura

| caminho | o que é |
| --- | --- |
| `index.html` | a página inteira, mais o sprite de ícones em `<symbol>` no topo do `<body>` |
| `styles/reset.css` | reset do Meyer |
| `styles/styles.css` | tokens (`:root` e `[data-theme]`) e os `@import` dos demais |
| `styles/header.css`, `main.css`, `skills.css`, `projetos.css`, `rodape.css` | um arquivo por bloco da página |
| `styles/icones.css` | tamanho e cor dos ícones do sprite |
| `styles/efeitos.css` | os três efeitos de hover e animação que o site usa |
| `projetos.js` | a lista de projetos — só dados |
| `GerarProjetos.js` | monta os cards a partir dessa lista |
| `main.js` | tema, menu e botão de voltar ao topo |
| `assets/` | imagens, ícones e as duas poses do doodle |

## Tema

O tema vive no atributo `data-theme` do `<html>`, e as cores são tokens em
`styles/styles.css`. A ordem de decisão no carregamento é: escolha salva no
`localStorage`, depois `prefers-color-scheme` do sistema. Só a escolha explícita
é persistida, para o site continuar acompanhando quem troca o modo do sistema
depois.

Os ícones seguem o tema por `currentColor`, não por arquivo duplicado: um
`<symbol>` só serve os dois temas.

## Adicionar um projeto

Um objeto no array `projetos`, em `projetos.js`. Os ícones de tecnologia saem do
mapa `icones` no mesmo arquivo, que aceita dois formatos:

- caminho de arquivo (`assets/Icons/...`) → vira `<img>`, para logo multicolorido
- referência começando com `#` (`#icone-mysql`) → aponta para um `<symbol>` do
  sprite, para logo cuja cor precisa seguir o tema

## Assets

As duas poses do doodle (`assets/doodle/`) estão em WebP, com PNG de fallback via
`<picture>`, a 800px — o dobro da largura de exibição. Os PSDs de origem ficam
fora do Git, no backup, por causa do tamanho.
