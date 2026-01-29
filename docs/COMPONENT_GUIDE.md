# Component Guide

## Overview

T3 Chat follows a modular component architecture with clear separation between UI components, AI-specific elements, and feature modules. All components are built with React 19.1.0 and use modern patterns.

## Component Architecture

### Directory Structure
```
src/components/
├── ai-elements/     # AI-specific components
├── providers/       # Context providers
└── ui/             # Base UI components (Radix UI + Tailwind)

src/modules/
├── authentication/ # Auth-related components
├── chat/          # Chat functionality components
└── ai-agent/      # AI integration components
```

## Base UI Components

Built with Radix UI primitives and Tailwind CSS for consistent design and accessibility.

### Button Component
```jsx
// src/components/ui/button.jsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="md">
  Click me
</Button>
```

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `sm`, `md`, `lg`, `icon`

### Input Component
```jsx
// src/components/ui/input.jsx
import { Input } from "@/components/ui/input"

<Input 
  type="text" 
  placeholder="Enter message..." 
  className="w-full"
/>
```

### Card Component
```jsx
// src/components/ui/card.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Chat Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Chat content goes here</p>
  </CardContent>
</Card>
```

## AI-Specific Components

### Message Component
```jsx
// src/components/ai-elements/message.jsx
import { Message } from "@/components/ai-elements/message"

<Message 
  role="user" 
  content="Hello, how are you?"
  timestamp={new Date()}
/>
```

**Props:**
- `role`: "user" | "assistant"
- `content`: string
- `timestamp`: Date
- `model?`: string

### Code Block Component
```jsx
// src/components/ai-elements/code-block.jsx
import { CodeBlock } from "@/components/ai-elements/code-block"

<CodeBlock 
  language="javascript"
  code="console.log('Hello World')"
/>
```

### Loader Component
```jsx
// src/components/ai-elements/loader.jsx
import { Loader } from "@/components/ai-elements/loader"

<Loader message="Generating response..." />
```

## Chat Module Components

### Chat Input
```jsx
// src/modules/chat/components/chat-input.jsx
import { ChatInput } from "@/modules/chat/components/chat-input"

<ChatInput 
  onSubmit={handleSubmit}
  disabled={isLoading}
  placeholder="Type your message..."
/>
```

**Features:**
- Auto-resize textarea
- Submit on Enter (Shift+Enter for new line)
- Loading states
- Character count (optional)

### Chat Message
```jsx
// src/modules/chat/components/chat-message.jsx
import { ChatMessage } from "@/modules/chat/components/chat-message"

<ChatMessage 
  message={messageObject}
  isStreaming={false}
/>
```

### Chat Sidebar
```jsx
// src/modules/chat/components/chat-sidebar.jsx
import { ChatSidebar } from "@/modules/chat/components/chat-sidebar"

<ChatSidebar 
  chats={chatsArray}
  currentChatId={chatId}
  onChatSelect={handleChatSelect}
/>
```

### Model Selector
```jsx
// src/modules/chat/components/model-selector.jsx
import { ModelSelector } from "@/modules/chat/components/model-selector"

<ModelSelector 
  selectedModel={currentModel}
  onModelChange={handleModelChange}
  models={availableModels}
/>
```

## Authentication Components

### User Button
```jsx
// src/modules/authentication/components/user-button.jsx
import { UserButton } from "@/modules/authentication/components/user-button"

<UserButton 
  user={currentUser}
  onSignOut={handleSignOut}
/>
```

## Provider Components

### Theme Provider
```jsx
// src/components/providers/theme-provider.jsx
import { ThemeProvider } from "@/components/providers/theme-provider"

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

### Query Provider
```jsx
// src/components/providers/query-provider.jsx
import { QueryProvider } from "@/components/providers/query-provider"

<QueryProvider>
  {children}
</QueryProvider>
```

## Component Patterns

### Server Components
Used for data fetching and initial rendering:

```jsx
// Server Component Example
import { getChatById } from "@/modules/chat/actions"

export default async function ChatPage({ params }) {
  const { data: chat } = await getChatById(params.chatId)
  
  return (
    <div>
      <ChatHeader chat={chat} />
      <ChatMessages messages={chat.messages} />
    </div>
  )
}
```

### Client Components
Used for interactivity and state management:

```jsx
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function InteractiveComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <Button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  )
}
```

### Custom Hooks Integration
```jsx
"use client"
import { useChat } from "@/modules/chat/hooks/chat"

export function ChatComponent({ chatId }) {
  const { messages, sendMessage, isLoading } = useChat(chatId)
  
  return (
    <div>
      {messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <ChatInput onSubmit={sendMessage} disabled={isLoading} />
    </div>
  )
}
```

## Styling Guidelines

### Tailwind CSS Classes
```jsx
// Consistent spacing and typography
<div className="space-y-4 p-6">
  <h1 className="text-2xl font-semibold">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### CSS Variables
```css
/* src/app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --muted: 210 40% 98%;
  --muted-foreground: 215.4 16.3% 46.9%;
}
```

## Accessibility

### ARIA Labels
```jsx
<Button 
  aria-label="Send message"
  aria-describedby="message-help"
>
  Send
</Button>
```

### Keyboard Navigation
```jsx
<div 
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Interactive Element
</div>
```

### Focus Management
```jsx
import { useRef, useEffect } from "react"

export function Modal({ isOpen }) {
  const focusRef = useRef(null)
  
  useEffect(() => {
    if (isOpen && focusRef.current) {
      focusRef.current.focus()
    }
  }, [isOpen])
  
  return (
    <dialog open={isOpen}>
      <button ref={focusRef}>Close</button>
    </dialog>
  )
}
```

## Performance Optimization

### Code Splitting
```jsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loader />,
  ssr: false
})
```

### Memoization
```jsx
import { memo, useMemo } from 'react'

const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item))
  }, [data])
  
  return <div>{processedData}</div>
})
```

## Testing Components

### Component Testing
```jsx
// __tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

test('button handles click events', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)
  
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

## Component Development Guidelines

### 1. Single Responsibility
Each component should have one clear purpose.

### 2. Prop Validation
Use TypeScript or PropTypes for type safety.

### 3. Composition over Inheritance
Prefer composition patterns for flexibility.

### 4. Consistent Naming
- PascalCase for components
- camelCase for props and functions
- kebab-case for CSS classes

### 5. Error Boundaries
Wrap components that might fail:

```jsx
import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```

## Future Enhancements

### Planned Components
- Rich text editor for messages
- File upload component
- Voice message recorder
- Message reactions
- Chat export functionality
- Advanced search interface