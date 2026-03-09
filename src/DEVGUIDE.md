This file is to help me with using proper semantics for my code
for readability and consistency

Rules to follow:
1. Use less divs
    1.1 Header, Main, Footer format
        1.1.1 Header is used for links, logos, and important navigation
        1.1.2 Main is usually consisted of sections, article or the sidebar
        1.1.3 Footer is used for the contact information and other details
    1.2 Accessibility of content
2. Use css for styling
3. Remember to use a box model

Naming conventions:
4. Components use PascalCase (e.g. HeroSection), directories use kebab-case (e.g. hero/)
5. Hooks are prefixed with "use" (e.g. useAnimation.ts)
6. Global/shared resources use "_" prefix (e.g. _pages_common.css)
7. Constants are categorized as [category]_[name].ts (e.g. app_config.ts)

File structure:
8. One component per folder: [ComponentName].tsx + [ComponentName].css (+ optional index.ts)
9. Never hardcode hex values — all colors, spacing, and animations live in design tokens (src/core/design_tokens/)
10. Pages go in src/pages/[page-name]/, reusable components go in src/components/[component-name]/
11. Static data goes in src/data/

TypeScript:
12. All components must have TypeScript interfaces for props
13. Use strict typing — no implicit any