---
inclusion: always
---

# Project Structure & Organization

## Root Directory Layout
```
amchi-mumbai-ai/
├── src/                    # Source code
│   ├── client/            # React frontend application
│   ├── server/            # Node.js backend application
│   └── shared/            # Shared types and utilities
├── data/                  # Static data files (slang dictionary)
├── scripts/               # Build and deployment scripts
├── dist/                  # Compiled server code (build output)
└── docker-compose.yml     # Multi-service deployment
```

## Frontend Structure (`src/client/`)
```
src/client/
├── public/                # Static assets and PWA files
│   ├── index.html        # Main HTML template
│   ├── sw.js             # Service worker for offline support
│   └── manifest.json     # PWA manifest
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Layout/       # Main app layout wrapper
│   │   └── OfflineStatus/ # Network status indicator
│   ├── pages/            # Route-level components
│   │   ├── Home/         # Landing page
│   │   └── SlangTranslator/ # Main translator interface
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API communication layer
│   ├── utils/            # Client-side utilities
│   └── shared/           # Client-specific shared code
└── package.json          # Client dependencies
```

## Backend Structure (`src/server/`)
```
src/server/
├── config/               # Configuration management
├── database/             # Database connection and schemas
│   ├── connection.ts     # MongoDB connection setup
│   ├── schemas.ts        # Data models and validation
│   └── migrations.ts     # Database migrations
├── middleware/           # Express middleware
│   ├── analytics.ts      # User tracking and analytics
│   ├── errorHandler.ts   # Global error handling
│   └── requestLogger.ts  # Request logging
├── routes/               # API route definitions
├── services/             # Business logic layer
│   ├── slangTranslator.ts # Core translation service
│   └── userSession.ts    # Session management
├── __tests__/            # Server-side tests
└── index.ts              # Application entry point
```

## Shared Code (`src/shared/`)
```
src/shared/
├── interfaces/           # API contracts and interfaces
│   ├── api.ts           # Request/response types
│   └── services.ts      # Service interfaces
├── types/               # Common TypeScript types
├── utils/               # Shared utility functions
├── validation/          # Input validation schemas
└── __tests__/           # Shared code tests
```

## Key Architectural Patterns

### Separation of Concerns
- **Client**: UI components, routing, state management
- **Server**: API endpoints, business logic, data persistence
- **Shared**: Common types, interfaces, utilities

### Component Organization
- **Pages**: Route-level components in `src/client/src/pages/`
- **Components**: Reusable UI components with co-located CSS
- **Layout**: Consistent wrapper component for all pages

### API Layer
- **Routes**: Express route handlers in `src/server/routes/`
- **Services**: Business logic separated from HTTP concerns
- **Middleware**: Cross-cutting concerns (auth, logging, error handling)

### Data Management
- **Static Data**: JSON files in `data/` directory
- **Database**: Optional MongoDB with graceful degradation
- **Types**: Shared TypeScript interfaces for data consistency

## File Naming Conventions
- **Components**: PascalCase with matching folder (`Layout/Layout.tsx`)
- **Services**: camelCase (`slangTranslator.ts`)
- **Types**: PascalCase interfaces (`TranslationResult`)
- **API Routes**: kebab-case endpoints (`/api/translate`)

## Import Patterns
- **Relative imports** within same module
- **Absolute imports** from `src/shared/` for cross-module code
- **Barrel exports** in index files for clean imports

## Testing Structure
- **Unit tests**: Co-located in `__tests__/` folders
- **Integration tests**: Server-level API testing
- **Component tests**: React Testing Library for UI components