import { RING, SPARK, FLASH, createSvgElement, randomColor, setAttributes } from './mouseEffects.config';
import type { Effect } from './mouseEffects.types';

function tickEffect(effect: Effect, dt: number): boolean {
    effect.age += dt;
    const progress = Math.min(1, effect.age / effect.life);
    const fade = 1 - progress;

    switch (effect.kind) {
        case 'ring':
            effect.r += effect.vr * dt;
            setAttributes(effect.el, { r: effect.r, opacity: fade, 'stroke-width': Math.max(0, effect.sw * fade) });
            break;

        case 'spark': {
            const drag = 1 - progress * 0.8;
            const tail = SPARK.tail * (1 - progress * 0.5);
            effect.x += effect.vx * dt * drag;
            effect.y += effect.vy * dt * drag;
            setAttributes(effect.el, {
                x1: effect.x - effect.nx * tail, y1: effect.y - effect.ny * tail,
                x2: effect.x, y2: effect.y, opacity: fade,
            });
            break;
        }

        case 'flash':
            setAttributes(effect.el, { r: FLASH.radius * (1 - fade ** 3), opacity: fade * 0.5 });
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

    const onPointerDown = ({ clientX: x, clientY: y }: PointerEvent) => {
        add('circle',
            { cx: x, cy: y, r: 0, fill: FLASH.color, opacity: 0.5, filter: 'url(#mouseGlow)' },
            { kind: 'flash', age: 0, life: FLASH.life },
        );

        for (let i = 0; i < RING.perClick; i++) {
            const strokeWidth = RING.stroke + Math.random() * 2;
            add('circle', {
                cx: x, cy: y, r: 0, fill: 'none',
                stroke: randomColor(), 'stroke-width': strokeWidth,
                opacity: 0.65, filter: 'url(#mouseGlow)',
            }, {
                kind: 'ring', r: 0, sw: strokeWidth,
                vr: RING.speed + (Math.random() - 0.5) * 2 * RING.jitter,
                age: 0, life: RING.life + (Math.random() - 0.5) * RING.lifeJitter,
            });
        }

        for (let i = 0; i < SPARK.count; i++) {
            const angle = (Math.PI * 2 * i) / SPARK.count + Math.random() * 0.5;
            const nx = Math.cos(angle);
            const ny = Math.sin(angle);
            const speed = SPARK.speed * (1 - SPARK.variance + Math.random() * SPARK.variance * 2);
            add('line', {
                x1: x, y1: y, x2: x, y2: y,
                stroke: randomColor(), 'stroke-width': SPARK.stroke,
                'stroke-linecap': 'round', opacity: 0.7, filter: 'url(#mouseGlow)',
            }, {
                kind: 'spark', x, y,
                vx: nx * speed, vy: ny * speed, nx, ny,
                age: 0, life: SPARK.life,
            });
        }
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
