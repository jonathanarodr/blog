# Referência Rápida de Comandos

## Desenvolvimento Local

```bash
# Iniciar servidor de desenvolvimento
hugo server --buildDrafts --disableFastRender -p 1313

# Iniciar com live reload otimizado
hugo server -D

# Iniciar em porta específica
hugo server -p 8080

# Build de produção
hugo --gc --minify

# Build de produção com verbose
hugo --gc --minify --verbose
```

## Criação de Conteúdo

```bash
# Novo post de blog
hugo new content/blog/meu-post.md

# Novo projeto
hugo new content/projects/meu-projeto.md

# Nova página
hugo new content/pagina.md
```

## Gerenciamento de Módulos

```bash
# Instalar/atualizar dependências
hugo mod tidy

# Atualizar tema Hextra
hugo mod get -u github.com/imfing/hextra
hugo mod tidy

# Verificar módulos
hugo mod verify

# Grafo de dependências
hugo mod graph

# Limpar cache de módulos
hugo mod clean
```

## Informações do Sistema

```bash
# Versão do Hugo
hugo version

# Verificar configuração
hugo config

# Listar conteúdo
hugo list all

# Listar rascunhos
hugo list drafts

# Listar conteúdo futuro
hugo list future

# Listar conteúdo expirado
hugo list expired
```

## Build e Deploy

```bash
# Build completo
hugo --gc --minify

# Build com análise
hugo --gc --minify --templateMetrics

# Gerar apenas páginas modificadas
hugo --gc --cleanDestinationDir

# Build sem minificação
hugo --gc
```

## Limpeza

```bash
# Limpar diretórios gerados
rm -rf public/ resources/ .hugo_build.lock

# Limpar cache do Hugo
hugo mod clean

# Limpar tudo
rm -rf public/ resources/ .hugo_build.lock && hugo mod clean
```

## Git Workflow

```bash
# Status
git status

# Adicionar arquivos
git add .
git add content/blog/novo-post.md

# Commit
git commit -m "Add: novo post sobre tecnologia"

# Push (dispara deploy automático)
git push origin main

# Ver histórico
git log --oneline

# Ver mudanças
git diff
```

## Comandos Úteis do Hugo

```bash
# Ambiente de desenvolvimento
export HUGO_ENVIRONMENT=development
hugo server

# Ambiente de produção
export HUGO_ENVIRONMENT=production
hugo --gc --minify

# Checar links quebrados (requer htmltest)
hugo && htmltest

# Benchmark de build
hugo --gc --minify --templateMetrics --templateMetricsHints
```

## Troubleshooting

```bash
# Limpar tudo e reconstruir
rm -rf public/ resources/ .hugo_build.lock
hugo mod clean
hugo mod tidy
hugo server

# Verificar módulos
hugo mod verify
hugo mod graph

# Debug de templates
hugo server --debug

# Verbose output
hugo server --verbose

# Mostrar log completo
hugo server --log --verboseLog
```

## Atalhos de Desenvolvimento

```bash
# Servidor rápido (desenvolvimento)
alias hserve="hugo server -D --disableFastRender"

# Build rápido (produção)
alias hbuild="hugo --gc --minify"

# Novo post
alias hpost="hugo new content/blog/"

# Limpar e servir
alias hclean="rm -rf public/ resources/ && hugo server -D"
```

## Variáveis de Ambiente

```bash
# Definir ambiente
export HUGO_ENVIRONMENT=production

# Definir cache dir
export HUGO_CACHEDIR=/tmp/hugo_cache

# Definir base URL
export HUGO_BASEURL=https://exemplo.com/
```

## GitHub Actions (Local Testing)

```bash
# Instalar act (https://github.com/nektos/act)
brew install act

# Testar workflow localmente
act -j build

# Testar com secrets
act -j build --secret-file .secrets
```

## Dicas de Performance

```bash
# Build com cache
hugo --gc --cacheDir /tmp/hugo_cache

# Build paralelo
hugo --gc --minify -b https://exemplo.com/

# Análise de performance
hugo --gc --minify --profile --templateMetrics
```
