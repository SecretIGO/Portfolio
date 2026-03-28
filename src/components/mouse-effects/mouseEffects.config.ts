const CATEGORY_COLOR_TOKENS = [
    '--color-category-frontend',
    '--color-category-backend',
    '--color-category-framework',
    '--color-category-libraries',
    '--color-category-database',
] as const;

export function pickRandomExplosionColor(): string {
    const token = CATEGORY_COLOR_TOKENS[Math.floor(Math.random() * CATEGORY_COLOR_TOKENS.length)];
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || '#ffffff';
}

export const EXPLOSION_RING = {
    strokeWidth: 3.5,
    maxRadius: 40,
    peakOpacity: 0.7,
    lifetimeSeconds: 1.0,
    svgFilterId: 'ringGlow',
} as const;

export const CLICK_FLASH = {
    maxRadius: 14,
    lifetimeSeconds: 0.25,
    color: '#ffffff',
    svgFilterId: 'ringGlow',
} as const;

export function createSvgElement(tag: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

export function setAttributes(el: Element, attrs: Record<string, string | number>) {
    for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, String(value));
    }
}
