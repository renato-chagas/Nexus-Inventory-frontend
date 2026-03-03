# 💻 Nexus Inventory Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

O **Nexus Inventory Frontend** é uma interface moderna e intuitiva para gerenciamento de ativos de TI. Construída com Next.js e TypeScript, oferece uma experiência fluida e responsiva para controle de hardware, categorias, funcionários e histórico de movimentações.

---

## ✨ Funcionalidades Core

### 📊 Dashboard
- KPIs em tempo real sobre estado dos ativos
- Gráficos de distribuição por categoria
- Informações consolidadas de inventário

### 📋 Gestão de Ativos
- CRUD completo de ativos com interface intuitiva
- Visualização de detalhes e histórico por ativo
- Filtros e busca em tempo real

### 👥 Funcionalidades Adicionais
- Gerenciamento de funcionários e categorias
- Histórico completo de movimentações
- Upload de imagens para ativos
- Autenticação segura via JWT

---

## 🛠 Tech Stack

| Ferramenta | Versão | Propósito |
|-----------|--------|----------|
| Next.js | 15 | Framework React com SSR |
| React | 18 | Biblioteca de componentes |
| TypeScript | 5 | Tipagem estática |
| Tailwind CSS | 3 | Estilização CSS |
| Axios | - | Cliente HTTP |
| Lucide React | - | Ícones |
| ESLint | - | Linting de código |

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- npm ou yarn instalado
- Backend do Nexus Inventory rodando na porta 8000
- Git

### Passo a Passo

#### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/nexus-inventory-frontend.git
cd nexus-inventory-frontend
```

#### 2️⃣ Instale as dependências
```bash
npm install
```

#### 3️⃣ Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

#### 4️⃣ Inicie o servidor de desenvolvimento
```bash
npm run dev
```

✅ A aplicação estará disponível em: **http://localhost:3000**

---

## 📁 Estrutura Principal

```
nexus-frontend/
├── app/
│   ├── layout.tsx              # Layout raiz
│   ├── (auth)/
│   │   ├── login/              # Páginas de login
│   │   └── ...
│   └── (auth-required)/
│       ├── dashboard/          # Dashboard principal
│       ├── ativos/             # Gestão de ativos
│       ├── categorias/         # Gestão de categorias
│       ├── funcionarios/       # Gestão de funcionários
│       ├── softwares/          # Gestão de softwares
│       └── historico/          # Histórico de movimentações
├── components/
│   ├── global/                 # Componentes globais (Header, Menu)
│   ├── assets/                 # Componentes de ativos
│   ├── categories/             # Componentes de categorias
│   ├── dashboard/              # Componentes do dashboard
│   ├── employees/              # Componentes de funcionários
│   ├── softwares/              # Componentes de softwares
│   ├── forms/                  # Formulários reutilizáveis
│   ├── ui/                     # Componentes base (Button, Input, etc)
│   └── navigation/             # Navegação
├── context/
│   └── AuthContext.tsx         # Contexto de autenticação JWT
├── hooks/
│   └── verifyLogin.tsx         # Hook para verificação de login
├── services/
│   ├── models/                 # Services para cada modelo
│   └── ...
├── types/
│   └── index.ts                # Tipos TypeScript
├── utils/
│   └── httpClient.ts           # Cliente HTTP com interceptadores
├── styles/
│   └── global.css              # Estilos globais
├── public/                     # Arquivos estáticos
└── package.json                # Dependências
```

---

## 📄 Páginas Principais

### Páginas Autenticadas (auth-required)
- **Dashboard** (`/dashboard`) - Visão geral com KPIs
- **Ativos** (`/ativos`) - Listagem e gerenciamento de ativos
- **Categorias** (`/categorias`) - Gestão de categorias
- **Funcionários** (`/funcionarios`) - Gestão de funcionários
- **Softwares** (`/softwares`) - Gestão de softwares instalados
- **Histórico** (`/historico`) - Histórico de movimentações

### Páginas Públicas (auth)
- **Login** (`/login`) - Autenticação via JWT

---

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Tokens) para autenticação:

1. Usuário faz login com credenciais
2. Backend retorna `access_token` e `refresh_token`
3. Tokens são armazenados no localStorage
4. Access token é incluído em todas as requisições
5. Refresh token renova automaticamente o access token quando expirado

---

## 🎨 Componentes Principais

### UI Base
- `Button` - Botões customizados
- `Input` - Campos de entrada
- `Select` - Seletores
- Componentes reutilizáveis em `components/ui/`

### Funcionalidades
- **Header** - Cabeçalho com navegação
- **Menu** - Menu lateral ou dropdown
- **Forms** - Formulários de criação/edição
- **Tables** - Tabelas com dados

---

## 🧪 Testes e Linting

```bash
# Executar ESLint
npm run lint

# Build de produção
npm run build

# Iniciar em produção
npm start
```

---

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL do backend | `http://127.0.0.1:8000/api` |

---

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"
Verifique se o backend está rodando na porta 8000 e se `NEXT_PUBLIC_API_URL` está correto.

### Erro: "Unauthorized/401"
Faça login novamente. Os tokens podem ter expirado.

### Erro: "Module not found"
Reinstale as dependências:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 is already in use"
Use uma porta diferente:
```bash
npm run dev -- -p 3001
```

---

## 🔗 Integração com Backend

Este frontend depende totalmente do **Nexus Inventory Backend**.

**URLs Importantes:**
- Backend API: `http://127.0.0.1:8000/api`
- Documentação (Swagger): `http://127.0.0.1:8000/api/docs`
- Admin Django: `http://127.0.0.1:8000/admin`

Certifique-se de que o backend está rodando antes de iniciar o frontend!

---

## 👨‍💻 Desenvolvido por
**Renato Chagas**

---

## 📜 Licença
MIT License
