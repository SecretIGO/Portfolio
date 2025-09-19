import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { visual, shockwaveColors } from '../footer/techyFooter.config';

/**
 * MouseEffects
 * - Full-screen overlay that listens for clicks anywhere on the page
 * - Spawns shockwave rings at the click location using the same tuning as TechyFooterBackground
 * - No pointer capture; it does not interfere with normal interactions
 */
const MouseEffects: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const groupRef = useRef<SVGGElement | null>(null);
  const rafRef = useRef<number>(0);

  type Effect = {
    el: SVGCircleElement;
    x: number;
    y: number;
    r: number;      // current radius
    vr: number;     // radius growth speed px/s
    age: number;    // seconds
    life: number;   // seconds
    sw: number;     // initial stroke width
  };
  const effectsRef = useRef<Effect[]>([]);
  const lastRef = useRef<number>(0);

  // Keep SVG viewBox synced to viewport
  const syncViewBox = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  };

  const spawnShockwave = (x: number, y: number) => {
    const svg = svgRef.current;
    const group = groupRef.current;
    if (!svg || !group) return;

    const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.setAttribute('cx', String(x));
    el.setAttribute('cy', String(y));
    el.setAttribute('r', '0');
    el.setAttribute('fill', 'none');
    const ringColor = shockwaveColors[(Math.random() * shockwaveColors.length) | 0] || visual.shockwave.color;
    el.setAttribute('stroke', ringColor);
    // Make the ring more visible globally
    const sw = Math.max(visual.shockwave.startStrokeWidth, 4);
    el.setAttribute('stroke-width', String(sw));
    el.setAttribute('opacity', '1');
    el.setAttribute('filter', 'url(#mouseLightGlow)');
    // Use normal blend mode for better visibility on light backgrounds
    el.setAttribute('style', 'mix-blend-mode: normal;');
    group.appendChild(el);

    effectsRef.current.push({
      el,
      x,
      y,
      r: 0,
      vr: visual.shockwave.growSpeed,
      age: 0,
      life: visual.shockwave.life,
      sw: visual.shockwave.startStrokeWidth,
    });
  };

  const onPointer = (e: MouseEvent | PointerEvent | TouchEvent) => {
    // Use viewport coords directly: viewBox == window size (synced), so 1:1 mapping
    // Support both mouse and pointer events
    const anyE = e as any;
    const x = anyE.clientX ?? (anyE.touches && anyE.touches[0]?.clientX);
    const y = anyE.clientY ?? (anyE.touches && anyE.touches[0]?.clientY);
    if (typeof x === 'number' && typeof y === 'number') {
      // eslint-disable-next-line no-console
      console.log('[MouseEffects] pointerdown/click @', x, y);
      spawnShockwave(x, y);
    }
  };

  const animate = (now: number) => {
    const last = lastRef.current || now;
    const dt = (now - last) / 1000;
    lastRef.current = now;

    const effects = effectsRef.current;
    for (let i = effects.length - 1; i >= 0; i--) {
      const e = effects[i];
      e.age += dt;
      const k = Math.min(1, e.age / e.life);
      e.r += e.vr * dt;
      const opacity = 1 - k;
      const sw = Math.max(0, e.sw * (1 - k));
      e.el.setAttribute('r', e.r.toString());
      e.el.setAttribute('opacity', opacity.toString());
      e.el.setAttribute('stroke-width', sw.toString());
      if (e.age >= e.life) {
        e.el.remove();
        effects.splice(i, 1);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[MouseEffects] mounted');
    const onResize = () => syncViewBox();
    // Defer initial sync to ensure the SVG ref is attached (StrictMode safe)
    const syncRaf = requestAnimationFrame(syncViewBox);
    window.addEventListener('resize', onResize);

    // Ensure initial viewBox sync both immediately and in next frame
    syncViewBox();
    // Start RAF loop
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);

    // Listen globally for interactions – pointerdown only to avoid duplicate (click) firing on mouseup
    window.addEventListener('pointerdown', onPointer as any, { passive: true });

    // Small test ring after mount to verify overlay is rendering
    const t = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('[MouseEffects] test ring spawn');
      spawnShockwave(Math.max(60, window.innerWidth - 80), 60);
    }, 600);
    (window as any).__mouseEffectsTestTimeout = t;

    return () => {
      cancelAnimationFrame(syncRaf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', onPointer as any);
      cancelAnimationFrame(rafRef.current);
      if ((window as any).__mouseEffectsTestTimeout) {
        clearTimeout((window as any).__mouseEffectsTestTimeout);
        delete (window as any).__mouseEffectsTestTimeout;
      }
      // cleanup leftover circles
      const effects = effectsRef.current;
      for (let i = effects.length - 1; i >= 0; i--) effects[i].el.remove();
      effectsRef.current.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 9999999999, pointerEvents: 'none', background: 'rgba(255,0,0,0.02)' }}
      aria-hidden="true"
    >
      <svg ref={svgRef} width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <filter id="mouseLightGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={visual.glowStdDeviation} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g ref={groupRef} />
      </svg>
    </div>,
    document.body
  );
};

export default MouseEffects;
