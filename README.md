# 🔮 Mystik - Spiritual Guidance Platform

  # Mystik Responsive Website Design

<div align="center">

  This is a code bundle for Mystik Responsive Website Design. The original project is available at https://www.figma.com/design/me0glI4fDxVfZt34MPMS8z/Mystik-Responsive-Website-Design.

![Mystik Banner](https://img.shields.io/badge/Mystik-Spiritual_Guidance-purple?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIgMkw5LjE5IDguNjNMMiA5LjI0TDcuNDYgMTQuOTdMNiAyMkwxMiAxOC4yN0wxOCAyMkwxNi41NCAxNC45N0wyMiA5LjI0TDE0LjgxIDguNjNMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  ## 🚀 Quick Start

[![Made in Brazil](https://img.shields.io/badge/Made%20in-Brazil-green?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiMwMDkyNjQiLz4KICA8cGF0aCBkPSJNMTIgNEwyIDEyTDEyIDIwTDIyIDEyWiIgZmlsbD0iI0ZFREYwMCIvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiIGZpbGw9IiMwMDJGNkMiLz4KPC9zdmc+)](https://www.brazil.gov.br/)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)  ### 1. Install dependencies

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)  ```bash

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)](https://vitejs.dev/)  npm install

  ```

**Um projeto brasileiro revolucionando a orientação espiritual digital** 🇧🇷

  ### 2. Configure environment variables

[English](#english-) | [Português](#português-)  ```bash

  # Copy the example file

---  cp .env.example .env

  

</div>  # Edit .env with your Supabase credentials

  # VITE_SUPABASE_URL=https://your-project.supabase.co

## Português 🇧🇷  # VITE_SUPABASE_ANON_KEY=your_anon_key_here

  ```

### 📖 Sobre o Projeto

  ### 3. Start development server

**Mystik** é uma plataforma brasileira inovadora que conecta buscadores espirituais a guias qualificados em diversas práticas místicas. Desenvolvida com as mais modernas tecnologias web, oferece uma experiência fluida, segura e acessível para quem busca orientação espiritual.  ```bash

  npm run dev

### ✨ Características  ```



- 🎴 **Múltiplas Práticas**: Tarot, Runas, Astrologia, Numerologia e mais  ## 🔒 Security

- 🌍 **Multilíngue**: Português, Inglês e Espanhol

- 🌙 **Design Místico**: Interface dark com animações suaves e envolventes  - **Never commit `.env` files** - Contains sensitive API keys

- 🔒 **Seguro**: Autenticação robusta e proteção de dados com Supabase  - **Supabase keys** are in `.env` (see `.env.example` for template)

- ⚡ **Performance**: Otimizado para carregamento ultra-rápido (LCP < 2.5s)  - See `SECURITY.md` for complete security guidelines

- 📱 **Responsivo**: Experiência perfeita em qualquer dispositivo

- ♿ **Acessível**: Suporte a `prefers-reduced-motion` e leitores de tela  ## 📊 Admin Panel



### 🛠️ Tecnologias  - Access: `http://localhost:3001/#admin-login`

  - See `ADMIN_GUIDE.md` for credentials and usage

```  

Frontend:
├── React 18.3 + TypeScript 5.5
├── Vite 6.1 (Build ultra-rápido)
├── TailwindCSS 4.1 (Estilização)
├── Motion/React (Animações fluidas)
└── Radix UI (Componentes acessíveis)

Backend:
├── Supabase (Database + Auth)
├── PostgreSQL (Database)
└── Row Level Security (RLS)

Otimizações:
├── Code Splitting por vendor
├── Lazy Loading de componentes
├── GPU Acceleration (willChange)
├── Terser Minification
└── Throttled Event Listeners
```

### 🚀 Como Rodar Localmente

#### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/flaveti/mystik-app-site.git
cd mystik-app-site

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

#### Build para Produção

```bash
# Cria build otimizado
npm run build

# Preview do build
npm run preview
```

### 📂 Estrutura do Projeto

```
mystik-app-site/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Hero.tsx         # Seção principal com vídeo
│   │   ├── Features.tsx     # Funcionalidades
│   │   ├── MediumSection.tsx    # Cadastro de guias
│   │   ├── Waitlist.tsx     # Lista de espera
│   │   ├── ParticleBackground.tsx  # Canvas animado
│   │   └── AdminPanel.tsx   # Painel administrativo
│   ├── lib/
│   │   └── supabase.ts      # Cliente Supabase
│   ├── styles/
│   │   └── globals.css      # Estilos globais + otimizações
│   ├── assets/
│   │   └── optimized/       # Mídia otimizada (webp, mp4)
│   └── App.tsx              # Componente raiz
├── supabase/
│   └── migrations/          # Migrations do banco
│       └── create_tables.sql
├── public/                  # Arquivos estáticos
├── .env.example             # Template de variáveis
└── vite.config.ts           # Configuração Vite
```

### 🎯 Funcionalidades Principais

#### Para Usuários
- ✅ Lista de espera para lançamento do app
- ✅ Informações sobre práticas espirituais
- ✅ Interface multilíngue (PT/EN/ES)
- ✅ Design responsivo mobile-first
- ✅ FAQ interativa com accordion
- ✅ Política de privacidade e termos

#### Para Guias Espirituais
- ✅ Cadastro de perfil profissional
- ✅ Seleção de especialidades (Tarot, Runes, Astrologia, etc.)
- ✅ Definição de nível de experiência
- ✅ Seletor de país com código telefônico
- ✅ Mensagem personalizada

#### Painel Administrativo
- ✅ Visualização de cadastros (Guias + Waitlist)
- ✅ Filtros por especialidade/experiência/país
- ✅ Busca em tempo real
- ✅ Exportação de dados em CSV
- ✅ Estatísticas em tempo real
- ✅ Autenticação segura

### 🔐 Segurança

- ✅ Variáveis de ambiente protegidas (`.env` no `.gitignore`)
- ✅ Chaves API nunca commitadas
- ✅ Row Level Security (RLS) no Supabase
- ✅ HTTPS obrigatório em produção
- ✅ Validação de dados server-side
- ✅ Proteção contra SQL injection
- ✅ Rate limiting em formulários

### ⚡ Performance

O site foi otimizado para máxima performance:

| Métrica | Valor | Status |
|---------|-------|--------|
| **Lighthouse Score** | 90+ | ✅ Excelente |
| **First Contentful Paint** | < 1.5s | ✅ Rápido |
| **Largest Contentful Paint** | < 2.5s | ✅ Bom |
| **Time to Interactive** | < 3s | ✅ Rápido |
| **Bundle Size** | ~900KB | ✅ Otimizado |

**Otimizações aplicadas:**
- Code splitting por vendor (react, motion, radix, supabase)
- Lazy loading de componentes pesados
- GPU acceleration em animações (`willChange`)
- Terser minification com `drop_console`
- CSS optimizado com Tailwind purge
- Throttled event listeners (mouse, scroll)
- Canvas com `desynchronized: true`
- Partículas reduzidas (20 → 10)
- Animações pausam quando tab não está visível

### 🎨 Design System

- **Cores principais**: 
  - Purple (#9333EA) - Místico e espiritual
  - Blue (#3B82F6) - Confiança e tranquilidade
  - Dark (#030213) - Elegância e profundidade

- **Tipografia**: System fonts otimizadas
- **Animações**: Motion/React com easing suave
- **Responsividade**: Mobile-first (320px → 1920px+)

### 🌐 Deploy

O projeto pode ser deployado em:

**Recomendado:**
- ✅ **Vercel** - Deploy automático com Git
- ✅ **Netlify** - CI/CD integrado

**Outras opções:**
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

#### Deploy com Vercel

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

#### Deploy com Netlify

```bash
# Instale Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy em produção
netlify deploy --prod
```

**⚠️ Importante**: Configure as variáveis de ambiente no painel do host:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 🗄️ Database (Supabase)

#### Tabelas

**1. `waitlist`** - Lista de espera
```sql
- id (UUID, primary key)
- email (TEXT, unique)
- created_at (TIMESTAMP)
```

**2. `spiritual_guides`** - Guias cadastrados
```sql
- id (UUID, primary key)
- first_name (TEXT)
- last_name (TEXT)
- email (TEXT, unique)
- country (TEXT)
- phone (TEXT)
- specialty (TEXT)
- experience (TEXT)
- message (TEXT, nullable)
- created_at (TIMESTAMP)
```

#### RLS Policies

- ✅ Public insert (formulários públicos)
- ✅ Public read (admin panel com auth)
- ✅ Indexes em email, created_at, specialty, country

### 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

**Diretrizes:**
- Use TypeScript
- Siga o padrão de código existente
- Adicione testes se possível
- Atualize a documentação

### 📞 Contato

- **Desenvolvido por**: Flaveti
- **GitHub**: [@flaveti](https://github.com/flaveti)
- **Projeto**: [mystik-app-site](https://github.com/flaveti/mystik-app-site)

### 🙏 Agradecimentos

- Design original: [Figma Community](https://www.figma.com/design/me0glI4fDxVfZt34MPMS8z/Mystik-Responsive-Website-Design)
- Icons: [Lucide Icons](https://lucide.dev/)
- UI Components: [Radix UI](https://www.radix-ui.com/)
- Database: [Supabase](https://supabase.com/)

---

<div align="center">

**Feito com 💜 no Brasil**

[![GitHub Stars](https://img.shields.io/github/stars/flaveti/mystik-app-site?style=social)](https://github.com/flaveti/mystik-app-site)
[![GitHub Forks](https://img.shields.io/github/forks/flaveti/mystik-app-site?style=social)](https://github.com/flaveti/mystik-app-site/fork)

</div>

---

## English 🇺🇸

### 📖 About the Project

**Mystik** is an innovative Brazilian platform that connects spiritual seekers with qualified guides across various mystical practices. Built with cutting-edge web technologies, it offers a fluid, secure, and accessible experience for those seeking spiritual guidance.

### ✨ Features

- 🎴 **Multiple Practices**: Tarot, Runes, Astrology, Numerology and more
- 🌍 **Multilingual**: Portuguese, English and Spanish
- 🌙 **Mystical Design**: Dark interface with smooth, engaging animations
- 🔒 **Secure**: Robust authentication and data protection with Supabase
- ⚡ **High Performance**: Optimized for ultra-fast loading (LCP < 2.5s)
- 📱 **Responsive**: Perfect experience on any device
- ♿ **Accessible**: `prefers-reduced-motion` and screen reader support

### 🛠️ Tech Stack

```
Frontend:
├── React 18.3 + TypeScript 5.5
├── Vite 6.1 (Ultra-fast build)
├── TailwindCSS 4.1 (Styling)
├── Motion/React (Smooth animations)
└── Radix UI (Accessible components)

Backend:
├── Supabase (Database + Auth)
├── PostgreSQL (Database)
└── Row Level Security (RLS)

Optimizations:
├── Code Splitting per vendor
├── Component Lazy Loading
├── GPU Acceleration (willChange)
├── Terser Minification
└── Throttled Event Listeners
```

### 🚀 Running Locally

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone https://github.com/flaveti/mystik-app-site.git
cd mystik-app-site

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

Access: `http://localhost:3000`

#### Production Build

```bash
# Create optimized build
npm run build

# Preview build
npm run preview
```

### 📂 Project Structure

```
mystik-app-site/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx         # Main section with video
│   │   ├── Features.tsx     # Features showcase
│   │   ├── MediumSection.tsx    # Guide registration
│   │   ├── Waitlist.tsx     # Waitlist form
│   │   ├── ParticleBackground.tsx  # Animated canvas
│   │   └── AdminPanel.tsx   # Admin dashboard
│   ├── lib/
│   │   └── supabase.ts      # Supabase client
│   ├── styles/
│   │   └── globals.css      # Global styles + optimizations
│   ├── assets/
│   │   └── optimized/       # Optimized media (webp, mp4)
│   └── App.tsx              # Root component
├── supabase/
│   └── migrations/          # Database migrations
│       └── create_tables.sql
├── public/                  # Static files
├── .env.example             # Environment template
└── vite.config.ts           # Vite configuration
```

### 🎯 Main Features

#### For Users
- ✅ App launch waitlist
- ✅ Information about spiritual practices
- ✅ Multilingual interface (PT/EN/ES)
- ✅ Mobile-first responsive design
- ✅ Interactive FAQ with accordion
- ✅ Privacy policy and terms

#### For Spiritual Guides
- ✅ Professional profile registration
- ✅ Specialty selection (Tarot, Runes, Astrology, etc.)
- ✅ Experience level definition
- ✅ Country selector with phone code
- ✅ Custom message

#### Admin Panel
- ✅ View registrations (Guides + Waitlist)
- ✅ Filter by specialty/experience/country
- ✅ Real-time search
- ✅ CSV data export
- ✅ Real-time statistics
- ✅ Secure authentication

### 🔐 Security

- ✅ Protected environment variables (`.env` in `.gitignore`)
- ✅ API keys never committed
- ✅ Row Level Security (RLS) on Supabase
- ✅ HTTPS mandatory in production
- ✅ Server-side data validation
- ✅ SQL injection protection
- ✅ Form rate limiting

### ⚡ Performance

Optimized for maximum performance:

| Metric | Value | Status |
|--------|-------|--------|
| **Lighthouse Score** | 90+ | ✅ Excellent |
| **First Contentful Paint** | < 1.5s | ✅ Fast |
| **Largest Contentful Paint** | < 2.5s | ✅ Good |
| **Time to Interactive** | < 3s | ✅ Fast |
| **Bundle Size** | ~900KB | ✅ Optimized |

**Applied optimizations:**
- Code splitting per vendor (react, motion, radix, supabase)
- Lazy loading for heavy components
- GPU acceleration for animations (`willChange`)
- Terser minification with `drop_console`
- Tailwind CSS purge optimization
- Throttled event listeners (mouse, scroll)
- Canvas with `desynchronized: true`
- Reduced particles (20 → 10)
- Animations pause when tab is not visible

### 🎨 Design System

- **Main colors**: 
  - Purple (#9333EA) - Mystical and spiritual
  - Blue (#3B82F6) - Trust and tranquility
  - Dark (#030213) - Elegance and depth

- **Typography**: Optimized system fonts
- **Animations**: Motion/React with smooth easing
- **Responsiveness**: Mobile-first (320px → 1920px+)

### 🌐 Deployment

Can be deployed on:

**Recommended:**
- ✅ **Vercel** - Automatic Git deployment
- ✅ **Netlify** - Integrated CI/CD

**Other options:**
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

#### Deploy with Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

#### Deploy with Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

**⚠️ Important**: Configure environment variables in your hosting panel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 🗄️ Database (Supabase)

#### Tables

**1. `waitlist`** - Waiting list
```sql
- id (UUID, primary key)
- email (TEXT, unique)
- created_at (TIMESTAMP)
```

**2. `spiritual_guides`** - Registered guides
```sql
- id (UUID, primary key)
- first_name (TEXT)
- last_name (TEXT)
- email (TEXT, unique)
- country (TEXT)
- phone (TEXT)
- specialty (TEXT)
- experience (TEXT)
- message (TEXT, nullable)
- created_at (TIMESTAMP)
```

#### RLS Policies

- ✅ Public insert (public forms)
- ✅ Public read (admin panel with auth)
- ✅ Indexes on email, created_at, specialty, country

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Guidelines:**
- Use TypeScript
- Follow existing code patterns
- Add tests if possible
- Update documentation

### 📞 Contact

- **Developed by**: Flaveti
- **GitHub**: [@flaveti](https://github.com/flaveti)
- **Project**: [mystik-app-site](https://github.com/flaveti/mystik-app-site)

### 🙏 Acknowledgments

- Original design: [Figma Community](https://www.figma.com/design/me0glI4fDxVfZt34MPMS8z/Mystik-Responsive-Website-Design)
- Icons: [Lucide Icons](https://lucide.dev/)
- UI Components: [Radix UI](https://www.radix-ui.com/)
- Database: [Supabase](https://supabase.com/)

---

<div align="center">

**Made with 💜 in Brazil**

[![GitHub Stars](https://img.shields.io/github/stars/flaveti/mystik-app-site?style=social)](https://github.com/flaveti/mystik-app-site)
[![GitHub Forks](https://img.shields.io/github/forks/flaveti/mystik-app-site?style=social)](https://github.com/flaveti/mystik-app-site/fork)
[![Twitter Follow](https://img.shields.io/twitter/follow/flaveti?style=social)](https://twitter.com/flaveti)

</div>
