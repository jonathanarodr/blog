# Guia de Criação de Conteúdo

Este guia explica como criar e gerenciar conteúdo para o blog.

## Estrutura de Conteúdo

Todo o conteúdo fica no diretório `content/`, organizado por seções:

- `content/blog/` - Posts do blog
- `content/showcase/` - Showcase (projetos)
- `content/about.md` - Página sobre

## Versão em Markdown

Toda página (posts, Sobre, Showcase) também é publicada em Markdown ao lado do HTML, trocando a barra final por `.md`: `/about.md`, `/blog/meu-post.md`, `/en/about.md`. Imagens com caminho relativo ao post viram URLs absolutas no Markdown. Nessas páginas, o menu de compartilhar (acima do sumário no desktop; botão flutuante com painel no mobile) permite copiar o link da página, copiar o Markdown, copiar o link do Markdown ou abri-lo em nova aba. Os templates ficam em `layouts/single.md` e `layouts/blog/single.md`; shortcodes usados nas páginas precisam de uma versão `.md` em `layouts/_shortcodes/` (ex.: `callout.md`).

## Idiomas

O site é bilíngue: português na raiz (`/`) e inglês em `/en/`. A tradução de uma página fica no mesmo diretório com o sufixo `.en.md`; em posts e projetos, dentro da pasta do conteúdo (veja [Gestão de Imagens](#gestão-de-imagens)):

```
content/blog/meu-post/index.md      # português
content/blog/meu-post/index.en.md   # inglês (usa as mesmas imagens da pasta)
```

O menu de idioma leva para a tradução da página quando ela existe, senão para a home do idioma. Textos da interface ficam em `i18n/pt.yaml` e `i18n/en.yaml`.

## Posts de Blog

### Localização

`content/blog/nome-do-post/` (uma pasta por post, com o texto e as imagens)

### Criar Novo Post

```bash
hugo new content/blog/nome-do-post/index.md
```

### Template de Front Matter

```yaml
---
title: "Título do Post"
date: 2026-01-21
draft: false  # true para rascunho, false para publicar
description: "Resumo curto exibido abaixo do título"
tags: ["categoria", "tecnologia", "tópico"]
toc: false  # opcional: esconde o sumário lateral (desktop, aparece com 2+ títulos h2/h3)
authors:
  - name: Jonathan Rodrigues
    link: https://github.com/jonathanarodr
    image: https://avatars.githubusercontent.com/u/10449607?v=4
---
```

### Estrutura Recomendada

```markdown
---
Front matter aqui
---

Parágrafo de introdução. Use <!--more--> para definir o trecho de resumo.

<!--more-->

## Seção Principal

Conteúdo com **formatação**, listas e [links](url).

```python
def exemplo_codigo():
    return "código com syntax highlighting"
```

## Conclusão

Resumo e call-to-action.
```

### Dicas para Escrita

1. **Título**: Claro, descritivo e amigável para SEO
2. **Tags**: 3-5 tags relevantes para categorização
3. **Draft**: Use `draft: true` enquanto escreve
4. **Imagens**: Na pasta do post, veja [Gestão de Imagens](#gestão-de-imagens)
5. **Código**: Use blocos de código com identificador de linguagem

## Projetos

### Localização

`content/showcase/nome-projeto/` (uma pasta por projeto, como nos posts)

Um arquivo `icon.*` (de preferência SVG quadrado) na pasta do projeto aparece redondo acima do título, como a foto na página Sobre. O botão "Conhecer o projeto" vem do campo `link` do front matter, então não repita o link no fim do texto.

### Criar Novo Projeto

```bash
hugo new content/showcase/nome-projeto/index.md
```

### Template de Front Matter

```yaml
---
title: "Nome do Projeto"
date: 2026-01-29
weight: 1  # Menor peso = maior prioridade na listagem
---
```

### Estrutura Recomendada

```markdown
## Visão Geral
Descrição breve do projeto

## Recursos
- Recurso 1
- Recurso 2

## Tecnologias
Lista de tecnologias utilizadas

## Links
- [Demo ao Vivo](url)
- [Código Fonte](url)
- [Documentação](url)
```

## Formatação Markdown

### Cabeçalhos

```markdown
# H1 - Título Principal
## H2 - Seção
### H3 - Subseção
```

### Ênfase

```markdown
**negrito**
*itálico*
`código inline`
```

### Listas

```markdown
- Item 1
- Item 2
  - Subitem

1. Primeiro
2. Segundo
```

### Links

```markdown
[Texto do link](https://url.com)
```

### Blocos de Código

````markdown
```python
def hello():
    print("Hello, World!")
```
````

### Citações

```markdown
> Isto é uma citação
```

## Shortcodes

### Cards

```markdown
{{< cards >}}
  {{< card link="/showcase" title="Showcase" subtitle="Opcional" >}}
  {{< card link="/blog" title="Blog" >}}
{{< /cards >}}
```

### Callouts

```markdown
{{< callout type="info" >}}
Informação importante aqui.
{{< /callout >}}
```

Tipos: `info`, `warning`, `error`, `success`

Também funciona com alertas do GitHub:

```markdown
> [!WARNING]
> Cuidado com isso.
```

### Detalhes (Accordion)

```markdown
{{< details "Clique para expandir" >}}
Conteúdo oculto aqui.
{{< /details >}}
```

## Currículo (página Sobre)

Os dados do currículo ficam em `data/resume/pt.yaml` e `data/resume/en.yaml` (um por idioma) e aparecem na página Sobre pelos shortcodes:

| Shortcode | Conteúdo |
|---|---|
| `{{< experience >}}` | Timeline de experiências |
| `{{< education >}}` | Timeline de formação |
| `{{< skills >}}` | Tags de skills gerais |
| `{{< languages >}}` | Idiomas e nível |
| `{{< courses >}}` | Cursos e certificações |
| `{{< contact >}}` | Lista de contatos (LinkedIn, e-mail) |

Logos das empresas ficam em `static/images/brands/` (SVG quadrado, de preferência). Liste empresas e cargos do mais recente para o mais antigo; datas em `AAAA-MM` e `end` vazio marca o cargo atual:

```yaml
experience:
  - company: Empresa
    url: https://empresa.com   # opcional
    logo: /images/brands/empresa.svg   # opcional; sem logo aparece um ícone padrão
    roles:
      - title: Cargo atual
        start: 2024-12
        summary: Resumo do cargo.
        highlights:
          - Conquista ou responsabilidade.
        skills: [Kotlin, Android]
```

## Gestão de Imagens

Posts e projetos são *page bundles*: cada um é uma pasta com o texto, as traduções e as imagens juntos. O Hugo reduz as imagens e converte para WebP no build, então pode usar a foto original.

```
content/blog/nome-do-post/
  index.md          # português
  index.en.md       # inglês
  cover.jpg         # capa (opcional)
  images/
    castelo.jpg
    dragoes.jpg
```

Regras:

1. **Uma pasta por post ou projeto**, com o slug como nome; ele vira a URL (`/blog/nome-do-post/`).
2. **Capa**: um arquivo `cover.*` (jpg, png, webp) na raiz da pasta. Aparece no card (2:1) e no topo do post (16:9), e é usada no compartilhamento (Open Graph). Se a imagem tiver fundo transparente ou não preencher a área, defina a cor de fundo no front matter com `coverBackground: "#fff"`. Sem `cover.*`, o card ganha uma capa padrão: um dos gradientes de `assets/images/covers/`, escolhido pelo título, com o título por cima.
3. **Demais imagens em `images/`**, referenciadas por caminho relativo.
4. **Nomes de arquivo** em minúsculas, com hífen e sem acento (`tela-inicial.png`).
5. **Fora da pasta** só o que é compartilhado: capas padrão em `assets/images/covers/` e logos SVG em `static/images/brands/`.

### Imagem única

Uma imagem sozinha numa linha vira uma figura que abre ampliada ao clicar. O título (entre aspas) vira a legenda:

```markdown
![Texto alternativo](images/castelo.jpg "Legenda opcional")
```

### Galeria

Fotos declaradas juntas formam um mosaico: a primeira grande à esquerda e até mais quatro à direita. A partir da sexta, o último bloco mostra `+N`. Todas abrem no lightbox, navegável com as setas:

```markdown
{{</* gallery caption="Legenda opcional da galeria" */>}}
![Castelo](images/castelo.jpg "Legenda da foto")
![Dragões](images/dragoes.jpg)
![Montanha-russa](images/montanha-russa.jpg)
{{</* /gallery */>}}
```

Uma imagem por linha. Com 2 a 4 fotos o mosaico se adapta.

### Vídeo do YouTube

Vídeo 16:9 com os mesmos cantos das imagens, via `youtube-nocookie.com`. Na versão em Markdown vira um link:

```markdown
{{</* youtube id="XmYM505rHkQ" title="Título do vídeo" caption="Legenda opcional" */>}}
```

## Checklist de Publicação

Antes de publicar um post:

- [ ] Título claro e descritivo
- [ ] Front matter completo
- [ ] `draft: false`
- [ ] Tags apropriadas
- [ ] Imagens com texto alternativo
- [ ] Links funcionando
- [ ] Código com identificador de linguagem
- [ ] Ortografia e gramática revisadas
- [ ] Preview local com `hugo server`
- [ ] Commit e push para publicar

## Datas

Hugo usa o formato ISO 8601:

```yaml
date: 2026-01-29
date: 2026-01-29T14:30:00-03:00  # Com horário e timezone
```

## SEO

Para melhor SEO, inclua:

- Título descritivo (50-60 caracteres)
- Primeiro parágrafo como resumo
- Tags relevantes
- Links internos e externos
- Imagens com texto alternativo

## Workflow Git

```bash
# Verificar status
git status

# Adicionar novos arquivos
git add content/blog/novo-post.md

# Commit
git commit -m "Add: novo post sobre Hugo"

# Push (dispara deploy automático)
git push origin main
```
