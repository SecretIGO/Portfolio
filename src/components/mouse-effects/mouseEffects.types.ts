interface EffectBase {
    el: SVGElement;
    age: number;
    life: number;
}

export interface RingEffect extends EffectBase {
    kind: 'ring';
    currentRadius: number;
    maxRadius: number;
    strokeWidth: number;
    peakOpacity: number;
}

export interface FlashEffect extends EffectBase { kind: 'flash' }

export type Effect = RingEffect | FlashEffect;
