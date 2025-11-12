# Gerenciamento de Usuários

Este projeto é uma aplicação fullstack desenvolvida como parte de um desafio técnico.

## Requisitos

- Node.js >= 18
- npm, yarn ou pnpm se preferir

## Tecnologias Utilizadas

- **Backend**: NestJS com TypeScript
- **Frontend**: Next.js com TypeScript
- **Armazenamento**: Dados em memória
- **Documentação**: Swagger
- **Estilização**: TailwindCSS

## Como rodar a aplicação (desenvolvimento)

1. Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/SigmaForce/MidFalconi-Teste.git

cd "MidFalconi-Teste"
```

### ⚙️ Backend

2. Backend (API - NestJS)

```bash
cd api
npm install
# modo desenvolvimento com reload
npm run start:dev
# ou para rodar em produção (build + start):
# npm run build
# npm run start:prod
```

O backend estará disponível em `http://localhost:3333`

A documentação da API estará disponível em `http://localhost:3333/docs`

### 💻 Frontend

3. Frontend (Web - Next.js)

```bash
cd web
npm install
# modo desenvolvimento
npm run dev
# build de produção
# npm run build
# npm run start
```

O frontend estará disponível em `http://localhost:3000`

## Scripts úteis

- API:

  - `npm run start:dev` — inicia em modo de desenvolvimento (watch)
  - `npm run start` — inicia a aplicação compilada
  - `npm run build` — compila o projeto Nest

- Web:
  - `npm run dev` — inicia Next.js em desenvolvimento
  - `npm run build` — gera build de produção
  - `npm run start` — inicia Next.js em modo produção

## Funcionalidades implementadas

### ⚙️ Backend

- Arquitetura modular organizada por domínio (users, profiles), seguindo boas práticas de separação de responsabilidades.
- Implementação completa de CRUD para Usuários e Perfis (controladores, serviços, DTOs e entidades).
- Validação de entrada e transformação de dados com class-validator e class-transformer.

### 💻 Frontend

- Estrutura baseada no Next.js (App Router), com:
  - **Páginas públicas** e **área autenticada (dashboard)**.
- Formulários dinâmicos para criação e edição de usuários e perfis:
  - Validação com **Zod** e **react-hook-form**.
- Integração com API via **axios**.
- Gerenciamento de dados assíncronos com **React Query** (@tanstack/react-query), incluindo cache e refetch automático.
- Listagens, paginação e filtros.

### Gerenciamento de Usuários

- ✅ Criação de usuários
- ✅ Edição de usuários
- ✅ Remoção de usuários
- ✅ Listagem de usuários
- ✅ Ativação/desativação de usuários
- ✅ Busca de usuário por ID
- ✅ Filtro de usuários por perfil

### Gerenciamento de Perfis

- ✅ Criação de perfis
- ✅ Listagem de perfis
- ✅ Remoção de perfis
- ✅ Busca de perfil por ID

### 🔗 Relacionamentos e Validações

- ✅ Associação entre usuários e perfis
- ✅ Validação de existência de perfil antes de criar/editar usuários

Esses itens cobrem as funcionalidades básicas de gestão de usuários e perfis com uma interface administrativa.

## Decisões de projeto

### 🎨 Frontend

- **Next.js (App Router):** adotado para aproveitar Server Components, roteamento moderno e melhor desempenho na renderização híbrida (SSR + SSG).
- **React Query (TanStack Query):** gerencia o estado assíncrono com cache, refetch, controle de erros e sincronização eficiente entre cliente e servidor.
- **React Hook Form + Zod:** garante validação tipada e integração fluida entre formulários e schemas de validação.
- **UI e Componentização:** uso de Radix, ShadCN/UI e TailwindCSS para construir interfaces acessíveis, consistentes e com design system reutilizável.
- **Gerenciamento de estado global:** Context API (ou Zustand, se aplicável) para compartilhamento de estado entre componentes.

### ⚙️ Backend

- **Swagger:** Documentação automática e interativa das rotas.
- **Arquitetura modular (Controllers, Services, Modules):** separação clara de responsabilidades e aderência aos princípios SOLID.
- **DTOs e Entidades:** uso de objetos de transferência de dados para garantir contratos claros entre camadas.

### 🧱 Arquitetura

- **API RESTful** seguindo boas práticas, verbos HTTP e status codes adequados.
- **Mock de dados em memória** nas etapas iniciais para facilitar desenvolvimento e testes sem dependência externa.
- **Relacionamentos entre entidades preservados**, mesmo sem persistência, simulando o comportamento de um banco relacional.

## Possíveis pontos de melhoria

### Autenticação e Autorização

- Autenticação (**JWT** com refresh tokens ou **OAuth2**) para segurança.
- Adicionar controle de acesso baseado em roles (admin/user) para proteger rotas e ações sensíveis do dashboard.
- Criar middleware de validação de sessão e **autorização** por perfil no frontend e backend.

### Persistência e Banco de Dados

- Integrar com um banco de dados real (**PostgreSQL**, SQLite para desenvolvimento).
- Adotar um ORM moderno (**Prisma ou TypeORM**) para facilitar queries e migrations.
- Implementar **migrations e seeds automáticos** para ambientes de desenvolvimento e produção.
- Adicionar rotinas de backup e recuperação de dados.

### Qualidade e Testes

- Implementar testes unitários e de integração (ex.: **Jest**, **Testing Library**).
- Criar testes end-to-end (E2E) para o fluxo completo entre frontend e backend.
- Integrar testes automatizados em pipelines de CI/CD (ex.: **GitHub Actions**).
- Adicionar linting e formatação automática (**ESLint + Prettier**).

### Observabilidade e Logs

- Implementar **logs estruturados** (JSON, níveis de severidade).
- Adicionar **monitoramento e tracing** (Sentry, Datadog ou soluções open-source como Grafana + Loki).
- Criar uma camada de **error handling unificada** no backend.

### UX/UI e Acessibilidade

- Adicionar animações e transições suaves.
- Melhorar **acessibilidade (a11y)** e compatibilidade com leitores de tela.
- Implementar tema **claro/escuro** e suporte à internacionalização (i18n).
- Ajustar design responsivo e padrões de usabilidade.

### Integração Contínua e Deploy

- Configurar pipelines de CI/CD para lint, build, testes e deploy automatizado.

### Segurança

- Adicionar rate limiting e proteção contra brute force.
- Reforçar validação e sanitização de entrada.
- Implementar CSP (Content Security Policy) e headers de segurança no frontend.
