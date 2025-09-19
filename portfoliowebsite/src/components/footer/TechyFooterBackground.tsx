import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  path_main,
  path_sub_depth1,
  path_sub_depth2,
  triggers,
  depth2Triggers,
  settings,
  strokeColor,
  shockwaveColors,
  visual,
  debug,
  type Point,
} from './techyFooter.config';

// Precomputed polyline data for efficient sampling
type PolylineData = {
  points: Point[];
  segLens: number[];
  total: number;
};

// Optimized polyline utilities
const precomputePolyline = (points: Point[]): PolylineData => {
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const len = Math.hypot(dx, dy);
    segLens.push(len);
    total += len;
  }
  return { points, segLens, total };
};

const samplePrecomputed = (data: PolylineData, t: number): Point => {
  const { points, segLens, total } = data;
  if (points.length === 1 || total === 0) return points[0];
  
  const target = t * total;
  let acc = 0;
  
  for (let i = 0; i < segLens.length; i++) {
    const nextAcc = acc + segLens[i];
    if (target <= nextAcc || i === segLens.length - 1) {
      const local = segLens[i] === 0 ? 0 : (target - acc) / segLens[i];
      const p0 = points[i];
      const p1 = points[i + 1];
      return { 
        x: p0.x + (p1.x - p0.x) * local, 
        y: p0.y + (p1.y - p0.y) * local 
      };
    }
    acc = nextAcc;
  }
  return points[points.length - 1];
};

const TechyFooterBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dotRef = useRef<SVGRectElement | null>(null);
  const walkersGroupRef = useRef<SVGGElement | null>(null);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const DEBUG = debug.enabled;

  // Memoize precomputed samplers for performance
  const samplers = useMemo(() => ({
    main: precomputePolyline(path_main),
    depth1: path_sub_depth1.map(precomputePolyline),
    depth2: path_sub_depth2.map(precomputePolyline)
  }), []);

  // Utility function for interpolating on polyline (used in approxParamForPoint)
  const interpolateOnPolyline = useCallback((points: Point[], t: number): Point => {
    if (points.length === 1) return points[0];
    const lens: number[] = [];
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      const len = Math.hypot(dx, dy);
      lens.push(len);
      total += len;
    }
    const target = t * total;
    let acc = 0;
    for (let i = 0; i < lens.length; i++) {
      const nextAcc = acc + lens[i];
      if (target <= nextAcc || i === lens.length - 1) {
        const local = lens[i] === 0 ? 0 : (target - acc) / lens[i];
        const p0 = points[i];
        const p1 = points[i + 1];
        return { x: p0.x + (p1.x - p0.x) * local, y: p0.y + (p1.y - p0.y) * local };
      }
      acc = nextAcc;
    }
    return points[points.length - 1];
  }, []);

  // Utility function for parameter approximation
  const approxParamForPoint = useCallback((pts: Point[], target: Point): { t: number; d2: number } => {
    const S = settings.samplesParam;
    let bestT = 0;
    let bestD2 = Infinity;
    for (let s = 0; s <= S; s++) {
      const t = s / S;
      const p = interpolateOnPolyline(pts, t);
      const d2 = (p.x - target.x) * (p.x - target.x) + (p.y - target.y) * (p.y - target.y);
      if (d2 < bestD2) { 
        bestD2 = d2; 
        bestT = t; 
      }
    }
    return { t: bestT, d2: bestD2 };
  }, [interpolateOnPolyline]);

  // Memoize depth2 trigger parameters
  const depth2TriggerTs = useMemo(() => {
    const result: Record<number, number[]> = {};
    Object.keys(depth2Triggers).forEach(key => {
      const idx = Number(key);
      const list = depth2Triggers[idx] || [];
      result[idx] = list.map(trg => {
        const { t } = approxParamForPoint(path_sub_depth1[idx], trg.point);
        return t;
      });
    });
    return result;
  }, [approxParamForPoint]);

  useEffect(() => {
    const svg = svgRef.current;
    const dot = dotRef.current;
    const group = walkersGroupRef.current;
    const container = containerRef.current;
    if (!svg || !dot || !group || !container) return;

    type SubWalker = {
      t: number;
      speed: number;
      data: PolylineData;
      el: SVGRectElement;
      radius: number;
      subIndex: number; // which path_sub_depth1 index this walker is on
      fired: Set<number>; // which depth2 triggers have been fired for this walker
    };
    const subWalkers: SubWalker[] = [];

    // Shockwave ring effect (no particles)
    type Effect = {
      el: SVGCircleElement;
      x: number;
      y: number;
      r: number;       // current radius
      vr: number;      // radius growth speed px/s
      age: number;     // seconds
      life: number;    // seconds
      sw: number;      // initial stroke width
    };
    const effects: Effect[] = [];

    const spawnExplosion = (pt: { x: number; y: number }, _color: string) => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      el.setAttribute('cx', pt.x.toString());
      el.setAttribute('cy', pt.y.toString());
      el.setAttribute('r', '0');
      el.setAttribute('fill', 'none');
      const ringColor = shockwaveColors[(Math.random() * shockwaveColors.length) | 0] || visual.shockwave.color;
      el.setAttribute('stroke', ringColor);
      el.setAttribute('stroke-width', String(visual.shockwave.startStrokeWidth));
      el.setAttribute('filter', 'url(#lightGlow)');
      el.setAttribute('opacity', String(visual.shockwave.startOpacity));
      el.setAttribute('style', 'mix-blend-mode: screen;');
      group.appendChild(el);
      effects.push({ el, x: pt.x, y: pt.y, r: 0, vr: visual.shockwave.growSpeed, age: 0, life: visual.shockwave.life, sw: visual.shockwave.startStrokeWidth });
    };


    // Junction triggers and cooldown from config
    const triggerCooldownMs = settings.triggerCooldownMs; // prevent rapid re-trigger
    const lastTriggerAt: Record<number, number> = { 0: -Infinity, 1: -Infinity };

    let t = 0; // param along main path
    let speed = settings.speedMain; // cycles per second
    let last = performance.now();
    // no FPS throttling per user request
    let raf = 0;
    let running = false;
    let booting = false;
    let bootRaf = 0;
    let bootEl: SVGRectElement | null = null;
    let mainRadius = 5; // persistent radius for the main dot

    const MAX_WALKERS = settings.maxWalkers;

    const spawnSubWalker = (idx: number, color: string) => {
      if (idx < 0 || idx >= path_sub_depth1.length) return; // invalid mapping
      if (subWalkers.length >= MAX_WALKERS) return; // avoid runaway spawns
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      // render as elongated light
      el.setAttribute('fill', '#ffffff');
      el.setAttribute('filter', 'url(#lightGlow)');
      el.setAttribute('opacity', '0.9');
      el.setAttribute('style', 'mix-blend-mode: screen;');
      // place at start of subpath immediately
      const start = samplePrecomputed(samplers.depth1[idx], 0);
      const h = 4 * 1.6; // size based on initial radius (4)
      const w = 4 * 4.2;
      el.setAttribute('x', (start.x - w / 2).toString());
      el.setAttribute('y', (start.y - h / 2).toString());
      el.setAttribute('width', w.toString());
      el.setAttribute('height', h.toString());
      el.setAttribute('rx', (h / 2).toString());
      el.setAttribute('ry', (h / 2).toString());
      group.appendChild(el);
      subWalkers.push({ t: 0, speed: settings.speedDepth1, data: samplers.depth1[idx], el, radius: 4, subIndex: idx, fired: new Set() });
    };

    // Map subpath index -> depth2 trigger points and their path_sub_depth2 index
    // depth2Triggers imported from config

    // Utility functions
    const dist2 = (a: Point, b: Point) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return dx * dx + dy * dy;
    };

    const angleAt = (data: PolylineData, t: number): number => {
      const eps = 0.002;
      const t1 = Math.max(0, Math.min(1, t));
      const t2 = Math.max(0, Math.min(1, t1 + eps));
      const p1 = samplePrecomputed(data, t1);
      const p2 = samplePrecomputed(data, t2);
      return Math.atan2(p2.y - p1.y, p2.x - p1.x) || 0;
    };

    // Spawn a depth2 walker along path_sub_depth2
    const spawnDepth2Walker = (depth2Idx: number, color: string, anchor?: Point) => {
      if (depth2Idx < 0 || depth2Idx >= path_sub_depth2.length) return; // invalid mapping
      if (subWalkers.length >= MAX_WALKERS) return; // avoid runaway spawns
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      // render as elongated light instead of solid circle
      el.setAttribute('fill', '#ffffff');
      el.setAttribute('filter', 'url(#lightGlow)');
      el.setAttribute('opacity', '0.9');
      el.setAttribute('style', 'mix-blend-mode: screen;');
      // Start at beginning of depth2 path (simplified)
      const t0 = 0;
      const d2data = samplers.depth2[depth2Idx];
      const start = samplePrecomputed(d2data, t0);
      const h = 3.5 * 1.6;
      const w = 3.5 * 4.2;
      el.setAttribute('x', (start.x - w / 2).toString());
      el.setAttribute('y', (start.y - h / 2).toString());
      el.setAttribute('width', w.toString());
      el.setAttribute('height', h.toString());
      el.setAttribute('rx', (h / 2).toString());
      el.setAttribute('ry', (h / 2).toString());
      group.appendChild(el);
      // Reuse SubWalker shape but without further triggers (set subIndex = -1)
      subWalkers.push({ t: t0, speed: settings.speedDepth2, data: d2data, el, radius: 3.5, subIndex: -1, fired: new Set() });
    };

    const animate = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const step = dt;

      // advance main dot and detect wrap
      const nt = t + step * speed;
      const wrapped = nt > 1;
      t = wrapped ? nt - 1 : nt;
      if (wrapped) {
        // reset main size after completing a full loop
        mainRadius = 5;
      }
      const p = samplePrecomputed(samplers.main, t);
      const ang = angleAt(samplers.main, t) * 180 / Math.PI;
      const mainW = visual.mainLength; // beam length
      const mainH = Math.max(visual.mainThicknessMin, mainRadius * visual.mainThicknessFactor); // beam thickness reacts to radius
      dot.setAttribute('x', (p.x - mainW / 2).toString());
      dot.setAttribute('y', (p.y - mainH / 2).toString());
      dot.setAttribute('width', mainW.toString());
      dot.setAttribute('height', mainH.toString());
      dot.setAttribute('rx', (mainH / 2).toString());
      dot.setAttribute('ry', (mainH / 2).toString());
      dot.setAttribute('transform', `rotate(${ang} ${p.x} ${p.y})`);

      // check triggers near branch points
      for (let i = 0; i < triggers.length; i++) {
        const trg = triggers[i];
        if (now - lastTriggerAt[i] < triggerCooldownMs) continue;
        if (dist2(p, trg.point) < settings.triggerRadiusMainSq) { // within radius
          lastTriggerAt[i] = now;
          // reduce size a little and hold
          mainRadius = Math.max(settings.minMainRadius, mainRadius - 0.6);
          spawnSubWalker(trg.pathIdx, trg.color);
        }
      }

      // no 'r' for rect; thickness already set via mainH

      // advance sub-walkers & cull expired
      for (let i = subWalkers.length - 1; i >= 0; i--) {
        const w = subWalkers[i];
        const prevT = w.t;
        w.t += step * w.speed;
        if (w.t >= 1) {
          // reached end of subpath: spawn explosion and remove
          const endPt = samplePrecomputed(w.data, 1);
          spawnExplosion(endPt, w.el.getAttribute('fill') || strokeColor);
          w.el.remove();
          subWalkers.splice(i, 1);
          continue;
        }
        const sp = samplePrecomputed(w.data, w.t);
        const angW = angleAt(w.data, w.t) * 180 / Math.PI;
        const h = Math.max(visual.subThicknessMin, w.radius * visual.subThicknessFactor);
        const wlen = Math.max(visual.subLengthMin, w.radius * visual.subLengthFactor);
        w.el.setAttribute('x', (sp.x - wlen / 2).toString());
        w.el.setAttribute('y', (sp.y - h / 2).toString());
        w.el.setAttribute('width', wlen.toString());
        w.el.setAttribute('height', h.toString());
        w.el.setAttribute('rx', (h / 2).toString());
        w.el.setAttribute('ry', (h / 2).toString());
        w.el.setAttribute('transform', `rotate(${angW} ${sp.x} ${sp.y})`);

        // If this walker is a depth1 walker (subIndex >= 0), check depth2 triggers
        if (w.subIndex >= 0 && depth2Triggers[w.subIndex]) {
          const trgList = depth2Triggers[w.subIndex];
          const tsList = depth2TriggerTs[w.subIndex] || [];
          for (let j = 0; j < trgList.length; j++) {
            if (w.fired.has(j)) continue;
            const trigT = tsList[j] ?? 1.1; // invalid => won't trigger
            const trg = trgList[j];
            // require both param crossing AND spatial proximity at this frame (<= 6px)
            const closeNow = (sp.x - trg.point.x) * (sp.x - trg.point.x) + (sp.y - trg.point.y) * (sp.y - trg.point.y) <= settings.depth2ProximitySq;
            if (prevT < trigT && w.t >= trigT && closeNow) {
              // Fire once when passing the trigger parameter
              w.fired.add(j);
              w.radius = Math.max(settings.minDepth1Radius, w.radius - 0.6);
              // Anchor depth2 to the actual junction point
              spawnDepth2Walker(trg.depth2Idx, trg.color, trg.point);
            }
          }
        }
      }

      // update effects
      for (let i = effects.length - 1; i >= 0; i--) {
        const e = effects[i];
        e.age += step;
        const k = Math.min(1, e.age / e.life);
        e.r += e.vr * step;
        const opacity = (1 - k);
        const sw = Math.max(0, e.sw * (1 - k));
        e.el.setAttribute('r', e.r.toString());
        e.el.setAttribute('opacity', opacity.toString());
        e.el.setAttribute('stroke-width', sw.toString());
        if (e.age >= e.life) {
          e.el.remove();
          effects.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(animate);
    };

    const start = () => {
      if (running) return;
      running = true;
      // ensure main beam is visible when animation is running
      dot.style.visibility = 'visible';
      raf = requestAnimationFrame(ts => {
        last = ts;
        raf = requestAnimationFrame(animate);
      });
    };

    const stopAndReset = () => {
      if (running) {
        cancelAnimationFrame(raf);
        running = false;
      }
      if (booting) {
        cancelAnimationFrame(bootRaf);
        booting = false;
      }
      if (bootEl) {
        bootEl.remove();
        bootEl = null;
      }
      // reset animation state
      t = 0;
      mainRadius = settings.defaultMainRadius;
      // reset trigger timestamps (cooldowns)
      lastTriggerAt[0] = -Infinity;
      lastTriggerAt[1] = -Infinity;
      // remove walkers
      for (let i = subWalkers.length - 1; i >= 0; i--) {
        subWalkers[i].el.remove();
      }
      subWalkers.length = 0;
      // remove effects
      for (let i = effects.length - 1; i >= 0; i--) {
        effects[i].el.remove();
      }
      effects.length = 0;
      // place main beam at start and HIDE it (footer inactive)
      const p0 = samplePrecomputed(samplers.main, 0);
      const ang0 = 0;
      const mainW = visual.mainLength;
      const mainH = Math.max(visual.mainThicknessMin, mainRadius * visual.mainThicknessFactor);
      dot.setAttribute('x', (p0.x - mainW / 2).toString());
      dot.setAttribute('y', (p0.y - mainH / 2).toString());
      dot.setAttribute('width', mainW.toString());
      dot.setAttribute('height', mainH.toString());
      dot.setAttribute('rx', (mainH / 2).toString());
      dot.setAttribute('ry', (mainH / 2).toString());
      dot.setAttribute('transform', `rotate(${ang0} ${p0.x} ${p0.y})`);
      dot.style.visibility = 'hidden';
    };

    // Boot sweep along the main path
    const startBoot = () => {
      if (booting || running) return;
      booting = true;
      // HIDE main beam during boot, then show after
      dot.style.visibility = 'hidden';
      // create sweep rect
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      el.setAttribute('fill', visual.boot.sweepColor);
      el.setAttribute('filter', 'url(#lightGlow)');
      el.setAttribute('opacity', '0.95');
      el.setAttribute('style', 'mix-blend-mode: screen;');
      group.appendChild(el);
      bootEl = el;

      const dur = visual.boot.duration;
      let tBoot = 0;
      let lastBoot = performance.now();

      const stepBoot = (now: number) => {
        const dtb = (now - lastBoot) / 1000;
        lastBoot = now;
        tBoot += dtb / dur;
        const tb = Math.min(1, tBoot);
        const p = samplePrecomputed(samplers.main, tb);
        const ang = angleAt(samplers.main, tb) * 180 / Math.PI;
        const w = visual.boot.sweepLength;
        const h = visual.boot.sweepThickness;
        el.setAttribute('x', (p.x - w / 2).toString());
        el.setAttribute('y', (p.y - h / 2).toString());
        el.setAttribute('width', String(w));
        el.setAttribute('height', String(h));
        el.setAttribute('rx', String(h / 2));
        el.setAttribute('ry', String(h / 2));
        el.setAttribute('transform', `rotate(${ang} ${p.x} ${p.y})`);

        if (tb < 1) {
          bootRaf = requestAnimationFrame(stepBoot);
        } else {
          // optional ring at start
          if (visual.boot.shockwaveAtStart) {
            const pStart = samplePrecomputed(samplers.main, 0);
            spawnExplosion(pStart, strokeColor);
          }
          // remove boot element and start normal animation
          el.remove();
          bootEl = null;
          booting = false;
          dot.style.visibility = 'visible';
          start();
        }
      };

      bootRaf = requestAnimationFrame((ts) => {
        lastBoot = ts;
        bootRaf = requestAnimationFrame(stepBoot);
      });
    };

    // Intersection/in-viewport detection to toggle activity
    const computeInView = (): boolean => {
      const el = container;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      if (rect.width === 0 || rect.height === 0) return false;
      const interLeft = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0));
      const interTop = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const interArea = interLeft * interTop;
      const area = rect.width * rect.height;
      const ratio = area > 0 ? interArea / area : 0;
      return ratio >= 0.2; // require at least 20% visible
    };

    const applyVisibility = (inView: boolean) => {
      if (inView === activeRef.current) return; // no transition
      activeRef.current = inView;
      if (debug.logActiveTransitions) {
        // eslint-disable-next-line no-console
        console.log('[FooterBG] visibility changed:', inView ? 'ACTIVE' : 'INACTIVE');
      }
      setActive(inView);
      if (inView) startBoot(); else stopAndReset();
    };

    const io = new IntersectionObserver(
      () => {
        applyVisibility(computeInView());
      },
      { root: null, threshold: [0, 0.2, 0.5, 1], rootMargin: '0px' }
    );
    io.observe(container);

    // Manual fallback: scroll/resize handlers (debounced via rAF)
    let pending = false;
    const onTick = () => {
      pending = false;
      applyVisibility(computeInView());
    };
    const onChange = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(onTick);
    };
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);

    // Initial check to avoid auto-start when offscreen
    onChange();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onChange as any);
      window.removeEventListener('resize', onChange as any);
      cancelAnimationFrame(raf);
      // cleanup DOM nodes
      for (let i = subWalkers.length - 1; i >= 0; i--) subWalkers[i].el.remove();
      for (let i = effects.length - 1; i >= 0; i--) effects[i].el.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    >
      <svg
        ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="footer-tech-bg"
      >
      <defs>
        {/* Soft glow for moving lights */}
        <filter id="lightGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={visual.glowStdDeviation} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* path_main: Single L-shaped main line */}
      <polyline
        points={path_main.map(p => `${p.x},${p.y}`).join(' ')}
        stroke={active ? strokeColor : visual.inactiveStrokeColor}
        strokeWidth={visual.strokeWidthMain}
        fill="none"
        opacity={visual.opacityMain}
      />

      {/* path_sub_depth1 as solid lines */}
      <g fill="none">
        {path_sub_depth1.map((pts, idx) => (
          <polyline
            key={idx}
            points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            stroke={active ? strokeColor : visual.inactiveStrokeColor}
            strokeWidth={visual.strokeWidthD1}
            opacity={DEBUG ? 0.95 : visual.opacityD1}
          />
        ))}
      </g>

      {/* path_sub_depth2 as solid lines */}
      <g fill="none">
        {path_sub_depth2.map((pts, idx) => (
          <polyline
            key={idx}
            points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            stroke={active ? strokeColor : visual.inactiveStrokeColor}
            strokeWidth={visual.strokeWidthD2}
            opacity={DEBUG ? 0.9 : visual.opacityD2}
          />
        ))}
      </g>

      {/* Subpath walkers container (managed via DOM) */}
      <g ref={walkersGroupRef} />

      {/* DEBUG markers for triggers */}
      {DEBUG && (
        <g>
          {/* main-depth1 junctions */}
          {[
            { x: 300, y: 220, label: 'MAIN→D1 A' },
            { x: 820, y: 170, label: 'MAIN→D1 B' },
          ].map((p, i) => (
            <g key={`mtrg-${i}`}>
              <circle cx={p.x} cy={p.y} r={3} fill="#ff9800" />
              <text x={p.x + 6} y={p.y - 6} fontSize="10" fill="#ff9800">{p.label}</text>
            </g>
          ))}
          {/* depth1-depth2 junctions (A2, B2 only) */}
          {[
            { x: 380, y: 190, label: 'D1→D2 A2' },
            { x: 920, y: 230, label: 'D1→D2 B2' },
          ].map((p, i) => (
            <g key={`d2trg-${i}`}>
              <circle cx={p.x} cy={p.y} r={3} fill="#00c853" />
              <text x={p.x + 6} y={p.y - 6} fontSize="10" fill="#00c853">{p.label}</text>
            </g>
          ))}
        </g>
      )}

      {/* Moving light (main path) */}
      <rect
        ref={dotRef}
        x={0}
        y={0}
        width={28}
        height={6}
        rx={3}
        ry={3}
        fill="#ffffff"
        filter="url(#lightGlow)"
        opacity="0.9"
        style={{ mixBlendMode: 'screen' as any }}
      />
      </svg>
    </div>
  );
};

export default TechyFooterBackground;
