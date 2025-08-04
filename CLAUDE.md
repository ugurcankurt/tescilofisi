# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Information
- **Company Name**: Tescilofisi
- **Domain**: tescilofisi.com
- **Business**: Marka tescil, patent başvurusu ve fikri mülkiyet danışmanlığı
- **Target Keywords**: "marka tescil", "marka patent", "patent başvurusu"

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 application using the App Router pattern with TypeScript. Key architectural decisions:

### UI Framework
- **shadcn/ui**: Complete component library built on Radix UI primitives
- **Tailwind CSS v4**: Utility-first styling with CSS variables for theming
- **CVA (Class Variance Authority)**: Type-safe component variants
- **Lucide React**: Icon library

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components (30+ components available)
- `lib/utils.ts` - Utility functions including `cn()` for className merging
- `hooks/` - Custom React hooks (includes mobile detection)

### Key Dependencies
- **Forms**: React Hook Form + Zod validation + @hookform/resolvers
- **Date handling**: date-fns + react-day-picker
- **Charts**: Recharts
- **Notifications**: Sonner
- **Themes**: next-themes
- **Carousels**: Embla Carousel React

### Component System
- All UI components follow shadcn/ui patterns with Radix UI primitives
- Components use CVA for variant management
- Consistent styling with CSS variables and Tailwind utilities
- Full TypeScript support with proper prop types

### Styling Conventions
- Uses `cn()` utility from `lib/utils.ts` for className merging
- CSS variables defined in `app/globals.css` for theming
- Component variants defined using CVA
- Mobile-first responsive design patterns

### Path Aliases
- `@/components` → `./components`
- `@/lib` → `./lib` 
- `@/hooks` → `./hooks`
- `@/ui` → `./components/ui`

### Database & Authentication
- **Supabase**: Backend-as-a-Service for database and authentication
- Server and client-side Supabase clients configured in `lib/supabase.ts`
- Admin dashboard with authentication for blog/content management

### Content Management
- Admin dashboard at `/admin` with authentication
- Rich text editor using TipTap for blog content creation
- Blog system with SEO optimization and structured data

### Special Features
- Multi-page structure: home, about (hakkimizda), services (hizmetler), contact (iletisim), blog
- SEO-optimized with structured data for organization markup
- Turkish language support with proper meta tags and OpenGraph data
- Mobile detection hook for responsive design decisions