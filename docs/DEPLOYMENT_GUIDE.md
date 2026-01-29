# Deployment Guide

## Overview

T3 Chat is optimized for serverless deployment on Netlify, with support for other platforms. This guide covers deployment strategies, environment configuration, and production optimization.

## Netlify Deployment (Recommended)

### Prerequisites
- GitHub repository with your code
- Netlify account
- Environment variables configured

### Automatic Deployment Setup

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Netlify Configuration**
   The project includes `netlify.toml` for automatic configuration:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   
   [build.environment]
     NODE_ENV = "production"
   ```

3. **Environment Variables**
   Set these in Netlify dashboard (Site settings → Environment variables):
   ```bash
   NODE_ENV=production
   NEXT_PUBLIC_APP_URL=https://your-domain.netlify.app
   DATABASE_URL=your-postgresql-connection-string
   BETTER_AUTH_SECRET=your-secure-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   OPENROUTER_API_KEY=your-openrouter-api-key
   OPENROUTER_API_URL=https://openrouter.ai/api/v1
   ```

### Manual Deployment

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   # Build the application
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod --dir=.next
   ```

## Database Setup for Production

### PostgreSQL (Recommended)

1. **Choose a Provider**
   - **Neon** (recommended): Free tier, serverless PostgreSQL
   - **Supabase**: Full-stack platform with PostgreSQL
   - **Railway**: Simple PostgreSQL hosting
   - **PlanetScale**: MySQL alternative (requires schema changes)

2. **Neon Setup Example**
   ```bash
   # 1. Create account at neon.tech
   # 2. Create new project
   # 3. Copy connection string
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```

3. **Update Configuration**
   Ensure `prisma/schema.prisma` uses PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. **Deploy Schema**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Deploy migrations
   npx prisma migrate deploy
   ```

### SQLite (Development Only)
SQLite is not recommended for production due to serverless limitations.

## GitHub OAuth Setup

### Create GitHub OAuth App

1. **Navigate to GitHub Settings**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"

2. **Configure Application**
   ```
   Application name: T3 Chat
   Homepage URL: https://your-domain.netlify.app
   Authorization callback URL: https://your-domain.netlify.app/api/auth/callback/github
   ```

3. **Get Credentials**
   - Copy Client ID and Client Secret
   - Add to environment variables

## OpenRouter API Setup

1. **Create Account**
   - Visit [OpenRouter.ai](https://openrouter.ai)
   - Sign up and verify email

2. **Generate API Key**
   - Go to API Keys section
   - Create new key with appropriate permissions
   - Copy key to environment variables

3. **Configure Models**
   The app automatically fetches available models via `/api/ai/get-models`

## Vercel Deployment (Alternative)

### Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Configuration
Create `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Railway Deployment (Alternative)

### Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Configuration
Railway automatically detects Next.js projects and configures deployment.

## Environment Variables Reference

### Required Variables
```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://user:password@host/database

# Authentication
BETTER_AUTH_SECRET=your-secure-random-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI Services
OPENROUTER_API_KEY=your-openrouter-api-key
```

### Optional Variables
```bash
# OpenRouter (uses default if not set)
OPENROUTER_API_URL=https://openrouter.ai/api/v1
```

## Production Optimization

### Next.js Configuration
The `next.config.mjs` is optimized for production:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
}

export default nextConfig
```

### Performance Features
- **Static Generation**: Pages without dynamic data are pre-rendered
- **Dynamic Routes**: Chat pages use `export const dynamic = 'force-dynamic'`
- **Code Splitting**: Automatic code splitting for optimal loading
- **Image Optimization**: Next.js automatic image optimization

### Security Headers
Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

## Monitoring and Analytics

### Error Tracking
Consider integrating:
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and debugging
- **Datadog**: Full-stack monitoring

### Analytics
- **Vercel Analytics**: Built-in Next.js analytics
- **Google Analytics**: Web analytics
- **PostHog**: Product analytics

## Backup and Recovery

### Database Backups
```bash
# Automated backups (Neon example)
# Neon provides automatic backups
# Manual backup:
pg_dump $DATABASE_URL > backup.sql
```

### Code Backups
- GitHub repository serves as code backup
- Tag releases for version control
- Use GitHub Actions for automated deployments

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   npm run build
   
   # Common fixes:
   # - Update environment variables
   # - Check database connectivity
   # - Verify API keys
   ```

2. **Database Connection Issues**
   ```bash
   # Test connection
   npx prisma db pull
   
   # Reset if needed
   npx prisma migrate reset
   npx prisma migrate deploy
   ```

3. **Authentication Issues**
   - Verify GitHub OAuth callback URLs
   - Check BETTER_AUTH_SECRET is set
   - Ensure NEXT_PUBLIC_APP_URL matches domain

### Debug Mode
Enable debug logging:
```bash
# Add to environment variables
DEBUG=true
PRISMA_DEBUG=true
```

## Scaling Considerations

### Database Scaling
- **Connection Pooling**: Use PgBouncer for PostgreSQL
- **Read Replicas**: For high-read workloads
- **Caching**: Redis for session and query caching

### Application Scaling
- **CDN**: Netlify provides global CDN
- **Edge Functions**: For geo-distributed logic
- **Rate Limiting**: Implement API rate limiting

### Cost Optimization
- **Database**: Use serverless PostgreSQL (Neon)
- **Hosting**: Netlify free tier supports most use cases
- **AI API**: Monitor OpenRouter usage and costs

## Security Checklist

- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] API keys rotated regularly
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Error messages don't expose sensitive data
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Authentication properly configured

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor error rates and performance
- Review and rotate API keys quarterly
- Backup database regularly
- Monitor usage and costs

### Updates
```bash
# Update dependencies
npm update

# Update Next.js
npm install next@latest

# Update Prisma
npm install prisma@latest @prisma/client@latest
npx prisma generate
```