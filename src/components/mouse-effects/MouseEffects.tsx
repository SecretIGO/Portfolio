import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { GLOW_BLUR } from './mouseEffects.config';
import { startEffectEngine } from './mouseEffects.engine';

const MouseEffects = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const groupRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (!groupRef.current) return;
        const stop = startEffectEngine(groupRef.current, () => svgRef.current);
        return stop;
    }, []);

    return createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999, pointerEvents: 'none' }} aria-hidden="true">
            <svg ref={svgRef} width="100%" height="100%" preserveAspectRatio="none">
                <defs>
                    <filter id="mouseGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation={GLOW_BLUR} result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                <g ref={groupRef} />
            </svg>
        </div>,
        document.body,
    );
};

export default MouseEffects;