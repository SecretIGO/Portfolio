interface EffectBase {
    el: SVGElement;
    age: number;
    life: number;
}

export interface RingEffect extends EffectBase {
    kind: 'ring';
    r: number;
    vr: number;
    sw: number;
}

export interface SparkEffect extends EffectBase {
    kind: 'spark';
    x: number;
    y: number;
    vx: number;
    vy: number;
    nx: number;
    ny: number;
}

export interface FlashEffect extends EffectBase { kind: 'flash' }

export type Effect = RingEffect | SparkEffect | FlashEffect;
