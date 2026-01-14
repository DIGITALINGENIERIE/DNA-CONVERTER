# ADN Converter

## Overview
A DNA sequence converter application with a retro sci-fi themed interface. Users can upload DNA sequence files in TXT or DNA format and convert them.

## Project Architecture

### Stack
- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: TailwindCSS with shadcn/ui components

### Directory Structure
- `/client` - React frontend application
  - `/src` - Source files
  - `/public` - Static assets
- `/server` - Express backend
  - `index.ts` - Main server entry point
  - `routes.ts` - API routes
  - `vite.ts` - Vite dev server integration
  - `converter.ts` - DNA conversion logic
- `/shared` - Shared types and schema between client/server
  - `schema.ts` - Drizzle database schema
  - `routes.ts` - Shared route definitions

### Key Features
- File upload with drag-and-drop support (react-dropzone)
- DNA sequence parsing and conversion
- Real-time process monitoring UI
- Secure connection indicators

## Development

### Running the App
```bash
npm run dev
```
Starts the development server on port 5000.

### Database
```bash
npm run db:push
```
Pushes schema changes to the PostgreSQL database.

### Build for Production
```bash
npm run build
npm run start
```

## Recent Changes
- January 14, 2026: Initial setup and configuration for Replit environment
