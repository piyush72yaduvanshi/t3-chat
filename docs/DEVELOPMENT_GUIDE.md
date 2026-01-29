# Development Guide

## Getting Started

This guide covers local development setup, coding standards, and development workflows for T3 Chat.

## Prerequisites

### Required Software
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## Local Development Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd t3-chat
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
# Minimum required for development:
DATABASE_URL=file:./dev.db
BETTER_AUTH_SECRET=your-development-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
OPENROUTER_API_KEY=your-openrouter-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create and apply initial migration
npx prisma migrate dev --name init

# Optional: Seed database with test data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development Workflow

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/chat-improvements

# Make changes and commit
git add .
git commit -m "feat: add message reactions"

# Push and create PR
git push origin feature/chat-improvements
```

### Commit Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```bash
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

## Project Structure Deep Dive

### App Router Structure
```
src/app/
├── (auth)/              # Auth route group
│   ├── layout.jsx       # Auth-specific layout
│   └── sign-in/         # Sign-in page
├── (root)/              # Protected route group
│   ├── layout.jsx       # Main app layout
│   ├── page.jsx         # Home page
│   └── chat/[chatId]/   # Dynamic chat routes
├── api/                 # API routes
│   ├── auth/            # Authentication endpoints
│   ├── chat/            # Chat API endpoints
│   └── ai/              # AI service endpoints
├── globals.css          # Global styles
└── layout.js            # Root layout
```

### Component Organization
```
src/components/
├── ui/                  # Base UI components
│   ├── button.jsx       # Reusable button
│   ├── input.jsx        # Form inputs
│   └── ...              # Other UI primitives
├── ai-elements/         # AI-specific components
│   ├── message.jsx      # Chat messages
│   ├── code-block.jsx   # Code highlighting
│   └── ...              # Other AI components
└── providers/           # React context providers
    ├── theme-provider.jsx
    └── query-provider.jsx
```

### Module Structure
```
src/modules/
├── authentication/      # Auth module
│   ├── actions/         # Server actions
│   └── components/      # Auth components
├── chat/               # Chat module
│   ├── actions/        # Chat server actions
│   ├── components/     # Chat components
│   ├── hooks/          # Chat-specific hooks
│   └── store/          # State management
└── ai-agent/           # AI integration
    └── hook/           # AI-related hooks
```

## Coding Standards

### TypeScript/JavaScript
```javascript
// Use const for immutable values
const API_URL = 'https://api.example.com'

// Use descriptive variable names
const userMessages = messages.filter(m => m.role === 'user')

// Use async/await over promises
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}
```

### React Components
```jsx
// Use function components with hooks
export function ChatMessage({ message, isStreaming }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="message">
      <p>{message.content}</p>
      {isStreaming && <LoadingSpinner />}
    </div>
  )
}

// Use proper prop destructuring
export function UserProfile({ user: { name, email, avatar } }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}
```

### CSS/Tailwind
```jsx
// Use semantic class names
<div className="chat-container">
  <div className="message-list space-y-4">
    <div className="message user-message bg-blue-500 text-white p-3 rounded-lg">
      User message
    </div>
  </div>
</div>

// Responsive design patterns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

## Database Development

### Schema Changes
```bash
# Create new migration
npx prisma migrate dev --name add-user-preferences

# Reset database (development only)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

### Query Patterns
```javascript
// Efficient queries with proper includes
const chatWithMessages = await db.chat.findUnique({
  where: { id: chatId, userId: user.id },
  include: {
    messages: {
      orderBy: { createdAt: 'asc' },
      take: 50 // Limit for performance
    }
  }
})

// Use transactions for related operations
const result = await db.$transaction(async (tx) => {
  const chat = await tx.chat.create({ data: chatData })
  const message = await tx.message.create({ 
    data: { ...messageData, chatId: chat.id }
  })
  return { chat, message }
})
```

## API Development

### Server Actions
```javascript
"use server"

import { revalidatePath } from "next/cache"
import { currentUser } from "@/modules/authentication/actions"

export async function createChat(formData) {
  // Always validate user
  const user = await currentUser()
  if (!user) {
    return { success: false, message: "Unauthorized" }
  }
  
  // Validate input
  const content = formData.get('content')
  if (!content?.trim()) {
    return { success: false, message: "Content required" }
  }
  
  try {
    // Perform operation
    const chat = await db.chat.create({
      data: { title: content.slice(0, 50), userId: user.id }
    })
    
    // Revalidate affected pages
    revalidatePath('/')
    
    return { success: true, data: chat }
  } catch (error) {
    console.error('Create chat error:', error)
    return { success: false, message: "Failed to create chat" }
  }
}
```

### API Routes
```javascript
// src/app/api/chat/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { chatId, model, content } = await request.json()
    
    // Validate input
    if (!chatId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Process request
    const response = await processAIRequest(content, model)
    
    return NextResponse.json({ text: response })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## State Management

### Zustand Store
```javascript
// src/modules/chat/store/chat-store.js
import { create } from 'zustand'

export const useChatStore = create((set, get) => ({
  // State
  currentChatId: null,
  messages: [],
  isLoading: false,
  
  // Actions
  setCurrentChat: (chatId) => set({ currentChatId: chatId }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Computed values
  getCurrentMessages: () => {
    const { messages, currentChatId } = get()
    return messages.filter(m => m.chatId === currentChatId)
  }
}))
```

### React Query Integration
```javascript
// src/modules/chat/hooks/chat.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useChat(chatId) {
  const queryClient = useQueryClient()
  
  const { data: chat, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChatById(chatId),
    enabled: !!chatId
  })
  
  const sendMessageMutation = useMutation({
    mutationFn: (message) => createMessageInChat(message, chatId),
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', chatId])
    }
  })
  
  return {
    chat,
    isLoading,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending
  }
}
```

## Testing

### Component Testing
```javascript
// __tests__/components/ChatMessage.test.jsx
import { render, screen } from '@testing-library/react'
import { ChatMessage } from '@/modules/chat/components/chat-message'

describe('ChatMessage', () => {
  const mockMessage = {
    id: '1',
    content: 'Hello world',
    role: 'user',
    createdAt: new Date()
  }
  
  it('renders message content', () => {
    render(<ChatMessage message={mockMessage} />)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
  
  it('shows loading state when streaming', () => {
    render(<ChatMessage message={mockMessage} isStreaming />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
```

### API Testing
```javascript
// __tests__/api/chat.test.js
import { POST } from '@/app/api/chat/route'
import { NextRequest } from 'next/server'

describe('/api/chat', () => {
  it('creates chat response', async () => {
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        chatId: 'test-chat',
        content: 'Hello',
        model: 'gpt-3.5-turbo'
      })
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.text).toBeDefined()
  })
})
```

## Debugging

### Development Tools
```javascript
// Enable debug logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', { user, chat, messages })
}

// Use React DevTools
// Install browser extension for component inspection

// Prisma debugging
// Set PRISMA_DEBUG=true in .env
```

### Common Issues

1. **Hydration Errors**
   ```jsx
   // Use dynamic imports for client-only components
   import dynamic from 'next/dynamic'
   
   const ClientOnlyComponent = dynamic(
     () => import('./ClientOnlyComponent'),
     { ssr: false }
   )
   ```

2. **Database Connection Issues**
   ```bash
   # Check database status
   npx prisma db pull
   
   # Reset if corrupted
   npx prisma migrate reset
   ```

3. **Environment Variable Issues**
   ```javascript
   // Check if variables are loaded
   console.log('Environment check:', {
     hasDbUrl: !!process.env.DATABASE_URL,
     hasAuthSecret: !!process.env.BETTER_AUTH_SECRET
   })
   ```

## Performance Optimization

### Code Splitting
```javascript
// Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
})
```

### Image Optimization
```jsx
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  alt="User avatar"
  width={40}
  height={40}
  className="rounded-full"
/>
```

### Database Optimization
```javascript
// Use select to limit fields
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    email: true
  }
})

// Use pagination
const chats = await db.chat.findMany({
  take: 20,
  skip: page * 20,
  orderBy: { updatedAt: 'desc' }
})
```

## Deployment Preparation

### Build Testing
```bash
# Test production build locally
npm run build
npm start

# Check for build errors
npm run lint
```

### Environment Validation
```javascript
// Add to your app startup
const requiredEnvVars = [
  'DATABASE_URL',
  'BETTER_AUTH_SECRET',
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
  'OPENROUTER_API_KEY'
]

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})
```

## Contributing Guidelines

### Pull Request Process
1. Create feature branch from main
2. Make changes with proper commit messages
3. Add tests for new functionality
4. Update documentation if needed
5. Submit PR with clear description

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] Tests pass and coverage maintained
- [ ] Documentation updated
- [ ] No console.log statements in production code
- [ ] Error handling implemented
- [ ] Performance considerations addressed
- [ ] Security implications reviewed

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [React DevTools](https://react.dev/learn/react-developer-tools) - Component debugging
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - CSS autocomplete