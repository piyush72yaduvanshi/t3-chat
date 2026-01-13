# T3 Chat Application

A modern chat application built with Next.js, Prisma, and Better Auth, featuring AI-powered conversations.

## Features

- 🔐 GitHub OAuth authentication
- 💬 Real-time chat interface
- 🤖 AI-powered responses via OpenRouter
- 📱 Responsive design with dark/light mode
- 🗄️ Database persistence with Prisma
- 🚀 Optimized for serverless deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Database (SQLite for development, PostgreSQL for production)

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Fill in your environment variables:
- `DATABASE_URL`: Your database connection string
- `BETTER_AUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: From GitHub OAuth app
- `OPENROUTER_API_KEY`: From OpenRouter.ai
- `NEXT_PUBLIC_APP_URL`: Your app URL (localhost:3000 for dev)

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

### Netlify Deployment

The app is configured for Netlify deployment with:
- `netlify.toml` configuration
- Serverless functions for API routes
- Environment variables setup

Required environment variables for production:
- All variables from `.env.example`
- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_URL` set to your domain

### Database Setup

For production, use PostgreSQL:
1. Update `prisma/schema.prisma` provider to `postgresql`
2. Update `src/lib/auth.js` provider to `postgresql`
3. Set `DATABASE_URL` to your PostgreSQL connection string
4. Run `npx prisma migrate deploy`

## Tech Stack

- **Framework**: Next.js 16.1.1
- **Database**: Prisma with SQLite/PostgreSQL
- **Authentication**: Better Auth with GitHub OAuth
- **AI**: OpenRouter API integration
- **Styling**: Tailwind CSS with Radix UI
- **Deployment**: Netlify (serverless)

## Security

- Updated to Next.js 16.1.1 (latest secure version)
- All dependencies audited and vulnerabilities resolved
- Environment variables for sensitive data
- Server-side authentication validation

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://better-auth.com)
- [OpenRouter API](https://openrouter.ai/docs)
