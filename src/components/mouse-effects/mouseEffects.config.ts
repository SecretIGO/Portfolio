export const COLORS: readonly string[] = [
    '#FF6B6B',
    '#1E3A8A',
    '#8B5CF6',
    '#4ADE80',
    '#06B6D4',
    '#F59E0B',
    '#EC4899'
];

export const GLOW_BLUR = 2.5;

export const RING = {
    perClick: 1,
    speed: 80,
    jitter: 20,
    stroke: 2,
    life: 0.7,
    lifeJitter: 0.1
} as const;

export const SPARK = {
    count: 5,
    speed: 130,
    variance: 0.4,
    life: 0.4,
    stroke: 1.5,
    tail: 9
} as const;

export const FLASH = {
    radius: 10,
    life: 0.2,
    color: '#ffffff'
} as const;


export function createSvgElement(tag: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

export function randomColor(): string {
    return COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#ffffff';
}

export function setAttributes(el: Element, attrs: Record<string, string | number>) {
    for (const [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, String(value));
    }
}
