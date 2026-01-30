# Próximos Passos

O blog foi configurado com sucesso! Siga estes passos para finalizar a instalação e fazer o deploy.

## 1. Instalar Hugo

Hugo é necessário para build e desenvolvimento local.

### macOS (com Homebrew)

```bash
brew install hugo
```

### Verificar Instalação

```bash
hugo version
# Deve mostrar: hugo v0.147.9 ou superior
```

## 2. Instalar Dependências

Após instalar Hugo, execute:

```bash
cd /Users/jonathan/Documents/projects/blog
hugo mod tidy
```

Isto irá baixar o tema Hextra e suas dependências.

## 3. Testar Localmente

```bash
hugo server --buildDrafts -p 1313
```

Acesse http://localhost:1313 para ver o blog funcionando.

### Verificações

- ✅ Página inicial exibe corretamente
- ✅ Menu de navegação funciona (Blog, Projetos, Sobre)
- ✅ Alternador de tema funciona (light/dark/system)
- ✅ Busca funciona
- ✅ Posts do blog são exibidos
- ✅ Projetos são exibidos

## 4. Personalizar URLs

Edite `hugo.yaml` e atualize:

```yaml
# Linha 2: baseURL
baseURL: https://SEU-USUARIO.github.io/blog/

# Linhas 45-46: Links sociais
url: "https://github.com/SEU-USUARIO"
url: "https://linkedin.com/in/SEU-PERFIL"
```

Também atualize os links em:
- `content/about.md` (linhas 21-22)
- `content/blog/my-first-post.md` (linha 30)
- `README.md` (linha 24)

## 5. Criar Repositório no GitHub

```bash
# Adicionar todos os arquivos
git add .

# Criar commit inicial
git commit -m "Initial blog setup with Hextra theme"

# Criar repositório no GitHub (via web ou gh CLI)
# Nome sugerido: blog

# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/blog.git

# Push para GitHub
git branch -M main
git push -u origin main
```

## 6. Configurar GitHub Pages

1. Acesse o repositório no GitHub
2. Vá em **Settings** > **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. O deploy será automático a cada push

## 7. Verificar Deploy

Após alguns minutos:

1. Vá para a aba **Actions** no GitHub
2. Verifique se o workflow "Deploy Hugo site to GitHub Pages" completou
3. Acesse `https://SEU-USUARIO.github.io/blog/`

## Estrutura Atual do Projeto

```
blog/
├── .github/
│   └── workflows/
│       └── pages.yaml          # GitHub Actions workflow
├── content/
│   ├── _index.md              # Página inicial
│   ├── about.md               # Sobre
│   ├── blog/
│   │   ├── _index.md
│   │   ├── getting-started-with-hugo.md
│   │   └── my-first-post.md
│   └── projects/
│       ├── _index.md
│       └── personal-blog.md
├── static/
│   └── images/                # Coloque suas imagens aqui
├── hugo.yaml                  # Configuração principal
├── go.mod                     # Dependências Hugo
├── README.md                  # Documentação do projeto
├── CONTENT_GUIDE.md           # Guia de criação de conteúdo
└── COMMANDS.md                # Referência de comandos
```

## Conteúdo Disponível

### Posts de Blog (2)

1. **"Meu Primeiro Post"** - Post de boas-vindas
2. **"Começando com Hugo e Hextra"** - Tutorial sobre a stack

### Projetos (1)

1. **"Blog Pessoal com Hugo"** - Documentação deste projeto

## Comandos Úteis

```bash
# Desenvolvimento local
hugo server -D

# Criar novo post
hugo new content/blog/nome-do-post.md

# Build de produção
hugo --gc --minify

# Atualizar tema
hugo mod get -u github.com/imfing/hextra
hugo mod tidy
```

## Recursos de Aprendizado

- [Documentação do Hugo](https://gohugo.io/documentation/)
- [Documentação do Hextra](https://imfing.github.io/hextra/)
- [Guia de Markdown](https://www.markdownguide.org/)

## Suporte

- Consulte `CONTENT_GUIDE.md` para criar novos posts e projetos
- Consulte `COMMANDS.md` para referência rápida de comandos
- Issues do tema Hextra: https://github.com/imfing/hextra/issues

## Checklist Final

- [ ] Hugo instalado e funcionando
- [ ] `hugo mod tidy` executado com sucesso
- [ ] Site testado localmente (http://localhost:1313)
- [ ] URLs personalizadas atualizadas
- [ ] Repositório criado no GitHub
- [ ] Push realizado para GitHub
- [ ] GitHub Pages configurado
- [ ] Deploy bem-sucedido
- [ ] Site acessível publicamente

Parabéns! Seu blog está pronto! 🎉
