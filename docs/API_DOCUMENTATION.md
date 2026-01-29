# API Documentation

## Overview

T3 Chat uses Next.js API routes and server actions for backend functionality. The API is organized into authentication, chat management, and AI integration endpoints.

## Authentication API

### GitHub OAuth
- **Endpoint**: `/api/auth/[...all]`
- **Method**: Handled by Better Auth
- **Description**: Manages GitHub OAuth flow and session management

### Server Actions

#### `currentUser()`
- **File**: `src/modules/authentication/actions/index.js`
- **Description**: Gets the current authenticated user
- **Returns**: User object or null

## Chat API

### Chat Management

#### Create Chat with Message
- **Action**: `createChatWithMessage(values)`
- **File**: `src/modules/chat/actions/index.js`
- **Parameters**:
  ```javascript
  {
    content: string,  // Message content
    model: string     // AI model identifier
  }
  ```
- **Returns**: 
  ```javascript
  {
    success: boolean,
    message: string,
    data?: Chat       // Chat object with initial message
  }
  ```

#### Get All Chats
- **Action**: `getAllChats()`
- **Description**: Retrieves all chats for the current user
- **Returns**: Array of chat objects with messages

#### Get Chat by ID
- **Action**: `getChatById(chatId)`
- **Parameters**: `chatId` (string)
- **Returns**: Chat object with all messages

#### Delete Chat
- **Action**: `deleteChat(chatId)`
- **Parameters**: `chatId` (string)
- **Returns**: Success/error response

#### Create Message in Chat
- **Action**: `createMessageInChat(values, chatId)`
- **Parameters**:
  ```javascript
  {
    content: string,  // Message content
    model: string     // AI model identifier
  }
  ```
- **Description**: Adds a user message and generates AI response

## AI Integration API

### Chat Completion
- **Endpoint**: `/api/chat`
- **Method**: POST
- **Description**: Processes chat messages and generates AI responses
- **Request Body**:
  ```javascript
  {
    chatId: string,   // Chat identifier
    model: string,    // AI model to use
    content: string   // User message content
  }
  ```
- **Response**:
  ```javascript
  {
    text: string      // AI generated response
  }
  ```

### Get Available Models
- **Endpoint**: `/api/ai/get-models`
- **Method**: GET
- **Description**: Retrieves list of available AI models from OpenRouter
- **Response**: Array of model objects

## Data Models

### User
```javascript
{
  id: string,
  name: string,
  email: string,
  emailVerified: boolean,
  image?: string,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Chat
```javascript
{
  id: string,
  title: string,
  model: string,
  userId: string,
  messages: Message[],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Message
```javascript
{
  id: string,
  messageRole: "USER" | "ASSISTANT",
  messageType: "NORMAL" | "ERROR" | "TOOL_CALL",
  content: string,
  model?: string,
  chatId: string,
  attachments: Attachment[],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Attachment
```javascript
{
  id: string,
  messageId: string,
  type: "IMAGE" | "FILE",
  url: string,
  name?: string,
  size?: number,
  createdAt: DateTime
}
```

## Error Handling

All server actions return a consistent response format:
```javascript
{
  success: boolean,
  message: string,
  data?: any        // Optional data payload
}
```

Common error responses:
- `401`: "Unauthorized user" - User not authenticated
- `400`: "Message content is required" - Invalid input
- `404`: "Chat not found" - Resource doesn't exist
- `500`: "Failed to [action]" - Server error

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production deployment using:
- Upstash Redis for serverless rate limiting
- Next.js middleware for request throttling

## Security

- All server actions validate user authentication
- Database queries include user ID filtering
- Environment variables protect sensitive API keys
- CORS is handled by Next.js defaults

## OpenRouter Integration

The application integrates with OpenRouter for AI model access:
- API key authentication via `OPENROUTER_API_KEY`
- Model selection through `/api/ai/get-models`
- Streaming responses for real-time chat experience
- Support for multiple AI providers through OpenRouter