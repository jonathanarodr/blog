# Jonathan Rodrigues - Blog Pessoal

Blog pessoal em português construído com Hugo e o tema Hextra.

## Stack Tecnológico

- **Hugo** - Gerador de sites estáticos
- **Hextra Theme** - Tema moderno Hugo com Tailwind CSS
- **GitHub Pages** - Hospedagem
- **GitHub Actions** - Deploy automatizado

## Desenvolvimento

### Pré-requisitos

- Hugo (versão extended) 0.147.9+
- Go 1.24+
- Git

### Desenvolvimento Local

```bash
# Clonar repositório
git clone https://github.com/jonathan-rodrigues/blog.git
cd blog

# Instalar dependências
hugo mod tidy

# Iniciar servidor de desenvolvimento
hugo server --buildDrafts --disableFastRender -p 1313

# Build para produção
hugo --gc --minify
```

Acesse http://localhost:1313 para visualizar o site localmente.

### Adicionando Conteúdo

#### Posts de Blog

```bash
# Criar novo post
hugo new content/blog/meu-novo-post.md
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
    link: https://github.com/jonathan-rodrigues
---
```

#### Projetos

```bash
# Criar novo projeto
hugo new content/projects/meu-projeto.md
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
│   └── projects/           # Projetos
├── static/
│   └── images/             # Imagens e assets
├── hugo.yaml               # Configuração do Hugo
├── go.mod                  # Dependências Go
└── README.md
```

## Comandos Úteis

```bash
# Servidor de desenvolvimento
hugo server --buildDrafts -p 1313

# Build de produção
hugo --gc --minify

# Atualizar tema Hextra
hugo mod get -u github.com/imfing/hextra
hugo mod tidy

# Verificar versão do Hugo
hugo version
```

## Licença

Conteúdo: © Jonathan Rodrigues
Código: MIT License
