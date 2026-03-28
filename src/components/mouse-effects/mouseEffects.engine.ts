import { EXPLOSION_RING, CLICK_FLASH, createSvgElement, pickRandomExplosionColor, setAttributes } from './mouseEffects.config';
import type { Effect } from './mouseEffects.types';

function tickEffect(effect: Effect, dt: number): boolean {
    effect.age += dt;
    const lifetimeProgress = Math.min(1, effect.age / effect.life);
    const remainingLife = 1 - lifetimeProgress;

    switch (effect.kind) {
        case 'ring': {
            const easeOutCubic = 1 - Math.pow(1 - lifetimeProgress, 3);
            effect.currentRadius = effect.maxRadius * easeOutCubic;

            const FADE_START = 0.6;
            const opacityScalar = lifetimeProgress < FADE_START
                ? 1
                : 1 - (lifetimeProgress - FADE_START) / (1 - FADE_START);

            setAttributes(effect.el, {
                r: effect.currentRadius,
                opacity: effect.peakOpacity * opacityScalar,
                'stroke-width': Math.max(0, effect.strokeWidth * Math.pow(remainingLife, 0.2)),
            });
            break;
        }

        case 'flash':
            setAttributes(effect.el, {
                r: CLICK_FLASH.maxRadius * (1 - Math.pow(remainingLife, 3)),
                opacity: remainingLife * 0.6,
            });
            break;
    }

    return effect.age >= effect.life;
}

export function startEffectEngine(group: SVGGElement, getSvg: () => SVGSVGElement | null): () => void {
    const effects: Effect[] = [];
    let lastTime = performance.now();

    function add(tag: string, attrs: Record<string, string | number>, data: Record<string, unknown>) {
        const el = createSvgElement(tag);
        setAttributes(el, attrs);
        group.appendChild(el);
        effects.push({ ...data, el } as Effect);
    }

    const syncViewBox = () =>
        getSvg()?.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);

    const onPointerDown = ({ clientX: clickX, clientY: clickY }: PointerEvent) => {
        add('circle',
            { cx: clickX, cy: clickY, r: 0, fill: CLICK_FLASH.color, opacity: 0.8, filter: `url(#${CLICK_FLASH.svgFilterId})` },
            { kind: 'flash', age: 0, life: CLICK_FLASH.lifetimeSeconds },
        );

        add('circle', {
            cx: clickX, cy: clickY, r: 0, fill: 'none',
            stroke: pickRandomExplosionColor(),
            'stroke-width': EXPLOSION_RING.strokeWidth,
            opacity: EXPLOSION_RING.peakOpacity,
            filter: `url(#${EXPLOSION_RING.svgFilterId})`,
        }, {
            kind: 'ring',
            currentRadius: 0,
            maxRadius: EXPLOSION_RING.maxRadius,
            strokeWidth: EXPLOSION_RING.strokeWidth,
            peakOpacity: EXPLOSION_RING.peakOpacity,
            age: 0, life: EXPLOSION_RING.lifetimeSeconds,
        });
    };

    const tick = (now: number) => {
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        for (let i = effects.length - 1; i >= 0; i--) {
            if (tickEffect(effects[i], dt)) {
                effects[i].el.remove();
                effects.splice(i, 1);
            }
        }

        raf = requestAnimationFrame(tick);
    };

    syncViewBox();
    window.addEventListener('resize', syncViewBox);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    let raf = requestAnimationFrame(tick);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', syncViewBox);
        window.removeEventListener('pointerdown', onPointerDown);
        effects.forEach(e => e.el.remove());
    };
}
