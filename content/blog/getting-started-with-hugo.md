---
title: "Começando com Hugo e Hextra"
date: 2026-01-29
draft: false
tags: ["hugo", "desenvolvimento-web", "tutorial"]
# image: /images/blog/hugo-hextra.jpg  # Descomente e adicione uma imagem personalizada
authors:
  - name: Jonathan Rodrigues
    link: https://github.com/jonathanarodr
---

Hugo é um gerador de sites estáticos fantástico que torna a construção de sites rápidos incrivelmente fácil. Neste post, vou compartilhar minha experiência configurando este blog com o tema Hextra.

<!--more-->

## Por que Hugo?

Hugo se destaca por várias razões:

- **Velocidade**: Tempos de build extremamente rápidos
- **Simplicidade**: Sem dependências (binário único)
- **Documentação**: Excelente documentação oficial
- **Comunidade**: Comunidade ativa e muitos temas disponíveis

## Por que Hextra?

O tema Hextra oferece:

- Design moderno e responsivo
- Modo escuro nativo
- Busca integrada
- Syntax highlighting para código
- Configuração mínima necessária

## Configuração Básica

A configuração do Hugo é feita através do arquivo `hugo.yaml`:

```yaml
title: Meu Blog
languageCode: pt-br
theme: hextra
```

## Criando Conteúdo

Criar um novo post é simples:

```bash
hugo new content/blog/meu-post.md
```

## Deploy

Com GitHub Actions, o deploy é automático. Basta fazer push para o repositório e o site é atualizado automaticamente.

## Conclusão

Hugo + Hextra é uma combinação poderosa para criar blogs técnicos. A velocidade do Hugo e o design moderno do Hextra tornam a experiência de escrever e publicar conteúdo muito agradável.
