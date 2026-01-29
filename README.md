# T3 Chat - AI-Powered Chat Application

<div align="center">

![T3 Chat Logo](public/logo.svg)

**A modern, full-stack AI chat application built with Next.js 16.1.1**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)

[Live Demo](https://your-demo-url.netlify.app) • [Documentation](./docs/PROJECT_OVERVIEW.md) • [API Docs](./docs/API_DOCUMENTATION.md)

</div>

## ✨ Features

- 🔐 **Secure Authentication** - GitHub OAuth with Better Auth
- 🤖 **Multiple AI Models** - OpenRouter integration with model selection
- 💬 **Real-time Chat** - Streaming responses with optimistic updates
- 📱 **Responsive Design** - Mobile-first with dark/light mode
- 🗄️ **Persistent Storage** - PostgreSQL/SQLite with Prisma ORM
- ⚡ **Serverless Ready** - Optimized for Netlify deployment
- 🎨 **Modern UI** - Tailwind CSS v4 + Radix UI components
- 🔄 **State Management** - Zustand + React Query for optimal UX

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd t3-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables (see [Environment Variables](#environment-variables) section)

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application running!

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (SQLite for development)
DATABASE_URL=file:./dev.db

# Authentication
BETTER_AUTH_SECRET=your-secure-random-secret  # Generate: openssl rand -base64 32
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI Services
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_API_URL=https://openrouter.ai/api/v1
```

### Getting API Keys

- **GitHub OAuth**: Create an OAuth app at [GitHub Developer Settings](https://github.com/settings/applications/new)
- **OpenRouter**: Get your API key from [OpenRouter.ai](https://openrouter.ai/keys)

## 🏗️ Tech Stack

### Core Technologies
- **[Next.js 16.1.1](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library with latest features
- **[Prisma](https://prisma.io/)** - Type-safe database ORM
- **[Better Auth](https://better-auth.com/)** - Modern authentication library

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### State & Data
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Query](https://tanstack.com/query/latest)** - Server state management
- **[Zod](https://zod.dev/)** - Schema validation

### AI & APIs
- **[OpenRouter](https://openrouter.ai/)** - Access to multiple AI models
- **[AI SDK](https://sdk.vercel.ai/)** - Streaming AI responses

## 📁 Project Structure

```
t3-chat/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (auth)/            # Authentication routes
│   │   ├── 📁 (root)/            # Protected application routes
│   │   └── 📁 api/               # API endpoints
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 ai-elements/       # AI-specific components
│   │   ├── 📁 providers/         # Context providers
│   │   └── 📁 ui/                # Base UI components
│   ├── 📁 lib/                   # Utility libraries
│   └── 📁 modules/               # Feature modules
│       ├── 📁 authentication/    # Auth logic & components
│       ├── 📁 chat/             # Chat functionality
│       └── 📁 ai-agent/         # AI integration
├── 📁 prisma/                    # Database schema & migrations
├── 📁 docs/                      # Documentation
├── 📁 public/                    # Static assets
├── 🔧 .env.example              # Environment template
├── 🚀 netlify.toml              # Deployment configuration
└── 📦 package.json              # Dependencies & scripts
```

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Deploy automatically** - Netlify will build and deploy on every push

The project includes optimized `netlify.toml` configuration for seamless deployment.

### Environment Variables for Production

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.netlify.app
DATABASE_URL=postgresql://user:password@host/database  # Use PostgreSQL for production
BETTER_AUTH_SECRET=your-production-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
OPENROUTER_API_KEY=your-openrouter-api-key
```

For detailed deployment instructions, see the [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md).

## 📚 Documentation

- **[Project Overview](./docs/PROJECT_OVERVIEW.md)** - Architecture and features
- **[API Documentation](./docs/API_DOCUMENTATION.md)** - API endpoints and server actions
- **[Database Schema](./docs/DATABASE_SCHEMA.md)** - Database design and relationships
- **[Component Guide](./docs/COMPONENT_GUIDE.md)** - UI components and patterns
- **[Development Guide](./docs/DEVELOPMENT_GUIDE.md)** - Local development setup
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Production deployment

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Commands

```bash
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Create and apply migration
npx prisma migrate deploy    # Deploy migrations (production)
npx prisma studio           # Open database GUI
npx prisma db push          # Push schema changes (development)
```

## 🔒 Security

- ✅ **Latest Next.js 16.1.1** - No known vulnerabilities
- ✅ **Environment variables** - Sensitive data protection
- ✅ **Server-side validation** - All user inputs validated
- ✅ **OAuth authentication** - Secure GitHub integration
- ✅ **Database security** - Parameterized queries with Prisma
- ✅ **HTTPS enforcement** - Secure connections in production

## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](./docs/DEVELOPMENT_GUIDE.md) for:

- Local development setup
- Coding standards and conventions
- Testing guidelines
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com/) for Next.js and deployment platform
- [Prisma](https://prisma.io/) for the excellent ORM
- [Radix UI](https://radix-ui.com/) for accessible components
- [OpenRouter](https://openrouter.ai/) for AI model access
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">

**[⭐ Star this repo](https://github.com/your-username/t3-chat)** if you find it helpful!

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>
