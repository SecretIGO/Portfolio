// Application Configuration Constants

export const APP_CONFIG = {
    name: 'Portfolio Website',
    version: '1.0.0',
    description: 'Modern React Portfolio Website',
    author: 'Your Name',
    url: 'https://your-portfolio.com',

    // API Configuration
    api: {
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001',
        timeout: 10000,
    },

    // Feature Flags
    features: {
        darkMode: true,
        animations: true,
        analytics: false,
        pwa: false,
    },

    // Performance Settings
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        codeSplitting: true,
    },
} as const;

export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    PROJECTS: '/projects',
    CONTACT: '/contact',
    BLOG: '/blog',
} as const;

export const EXTERNAL_LINKS = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'mailto:your.email@example.com',
} as const;
