# Guia de Criação de Conteúdo

Este guia explica como criar e gerenciar conteúdo para o blog.

## Estrutura de Conteúdo

Todo o conteúdo fica no diretório `content/`, organizado por seções:

- `content/blog/` - Posts do blog
- `content/projects/` - Projetos
- `content/about.md` - Página sobre

## Posts de Blog

### Localização

`content/blog/`

### Criar Novo Post

```bash
hugo new content/blog/nome-do-post.md
```

### Template de Front Matter

```yaml
---
title: "Título do Post"
date: 2026-01-21
draft: false  # true para rascunho, false para publicar
tags: ["categoria", "tecnologia", "tópico"]
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
4. **Imagens**: Coloque em `static/images/blog/nome-post/`
5. **Código**: Use blocos de código com identificador de linguagem

### Exemplo de Uso de Imagem

```markdown
![Texto alternativo](/images/blog/meu-post/imagem.jpg)
```

## Projetos

### Localização

`content/projects/`

### Criar Novo Projeto

```bash
hugo new content/projects/nome-projeto.md
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

## Shortcodes do Hextra

### Cards

```markdown
{{< cards >}}
  {{< card link="/docs" title="Docs" icon="document-text" >}}
  {{< card link="/blog" title="Blog" icon="newspaper" >}}
{{< /cards >}}
```

### Callouts

```markdown
{{< callout type="info" >}}
Informação importante aqui.
{{< /callout >}}
```

Tipos: `info`, `warning`, `error`, `success`

### Detalhes (Accordion)

```markdown
{{< details "Clique para expandir" >}}
Conteúdo oculto aqui.
{{< /details >}}
```

### Tabs

```markdown
{{< tabs items="Tab 1,Tab 2,Tab 3" >}}
  {{< tab >}}Conteúdo da Tab 1{{< /tab >}}
  {{< tab >}}Conteúdo da Tab 2{{< /tab >}}
  {{< tab >}}Conteúdo da Tab 3{{< /tab >}}
{{< /tabs >}}
```

## Gestão de Imagens

### Blog

Coloque em: `static/images/blog/nome-post/`

```markdown
![Alt text](/images/blog/nome-post/imagem.jpg)
```

### Projetos

Coloque em: `static/images/projects/nome-projeto/`

```markdown
![Alt text](/images/projects/nome-projeto/screenshot.png)
```

## Checklist de Publicação

Antes de publicar um post:

- [ ] Título claro e descritivo
- [ ] Front matter completo
- [ ] `draft: false`
- [ ] Tags apropriadas
- [ ] Imagens otimizadas
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
