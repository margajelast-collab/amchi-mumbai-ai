---
inclusion: always
---

# Technology Stack & Build System

## Architecture
**Full-Stack TypeScript Application** with separate client and server builds
- **Frontend**: React 19 + TypeScript + Create React App
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (optional, graceful degradation)
- **Cache**: Redis (optional)
- **Deployment**: Docker + Docker Compose

## Key Dependencies

### Server
- **Express**: Web framework with security middleware (helmet, cors, rate-limiting)
- **TypeScript**: Strict mode enabled with ES2020 target
- **MongoDB**: Document database with connection pooling
- **Redis**: Session storage and caching
- **Security**: helmet, express-rate-limit, express-session

### Client
- **React 19**: Latest React with concurrent features
- **React Router**: Client-side routing
- **Service Worker**: Offline functionality and PWA features
- **TypeScript**: Strict typing with React types

## Build Commands

### Development
```bash
npm run dev              # Start both client and server in development
npm run dev:server       # Server only (nodemon + ts-node)
npm run dev:client       # Client only (React dev server)
```

### Production Build
```bash
npm run build           # Build both client and server
npm run build:server    # TypeScript compilation to dist/
npm run build:client    # React production build
npm run build:prod      # Production build with optimizations
```

### Testing
```bash
npm test               # Run Jest tests
npm run test:watch     # Jest in watch mode
npm run test:coverage  # Generate coverage reports
```

### Linting & Quality
```bash
npm run lint          # ESLint check
npm run lint:fix      # Auto-fix ESLint issues
```

### Deployment
```bash
docker-compose up -d  # Start all services
npm run start:prod    # Production server start
```

## TypeScript Configuration
- **Server**: CommonJS modules, ES2020 target, strict mode
- **Client**: Handled by Create React App
- **Shared**: Types and interfaces in `src/shared/`

## Development Workflow
1. Use `npm run dev` for local development
2. Both client (port 3000) and server (port 3001) start concurrently
3. Hot reload enabled for both frontend and backend
4. Database connection is optional - app runs without it

## Production Deployment
- Multi-stage Docker build for optimization
- Non-root user for security
- Health checks included
- Graceful shutdown handling
- Environment-based configuration