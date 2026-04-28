# 𝒴ℴ𝓂𝒾 - Enterprise Stock Management System

<div align="center">
  <img src="public/logo.png" alt="Yomi Logo" width="200" />
  <p><strong>Sistema de Gestão de Estoque Enterprise</strong></p>
  <p>Um sistema completo e moderno para gestão de estoque, comunicação de equipe e organização empresarial.</p>
</div>

---

## Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| **Inventário** | Controle completo de itens com categorias, localização, fornecedores e histórico |
| **Comunicação** | Chat em tempo real com canais e mensagens diretas para a equipe |
| **Agenda** | Calendário compartilhado com eventos pessoais e de equipe |
| **Anotações** | Bloco de notas rápido e sistema de tarefas com prioridades |
| **Financeiro** | Controle de orçamento, receitas, despesas e relatórios |
| **Code Editor** | Editor de código integrado com syntax highlighting e upload de arquivos |
| **Integrações** | Conexão com Google, GitHub, Discord, Spotify, YouTube e Twitch |
| **Multi-perfil** | Suporte para múltiplos usuários (Admin, Gerente, Usuário) |
| **Multi-idioma** | Português, Inglês, Espanhol, Francês e Alemão |
| **Temas** | Personalização de cores e papel de parede |
| **Segurança** | Hash de senhas, rate limiting, validação de entrada e logs de auditoria |

---

## Tecnologias Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

---

## Instalação e Execução Local

### Pré-requisitos

- Node.js 18.0 ou superior
- npm, yarn ou pnpm

### Passo a Passo

\`\`\`bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/yomi-stock-management.git

# 2. Entre na pasta do projeto
cd yomi-stock-management

# 3. Instale as dependências
npm install
# ou: yarn install
# ou: pnpm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse no navegador
# http://localhost:3000
\`\`\`

---

## Como Subir para o GitHub

### Opção 1: Baixando o ZIP do v0

1. No v0, clique nos **três pontos** (⋮) no canto superior direito
2. Selecione **"Download ZIP"**
3. Extraia o arquivo ZIP no seu computador
4. No GitHub, crie um **novo repositório** (sem README, sem .gitignore)
5. Execute os comandos no terminal:

\`\`\`bash
cd pasta-do-projeto-extraido
git init
git add .
git commit -m "Initial commit - Yomi Stock Management System"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
git push -u origin main
\`\`\`

### Opção 2: Conectando o v0 ao GitHub

1. No v0, vá em **Settings** (configurações do projeto)
2. Conecte sua conta do GitHub
3. Selecione ou crie um repositório
4. As alterações serão sincronizadas automaticamente

---

## Deploy (Colocar Online)

### Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"New Project"**
3. Importe seu repositório do GitHub
4. Clique em **"Deploy"**
5. Aguarde o build completar
6. Seu site estará online em `https://seu-projeto.vercel.app`

### Vercel CLI (Alternativa)

\`\`\`bash
# Instale a CLI
npm i -g vercel

# Execute na pasta do projeto
vercel

# Siga as instruções interativas
\`\`\`

---

## Estrutura do Projeto

\`\`\`
yomi-stock-management/
├── app/                          # Rotas e páginas (App Router)
│   ├── dashboard/                # Painel principal
│   ├── inventory/                # Gestão de inventário
│   ├── analytics/                # Análises e relatórios
│   ├── calendar/                 # Agenda
│   ├── finance/                  # Financeiro
│   ├── communication/            # Chat da equipe
│   ├── notes/                    # Anotações
│   ├── code/                     # Editor de código
│   ├── integrations/             # Integrações externas
│   ├── team/                     # Gestão de equipe
│   ├── settings/                 # Configurações
│   ├── login/                    # Autenticação
│   └── profiles/                 # Seleção de perfis
├── components/                   # Componentes React
│   ├── ui/                       # Componentes shadcn/ui
│   └── *.tsx                     # Componentes customizados
├── lib/                          # Utilitários e contextos
│   ├── i18n/                     # Sistema de internacionalização
│   │   ├── translations.ts       # Traduções (5 idiomas)
│   │   └── i18n-context.tsx      # Contexto i18n
│   ├── auth-context.tsx          # Autenticação
│   ├── theme-context.tsx         # Temas e personalização
│   ├── security-utils.tsx        # Utilitários de segurança
│   └── *.ts                      # Dados e tipos
├── hooks/                        # Custom hooks
├── public/                       # Arquivos estáticos
│   └── logo.png                  # Logo do Yomi
├── next.config.mjs               # Configuração Next.js
├── package.json                  # Dependências
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
\`\`\`

---

## Credenciais de Acesso

| Campo | Valor |
|-------|-------|
| **Email** | Viktorcesar66@gmail.com |
| **Senha** | Mudar@123 |

> **Nota**: Você pode criar novas contas na tela de login. Todos os novos usuários são automaticamente administradores.

---

## Idiomas Suportados

| Idioma | Código | Bandeira |
|--------|--------|----------|
| Português (Brasil) | pt-BR | 🇧🇷 |
| English (US) | en-US | 🇺🇸 |
| Español (España) | es-ES | 🇪🇸 |
| Français (France) | fr-FR | 🇫🇷 |
| Deutsch (Deutschland) | de-DE | 🇩🇪 |

---

## Licença

Este projeto é privado e de uso exclusivo da equipe Yomi.

---

<div align="center">
  <p>Desenvolvido com dedicação para a equipe <strong>𝒴ℴ𝓂𝒾</strong></p>
  <p>© 2025 Yomi Team. Todos os direitos reservados.</p>
</div>
\`\`\`

\`\`\`plaintext file="" isHidden
"# yomi-stock-management" 
