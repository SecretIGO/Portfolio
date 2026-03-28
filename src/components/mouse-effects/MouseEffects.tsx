import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
                    {/* Single ring glow — soft outer bloom + crisp inner edge */}
                    <filter id="ringGlow" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation={6} result="softBlur" />
                        <feGaussianBlur stdDeviation={1.5} in="SourceGraphic" result="crispBlur" />
                        <feMerge>
                            <feMergeNode in="softBlur" />
                            <feMergeNode in="crispBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g ref={groupRef} />
            </svg>
        </div>,
        document.body,
    );
};

export default MouseEffects;