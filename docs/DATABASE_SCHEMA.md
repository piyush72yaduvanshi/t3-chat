# Database Schema Documentation

## Overview

T3 Chat uses Prisma ORM with support for both PostgreSQL (production) and SQLite (development). The schema is designed for scalability and includes proper relationships and indexing.

## Database Configuration

### Development (SQLite)
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### Production (PostgreSQL)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Schema Models

### User Model
Stores user account information from GitHub OAuth.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @default(now()) @updatedAt
  sessions      Session[]
  accounts      Account[]
  chats         Chat[]

  @@unique([email])
  @@map("user")
}
```

**Key Features:**
- CUID primary key for better performance
- Unique email constraint
- Soft deletion support through relationships
- Automatic timestamps

### Session Model
Manages user authentication sessions.

```prisma
model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@map("session")
}
```

**Key Features:**
- Unique session tokens
- IP address and user agent tracking
- Automatic cleanup on user deletion
- Expiration management

### Account Model
Stores OAuth provider account information.

```prisma
model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("account")
}
```

**Key Features:**
- OAuth token management
- Multiple provider support
- Token expiration tracking
- Secure password storage (optional)

### Verification Model
Handles email verification and password reset tokens.

```prisma
model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt

  @@map("verification")
}
```

### Chat Model
Represents individual chat conversations.

```prisma
model Chat {
  id        String    @id @default(cuid())
  title     String
  model     String    
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages  Message[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([userId, updatedAt])
  @@map("chat")
}
```

**Key Features:**
- Composite index on userId and updatedAt for efficient queries
- Automatic title generation from first message
- Model tracking for AI provider selection
- Cascade deletion with user

### Message Model
Stores individual messages within chats.

```prisma
model Message {
  id          String      @id @default(cuid())
  messageRole MessageRole @default(USER)
  messageType MessageType @default(NORMAL)
  content     String
  model       String?
  chatId      String
  chat        Chat        @relation(fields: [chatId], references: [id], onDelete: Cascade)
  attachments Attachment[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([chatId, createdAt])
  @@map("message")
}
```

**Enums:**
```prisma
enum MessageRole {
  USER
  ASSISTANT
}

enum MessageType {
  NORMAL
  ERROR
  TOOL_CALL
}
```

**Key Features:**
- Role-based message classification
- Type system for different message kinds
- Efficient querying with chatId/createdAt index
- Support for future attachment system

### Attachment Model
Handles file and image attachments (future feature).

```prisma
model Attachment {
  id        String   @id @default(cuid())
  messageId String
  message   Message  @relation(fields: [messageId], references: [id], onDelete: Cascade)
  type      AttachMentType    
  url       String
  name      String?
  size      Int?
  createdAt DateTime @default(now())

  @@map("attachment")
}

enum AttachMentType {
  IMAGE
  FILE
}
```

## Relationships

### User Relationships
- **One-to-Many**: User → Sessions
- **One-to-Many**: User → Accounts  
- **One-to-Many**: User → Chats

### Chat Relationships
- **Many-to-One**: Chat → User
- **One-to-Many**: Chat → Messages

### Message Relationships
- **Many-to-One**: Message → Chat
- **One-to-Many**: Message → Attachments

## Indexing Strategy

### Performance Indexes
```prisma
@@index([userId, updatedAt])  // Chat queries by user, ordered by update time
@@index([chatId, createdAt])  // Message queries by chat, ordered chronologically
@@unique([email])             // Fast user lookup by email
@@unique([token])             // Fast session validation
```

## Migration Strategy

### Development
```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Reset database (development only)
npx prisma migrate reset
```

### Production
```bash
# Deploy migrations
npx prisma migrate deploy

# Generate client
npx prisma generate
```

## Data Access Patterns

### Common Queries

#### Get User Chats
```javascript
const chats = await db.chat.findMany({
  where: { userId: user.id },
  include: { messages: true },
  orderBy: { updatedAt: 'desc' }
});
```

#### Get Chat with Messages
```javascript
const chat = await db.chat.findUnique({
  where: { id: chatId, userId: user.id },
  include: { messages: true }
});
```

#### Create Chat with Initial Message
```javascript
const chat = await db.chat.create({
  data: {
    title,
    model,
    userId: user.id,
    messages: {
      create: {
        content,
        messageRole: 'USER',
        messageType: 'NORMAL',
        model,
      }
    }
  },
  include: { messages: true }
});
```

## Security Considerations

### Row Level Security
- All queries include user ID filtering
- Cascade deletions prevent orphaned data
- Session tokens are unique and expire

### Data Validation
- Prisma schema enforces data types
- Required fields prevent null values
- Enums constrain valid values

### Performance Optimization
- Strategic indexing for common queries
- Efficient relationship loading
- CUID for better distributed performance

## Backup and Recovery

### Development
- SQLite file can be backed up directly
- Migrations are version controlled

### Production
- PostgreSQL automated backups
- Point-in-time recovery available
- Migration rollback procedures

## Future Enhancements

### Planned Features
- Full-text search on messages
- Message reactions and threading
- File upload and attachment system
- Chat sharing and collaboration
- Message encryption for privacy