# T3 Chat - Project Overview

## 🚀 Introduction

T3 Chat is a modern, full-stack AI-powered chat application built with Next.js 16.1.1, featuring real-time conversations with multiple AI models, secure authentication, and a responsive user interface.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19.1.0 with Next.js App Router
- **Backend**: Next.js API routes with server actions
- **Database**: Prisma ORM with PostgreSQL/SQLite
- **Authentication**: Better Auth with GitHub OAuth
- **AI Integration**: OpenRouter API for multiple AI models
- **State Management**: Zustand + React Query
- **Styling**: Tailwind CSS v4 + Radix UI
- **Deployment**: Netlify (serverless)

### Key Features
- 🔐 Secure GitHub OAuth authentication
- 🤖 Multiple AI model support via OpenRouter
- 💬 Real-time streaming chat responses
- 📱 Responsive design with dark/light mode
- 🗄️ Persistent chat history
- 🎨 Modern UI with Tailwind CSS + Radix UI
- ⚡ Optimized for serverless deployment

## 📁 Project Structure

```
t3-chat/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (root)/            # Protected routes
│   │   ├── api/               # API endpoints
│   │   └── layout.js          # Root layout
│   ├── components/            # Reusable components
│   │   ├── ai-elements/       # AI-specific components
│   │   ├── providers/         # Context providers
│   │   └── ui/                # Base UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   └── modules/               # Feature modules
│       ├── authentication/    # Auth logic
│       ├── chat/             # Chat functionality
│       └── ai-agent/         # AI integration
├── prisma/                    # Database schema & migrations
├── public/                    # Static assets
├── docs/                      # Documentation
├── .env.example              # Environment template
├── netlify.toml              # Deployment config
└── package.json              # Dependencies
```

## 🔄 Data Flow

1. **Authentication**: GitHub OAuth → Better Auth → Session Management
2. **Chat Creation**: User Input → Server Action → Database → Redirect
3. **AI Response**: API Route → OpenRouter → Streaming Response → Database
4. **State Management**: React Query (server state) + Zustand (client state)
5. **UI Updates**: Real-time streaming + Optimistic updates

## 🌟 Core Modules

### Authentication Module
- GitHub OAuth integration
- Session management
- Protected route middleware
- User profile handling

### Chat Module
- Chat creation and management
- Message handling (user/assistant)
- Real-time streaming responses
- Chat history and search

### AI Agent Module
- Multiple model support
- OpenRouter API integration
- Model selection and configuration
- Response streaming and formatting

## 🚀 Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository>
   cd t3-chat
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Development**
   ```bash
   npm run dev
   ```

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Component Guide](./COMPONENT_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Development Guide](./DEVELOPMENT_GUIDE.md)

## 🔧 Configuration

The application uses environment variables for configuration. See `.env.example` for all required variables including database connections, API keys, and OAuth credentials.

## 🚀 Deployment

Optimized for Netlify deployment with:
- Serverless functions for API routes
- Static generation where possible
- Environment variable management
- Build optimization

## 📄 License

This project is open source and available under the MIT License.