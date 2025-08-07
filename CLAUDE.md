# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Information
- **Company Name**: Tescilofisi
- **Domain**: tescilofisi.com
- **Business**: Marka tescil, patent başvurusu ve fikri mülkiyet danışmanlığı
- **Target Keywords**: "marka tescil", "marka patent", "patent başvurusu"

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build` - Build for production (includes TypeScript checking)
- `npm start` - Start production server
- `npm run lint` - Run ESLint (configured to ignore errors during builds)

### Database Management
- Supabase migrations are located in `supabase/migrations/`
- Run migrations via Supabase Dashboard SQL Editor or `supabase db push` (if CLI installed)
- Admin users: admin@tescilofisi.com, ugurcankurt@gmail.com

## Architecture Overview

This is a Next.js 15 application using the App Router pattern with TypeScript, built for Turkish trademark and patent consultation business. Key architectural decisions:

### Build & Performance Optimizations
- **Turbopack**: Fast refresh development server for improved DX
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Strict mode with ES2017 target for optimal compatibility
- **Image optimization**: Next.js Image component with remote patterns configured
- **Bundle optimization**: Tree-shaking and automatic code splitting

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

### Path Aliases & Configuration
- `@/*` → `./*` (configured in tsconfig.json)
- **shadcn/ui config**: New York style, RSC enabled, CSS variables, neutral base color
- Common paths: `@/components`, `@/lib`, `@/hooks`, `@/ui` → `./components/ui`
- **Component aliases**: Configured in `components.json` for shadcn/ui CLI

### Database & Authentication
- **Supabase**: Backend-as-a-Service for database and authentication
- **Client configuration**: Server and client-side Supabase clients in `lib/supabase.ts`
- **Schema**: `blog_posts` (id, title, content, slug, published, created_at, updated_at, views)
- **Schema**: `contact_forms` (id, name, email, phone, service, message, created_at)
- **Authentication**: Session-based with admin role checking (`admin@tescilofisi.com`, `ugurcankurt@gmail.com`)
- **RLS policies**: Public read access, admin-only write access
- **Service role**: Bypasses RLS for server-side admin operations
- **TypeScript interfaces**: `BlogPost`, `ContactForm` with auto-generated timestamps

### Content Management
- Admin dashboard at `/admin` with authentication
- Rich text editor using TipTap for blog content creation
- Blog system with SEO optimization and structured data

### Special Features
- Multi-page structure: home, about (hakkimizda), services (hizmetler), contact (iletisim), blog
- SEO-optimized with structured data for organization markup
- Turkish language support with proper meta tags and OpenGraph data
- Mobile detection hook for responsive design decisions
- Contact form API endpoint at `/api/contact` with email integration
- View tracking system for blog posts (`/api/track-view`)
- WhatsApp integration component for customer communication

### Environment Configuration
- **Required Supabase variables**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Service role key**: `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS for admin operations)
- **Admin configuration**: `NEXT_PUBLIC_ADMIN_EMAIL` (defaults to admin@tescilofisi.com)
- **Analytics**: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4 format), `NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE`
- **Image optimization**: Configured for Supabase storage (`nintlbgwbrzkvrynathe.supabase.co`) and tescilofisi.com domain
- **Build configuration**: ESLint ignores errors during builds (development-focused approach)

## Testing and Quality Assurance

This project currently does not have automated tests configured. When implementing new features:
- Use TypeScript for type safety
- Follow existing component patterns in `components/ui/`
- Test manually in development mode using `npm run dev`
- Run `npm run build` to catch TypeScript errors and ensure production readiness
- Use `npm run lint` for code quality checks

## API Endpoints

- `/api/contact` - Contact form submissions with Zod validation and email integration
- `/api/track-view` - Anonymous blog post view tracking with increment counter

### API Patterns
- **Validation**: Zod schemas for request validation
- **Error handling**: Structured Turkish error responses
- **Database access**: Service role key for bypassing RLS policies
- **Security**: Input sanitization and CSRF protection through Next.js