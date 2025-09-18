# DevPulse - Next.js Blog Site

A modern, responsive blog application built with Next.js 15 that fetches and displays articles from the dev.to API. This project demonstrates advanced React patterns, TypeScript implementation, and modern web development practices.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Theming System](#theming-system)
- [Components](#components)

## ✨ Features

### Core Functionality

- **Dynamic Blog Posts**: Fetches real-time articles from dev.to API
- **Individual Post Pages**: Detailed view with markdown rendering
- **Tag-based Filtering**: Browse posts by technology tags
- **Search Functionality**: Real-time search across all posts
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Advanced Features

- **6 Custom Themes**: Ruby Midnight, Terracotta Ember, Midnight Moss, Azure Breeze, Honey Horizon, Mocha Sophisticate
- **Smooth Theme Transitions**: Animated theme switching with ripple effects
- **Contact Form**: Functional contact form with email integration
- **Syntax Highlighting**: Code blocks with react-syntax-highlighter
- **Loading States**: Skeleton loaders and loading spinners
- **Error Handling**: Comprehensive error boundaries and fallbacks

### Performance & UX

- **Image Optimization**: Next.js Image component with external URL support
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Progressive Enhancement**: Works without JavaScript

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion & CSS animations
- **Icons**: Lucide React

### Backend & APIs

- **API**: dev.to REST API
- **Email**: Nodemailer integration
- **Validation**: Zod schema validation

### Development Tools

- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Turbopack (Next.js)
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nextjs-blogsite.git
   cd nextjs-blogsite
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your environment variables:

   ```env
   # Email configuration (for contact form)
   EMAIL_USER=your-configured-emailid
   EMAIL_PASSWORD=configured-email-password-from-app-password
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-blogsite/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── blog/[slug]/       # Dynamic blog post pages
│   │   ├── tags/              # Tag pages
│   │   ├── contact/           # Contact page
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── context/          # React contexts
│   │   ├── BlogCard.tsx      # Blog post card
│   │   ├── BlogGrid.tsx      # Blog posts grid
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── ...
│   ├── lib/                  # Utility functions
│   │   ├── api.ts           # API functions
│   │   ├── themes.ts        # Theme configurations
│   │   ├── utils.ts         # Helper utilities
│   │   └── schema/          # Validation schemas
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies
```

## 🔌 API Integration

### dev.to API Endpoints Used

- **Articles**: `GET /api/articles` - Fetch blog posts
- **Single Article**: `GET /api/articles/{id}` - Get individual post
- **Tags**: `GET /api/tags` - Retrieve available tags

### API Functions

```typescript
// Fetch paginated blog posts
fetchBlogPosts(page?: number, tag?: string, query?: string)

// Get individual blog post
fetchBlogPost(id: string)

// Retrieve all tags
fetchTags()
```

## 🎨 Theming System

### Available Themes

1. **Ruby Midnight** - Bold reds on deep black with golden highlights
2. **Terracotta Ember** - Fiery elegance with warm earth tones
3. **Midnight Moss** - Dark forest greens with amber accents
4. **Azure Breeze** - Oceanic serenity with soft blues
5. **Honey Horizon** - Cream base with honey gold and lavender
6. **Mocha Sophisticate** - Warm coffee-inspired palette

### Theme Implementation

```css
/* Custom CSS properties for theming */
[data-theme="ruby"] {
  --background-color: oklch(8.5% 0.02 0);
  --text-color: oklch(92% 0.015 25);
  --accent-color: oklch(45% 0.18 15);
  /* ... more theme variables */
}
```

## 🧩 Components

### Key Components

- **BlogCard**: Displays individual blog post preview
- **BlogGrid**: Grid layout for blog posts with pagination
- **Navbar**: Responsive navigation with theme switcher
- **PageHeader**: Reusable page header with search
- **MarkdownComponent**: Renders markdown content with syntax highlighting
- **ThemeDropdown**: Theme selection dropdown
- **ContactForm**: Functional contact form with validation

### UI Components (Radix UI)

- Button, Card, Input, Textarea
- Dropdown Menu
- Badge for tags


## 📈 Performance Optimizations

- **Image Optimization**: `unoptimized: true` for external images
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Components and images load on demand
- **Bundle Analysis**: Use `npm run analyze` to check bundle size

## 🔧 Development Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🙏 Acknowledgments

- [dev.to](https://dev.to) for providing the API
- [Radix UI](https://radix-ui.com) for accessible components
- [Tailwind CSS](https://tailwindcss.com) for styling system

---

_This project was created as part of primer to practice and learn Next.js related concepts and is not affiliated with dev.to in any way._
