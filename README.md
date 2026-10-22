# Jonathan Rodrigues - Blog Pessoal

Blog pessoal em português construído com Hugo e um tema próprio.

## Stack Tecnológico

- **Hugo** - Gerador de sites estáticos
- **Tema próprio** - Layouts em `layouts/`, estilos em `assets/css/` e scripts em `assets/js/`
- **Fontes** - Momo Trust Display (títulos), Inter (texto) e JetBrains Mono (código), via Google Fonts
- **GitHub Pages** - Hospedagem
- **GitHub Actions** - Deploy automatizado

## Desenvolvimento

### Pré-requisitos

- Hugo (versão extended) 0.155.0+
- Git

### Desenvolvimento Local

```bash
# Clonar repositório
git clone https://github.com/jonathanarodr/blog.git
cd blog

# Iniciar servidor de desenvolvimento
hugo server --buildDrafts --disableFastRender --noHTTPCache -p 1313

# Build para produção
hugo --gc --minify
```

Acesse http://localhost:1313 para visualizar o site localmente.

### Adicionando Conteúdo

#### Posts de Blog

```bash
# Criar novo post
hugo new content/blog/meu-novo-post/index.md
```

Estrutura do front matter:

```yaml
---
title: "Título do Post"
date: 2026-01-29
draft: false
tags: ["tag1", "tag2"]
authors:
  - name: Jonathan Rodrigues
    link: https://github.com/jonathanarodr
---
```

#### Projetos

```bash
# Criar novo projeto
hugo new content/showcase/meu-projeto/index.md
```

Estrutura do front matter:

```yaml
---
title: "Nome do Projeto"
date: 2026-01-29
weight: 1
---
```

## Deploy

Deploy automático para GitHub Pages ocorre a cada push para a branch `main` via GitHub Actions.

### Configuração Inicial do GitHub Pages

1. Criar repositório no GitHub
2. Ir para Settings > Pages
3. Source: "GitHub Actions"
4. O workflow será executado automaticamente

## Estrutura do Projeto

```
.
├── .github/
│   └── workflows/
│       └── pages.yaml       # GitHub Actions workflow
├── content/
│   ├── _index.md           # Página inicial
│   ├── about.md            # Página sobre
│   ├── blog/               # Posts do blog
│   └── showcase/           # Showcase (projetos)
├── static/
│   └── images/             # Imagens e assets
├── hugo.yaml               # Configuração do Hugo
└── README.md
```

## Tema (componentes)

O tema é próprio e organizado por componente:

- **Templates** — `layouts/_partials/jr/`: `card` (posts e projetos), `hub-header` (listas), `article-header` e `article-body` (posts, projetos e páginas), `toc`, `page-menu`, `share-links` e `author-card` (rodapé do post), `timeline` (currículo) e helpers como `vt-name` (nomes de view transition) e `icon`.
- **Estilos** — `assets/css/components/*.css`, um arquivo por componente, concatenados em ordem em `layouts/_partials/jr/head.html`.
- **Scripts** — `assets/js/main.js` importa um módulo por componente (`assets/js/components/`) sobre utilitários compartilhados (`assets/js/lib/`: scroll único, view transitions, clipboard).
- **Animações** — toda página entra com a classe `.enter` (escalonada por `--enter-step`); ao navegar com view transition, cards e títulos se transformam no destino e a animação de entrada é pulada.

## Comandos Úteis

```bash
# Servidor de desenvolvimento
hugo server --buildDrafts --noHTTPCache -p 1313

# Build de produção
hugo --gc --minify

# Verificar versão do Hugo
hugo version
```

## Licença

Conteúdo: © Jonathan Rodrigues
Código: MIT License
