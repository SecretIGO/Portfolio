# Portfolio Website - System Design & Architecture

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Design Principles](#design-principles)
- [Technology Stack](#technology-stack)
- [File Structure](#file-structure)
- [Component Architecture](#component-architecture)
- [Design System](#design-system)
- [Development Guidelines](#development-guidelines)
- [Performance & Optimization](#performance--optimization)

## 🎯 Project Overview

**Johanz David Tolentino's Portfolio** - A minimal, professional portfolio website showcasing software engineering expertise, projects, and professional journey.

### Core Philosophy
- **Minimalism First**: Clean, distraction-free design that emphasizes content
- **Performance Obsessed**: Fast load times, smooth transitions, optimized assets
- **Accessibility Focused**: WCAG compliant, keyboard navigation, reduced motion support
- **Theme Aware**: Seamless light/dark mode with smooth transitions

### Key Features
- **Hero Section**: Dynamic role display with elegant flickering effect and rotating logo
- **About Section**: Professional story, skills, and technical expertise
- **Projects Showcase**: Curated portfolio of work and achievements
- **Contact Section**: Direct communication channels
- **Theme Toggle**: Smooth transitions between orange (light) and green (dark) themes

## 🛠 Technology Stack

### Core Technologies
- **Frontend Framework**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 7.0.0 (Fast development and optimized builds)
- **Routing**: React Router DOM 6.30.1
- **Styling**: CSS with custom components and responsive design

### Development Tools
- **Linting**: ESLint 9.9.0 with React-specific rules
- **Testing**: Vitest (configured for unit and integration testing)
- **Code Formatting**: Prettier integration
- **Type Checking**: TypeScript strict mode

### Performance & UX
- **Code Splitting**: React.lazy() for route-based splitting
- **Performance Monitoring**: Custom performance metrics system
- **Loading States**: Skeleton loading and spinners
- **Smooth Transitions**: React Transition Group 4.4.5

## 📁 File Structure

### Source Code Organization (`src/`)

The project follows a consistent organizational pattern that promotes maintainability and scalability:

```
src/
├── 📁 assets/                        # Static assets and resources
│   ├── 📁 images/                    # Image assets organized by category
│   ├── 📁 videos/                    # Video assets
│   └── 📁 fonts/                     # Web fonts and typography
├── 📁 components/                    # Reusable React components
│   └── 📁 [component-name]/          # Component directory pattern
│       ├── [ComponentName].tsx       # Component implementation
│       ├── [ComponentName].css       # Component-specific styles
│       └── index.ts                  # Export file (optional)
├── 📁 _constants/                    # Application constants and configuration
│   ├── [category]_[name].ts          # Categorized constant files
│   └── [feature]_[name].ts           # Feature-specific constants
├── 📁 _design-tokens/                # Design system and tokens
│   ├── colors.css                    # Colors (CSS variables)
│   ├── typography.css                # Type ramps
│   ├── spacing.css                   # Space scale
│   ├── animations.css                # Keyframes + easing
│   └── breakpoints.css               # Media query helpers
├── 📁 contexts/                      # React context providers (optional)
├── 📁 data/                          # Static data and configuration (optional)
├── 📁 hooks/                         # Custom React hooks
│   ├── use[Feature].ts               # Feature-specific hooks
│   └── use[Behavior].ts              # Behavior-focused hooks
├── 📁 pages/                         # Route/page-level components
│   └── 📁 landing/                   # Landing page (single-page structure)
│       ├── LandingPage.tsx
│       └── LandingPage.css
├── index.css                         # Global styles (imports tokens + globals)
├── index.jsx                         # Application entry point (Vite mounts here)
└── vite-env.d.ts                     # Vite types (optional when TS is used)
```

### Organizational Principles

#### **1. Directory Naming Patterns**
- **`_` prefix**: Denotes shared/global resources (e.g., `_constants`, `_design-tokens`, `_pages_common.css`)
- **`components/[component-name]/`**: One component per folder
- **`pages/[page-name]/`**: Individual page directories following consistent naming

#### **2. Page Organization Patterns**
The project follows these organizational principles:

**A. Standard Page Pattern (Most Common)**
- **Location**: `src/pages/[page-name]/`
- **Structure**: Each page has its own component and styles
- **Pattern**: `[PageName].tsx` + `[PageName].css`
- **Variations**: Can be standalone or within sections


#### **3. Naming Conventions**
- **Components**: PascalCase for React components, kebab-case for directories
- **Files**: Descriptive names that indicate purpose and functionality
- **Constants**: Categorized by feature or domain
- **Shared Resources**: `_` prefix for global styles and constants

#### **4. File Structure Patterns**
**Standard Page Structure:**
```
[page-name]/
├── [PageName].tsx        # Main component
└── [PageName].css        # Page styles
```

#### **5. Component Architecture Pattern**
```
[ComponentName]/
├── [ComponentName].tsx   # Component logic
├── [ComponentName].css   # Component styles
└── index.ts            # Export file (optional)
```

#### **6. Scalability Guidelines**
**Adding New Content:**
1. **New Page**: Follow the standard `[PageName].tsx` + `[PageName].css` pattern
2. **New Section**: Use `tab-[section]/` structure with consistent page patterns
3. **Shared Resources**: Use `_` prefix for global resources, `shared/` for section-specific
4. **Special Patterns**: Create `[special-section]/` for unique organizational needs

**Maintaining Consistency:**
- Follow established naming patterns
- Use shared components when possible
- Maintain the `_` prefix for global resources
- Keep related files in the same directory
- Document any new organizational patterns

**Future-Proofing:**
- Use generic patterns rather than specific implementations
- Document organizational principles, not specific file names
- Focus on structure and relationships, not exact names
- Allow for evolution while maintaining consistency
- Design patterns that can accommodate new content types

### Public Assets (`public/`)
```
public/
├── 📁 downloadables/                  # Downloadable files
│   └── [filename].[ext]               # Organized by file type and purpose
├── 📁 fonts/                          # Web fonts
│   └── [FontName].[ext]               # Font files
└── [other-assets]                     # Additional static assets
```

### File Naming Patterns

#### **Components**
- `[ComponentName].tsx` - React component files
- `[ComponentName].css` - Component-specific styles
- `index.ts` - Export files for clean imports

#### **Data & Configuration**
- `[feature]_[name].ts` - Feature-specific data files
- `[category].ts` - Categorized data files
- `types.ts` - TypeScript type definitions

#### **Hooks & Utilities**
- `use[Feature].ts` - Feature-specific hooks
- `use[Behavior].ts` - Behavior-focused hooks
- `[utility].ts` - Utility functions

#### **Constants & Configuration**
- `[category]_[name].ts` - Categorized constants
- `[feature]_[name].ts` - Feature-specific constants
- `[system].css` - System-wide styles

### Scalability Considerations

#### **Adding New Features**
1. **New Section**: Create `src/pages/[new-section]/`
2. **New Component**: Add to `src/components/[component-name]/`
3. **New Data**: Place in appropriate `src/data/` subdirectory
4. **New Constants**: Add to relevant `src/_constants/` file

#### **Maintaining Consistency**
- Follow established naming patterns
- Use shared components when possible
- Maintain the `_` prefix for global resources
- Keep related files in the same directory

#### **Future-Proofing**
- Use generic patterns rather than specific implementations
- Document organizational principles, not specific file names
- Focus on structure and relationships, not exact names
- Allow for evolution while maintaining consistency

## 🧩 Component Architecture

### Component Organization
- **Atomic Design**: Components follow atomic design principles
- **CSS Modules**: Each component has its own CSS file for scoped styling
- **Props Interface**: All components use TypeScript interfaces for props
- **Memoization**: Components use React.memo() for performance optimization

### Key Component Categories
1. **Layout Components**: Header, Footer, Navigation
2. **Content Components**: Course pages, Information displays
3. **Interactive Components**: Sliders, Modals, Forms
4. **Utility Components**: Loading spinners, Error boundaries

### Component Structure Pattern
```
ComponentName/
├── ComponentName.tsx    # Component logic
├── ComponentName.css    # Component styles
└── index.ts            # Export file (if needed)
```

## 🛣️ Routing System

### Route Structure
- **Single-Page Layout**: `/` (primary route)
- **Section Anchors**: `#about`, `#projects`, `#contact`
- **Optional Future Routes**: `/projects`, `/projects/:id` if needed later

### Navigation Architecture
- **Top Navigation Bar**: Links to section anchors (`#about`, `#projects`, `#contact`)
- **Smooth Scrolling**: Anchor jumps with scroll-margin for header offset
- **Active Link Highlight**: Update on scroll to reflect current section
- **Mobile Navigation**: Responsive mobile drawer / hamburger menu

## ⚡ Performance Optimizations

### Code Splitting
- **Route-based Splitting**: Each major section loads independently
- **Component Lazy Loading**: Heavy components loaded on demand
- **Dynamic Imports**: React.lazy() for component-level splitting

### Performance Monitoring
- **Built-in Metrics**: Custom performance monitoring system
- **Development Tools**: Performance metrics in development mode
- **Bundle Analysis**: Build analysis tools for optimization

### Optimization Strategies
- **Image Optimization**: Optimized images and lazy loading
- **CSS Optimization**: Critical CSS inlining and optimization
- **JavaScript Optimization**: Tree shaking and minification

## 🔧 Development Workflow

### Development Environment
- **Hot Module Replacement**: Fast development with HMR
- **TypeScript**: Strict type checking and IntelliSense
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting and style consistency

### Build Process
- **Development Build**: Fast development server with Vite
- **Production Build**: Optimized production bundle
- **Bundle Analysis**: Performance and size analysis tools

### Quality Assurance
- **Linting**: ESLint for code quality
- **Type Checking**: TypeScript compilation verification
- **Formatting**: Prettier for consistent code style

## 🚀 Deployment

### Vercel Configuration
- **Automatic Deployment**: CI/CD from Git repository
- **Preview Deployments**: Automatic preview for all branches
- **Production Deployment**: Automatic deployment from main branch

### Environment Management
- **Environment Variables**: Configurable through Vercel dashboard
- **Build Optimization**: Automatic build optimization
- **CDN Distribution**: Global content delivery network

### Performance Monitoring
- **Real-time Metrics**: Live performance monitoring
- **Error Tracking**: Automatic error reporting
- **Analytics**: Built-in analytics and insights

## 📊 Data Management

### Static Data Structure
- **Configuration Files**: Centralized configuration management
- **Type Definitions**: TypeScript interfaces for data consistency
- **Constants**: Application-wide constants and settings

### Data Sources
- **Local Configuration**: Static configuration files
- **Asset Management**: Centralized image and asset management
- **Content Structure**: Organized content hierarchy

## 🔒 Security & Best Practices

### Security Measures
- **Content Security Policy**: CSP headers for security
- **Input Validation**: Type-safe input handling
- **Secure Headers**: Security-focused HTTP headers

### Development Best Practices
- **Code Quality**: ESLint and TypeScript for code quality
- **Performance**: Built-in performance monitoring
- **Accessibility**: WCAG compliance and best practices
- **Responsive Design**: Mobile-first responsive design

## 📈 Future Enhancements

### Planned Features
- **Content Management System**: Dynamic content management
- **User Authentication**: Student and staff portals
- **Advanced Analytics**: Enhanced performance monitoring
- **Mobile Applications**: Native mobile app development

## 🧭 Design Principles (Modern)

- **Content First**: Prioritize clarity. Hero copy and key CTAs must be readable, left-aligned on desktop, centered on small screens.
- **Single Source of Truth**: Theme, spacing, colors live in `src/_design-tokens/`. Never hardcode hex values in component CSS.
- **Atomic-ish Components**: One folder per component with `.tsx` + `.css` (and optional `index.ts`). Keep state local; extract hooks for reusable logic.
- **Progressive Enhancement**: Works without animations; prefers-reduced-motion respected globally.
- **Routing Simplicity**: Flat routes; pages own their styles; avoid deep component coupling.
- **Strict Typing**: TS-first for components, props, and utilities.

## 🗂 Canonical File Structure (Actionable)

This is the structure to follow. Adjust names to your feature, keep the pattern.

```
src/
├── _constants/                  # Global constants & config
│   ├── app_config.ts
│   ├── debug_flags.ts
│   └── language_categories.ts
├── _design-tokens/              # Design system tokens (CSS custom properties)
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── animations.css
│   └── breakpoints.css
├── assets/                      # Static assets (imported by code)
│   ├── images/
│   ├── videos/
│   └── fonts/
├── components/                  # Reusable UI building blocks
│   ├── navbar/
│   │   ├── Navbar.tsx
│   │   └── Navbar.css
│   ├── hero/
│   │   ├── Hero.tsx
│   │   └── Hero.css
│   ├── about/
│   │   ├── About.tsx
│   │   └── About.css
│   ├── projects/
│   │   ├── Projects.tsx
│   │   └── Projects.css
│   ├── contact/
│   │   ├── Contact.tsx
│   │   └── Contact.css
│   └── mega-dropdown/
│       ├── MegaDropdown.tsx
│       └── MegaDropdown.css
├── contexts/                    # React contexts (if/when needed)
│   └── ThemeContext.tsx (example)
├── data/                        # Static data & config by feature (optional)
│   └── projects_data.ts (example)
├── hooks/                       # Reusable hooks
│   └── useAnimation.ts
├── pages/                       # Route-level components
│   └── landing/
│       ├── LandingPage.tsx
│       └── LandingPage.css
├── index.css                    # Global CSS (imports tokens + global rules)
├── index.jsx                    # App bootstrap/entry (mount React)
└── vite-env.d.ts                # Vite types (if TypeScript emits)