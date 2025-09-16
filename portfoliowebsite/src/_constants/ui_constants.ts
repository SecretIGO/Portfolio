// UI Constants

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const TRANSITION_EASING = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

export const SHADOW = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
} as const;

export const COMPONENT_SIZES = {
  xs: '1.5rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '3rem',
  xl: '3.5rem',
  '2xl': '4rem',
} as const;

export const ANIMATION_PRESETS = {
  fadeIn: 'fadeIn var(--animation-duration-normal) var(--ease-out)',
  fadeOut: 'fadeOut var(--animation-duration-normal) var(--ease-in)',
  slideInUp: 'slideInUp var(--animation-duration-normal) var(--ease-out)',
  slideInDown: 'slideInDown var(--animation-duration-normal) var(--ease-out)',
  slideInLeft: 'slideInLeft var(--animation-duration-normal) var(--ease-out)',
  slideInRight: 'slideInRight var(--animation-duration-normal) var(--ease-out)',
  scaleIn: 'scaleIn var(--animation-duration-normal) var(--ease-out-back)',
  scaleOut: 'scaleOut var(--animation-duration-normal) var(--ease-in-back)',
  bounceIn: 'bounceIn var(--animation-duration-slow) var(--ease-out-back)',
  shake: 'shake var(--animation-duration-normal) var(--ease-in-out)',
  pulse: 'pulse var(--animation-duration-slow) var(--ease-in-out) infinite',
  spin: 'spin var(--animation-duration-slow) var(--ease-linear) infinite',
} as const;

export const TRANSITION_PRESETS = {
  fast: 'all var(--animation-duration-fast) var(--ease-out)',
  normal: 'all var(--animation-duration-normal) var(--ease-in-out)',
  slow: 'all var(--animation-duration-slow) var(--ease-in-out)',
  colors: 'color var(--animation-duration-normal) var(--ease-out), background-color var(--animation-duration-normal) var(--ease-out), border-color var(--animation-duration-normal) var(--ease-out)',
  opacity: 'opacity var(--animation-duration-normal) var(--ease-out)',
  transform: 'transform var(--animation-duration-normal) var(--ease-out)',
  scale: 'transform var(--animation-duration-normal) var(--ease-out-back)',
} as const;
