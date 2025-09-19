// Configuration for TechyFooterBackground
export type Point = { x: number; y: number };

// Single stroke color for all lines (navbar-themed orange)
export const strokeColor = '#ff8c00';

// Category colors for shockwave rings (randomized per ring)
export const shockwaveColors: string[] = [
  '#ff8c00', // primary orange
  '#ff6b35', // orange-salmon
  '#ff4500', // orange-red accent
];

// Debug configuration
export const debug = {
  enabled: false,          // show debug markers in SVG
  logActiveTransitions: false, // log when footer becomes active/inactive
};

// Paths
export const path_main: Point[] = [
  { x: 0, y: 220 },
  { x: 600, y: 220 },
  { x: 600, y: 170 },
  { x: 1200, y: 170 },
];

export const path_sub_depth1: Point[][] = [
  // Subpath A: up then right from lower horizontal
  [ { x: 300, y: 220 }, { x: 300, y: 190 }, { x: 460, y: 190 } ],
  // Subpath B: down then right from upper horizontal
  [ { x: 820, y: 170 }, { x: 820, y: 230 }, { x: 1020, y: 230 } ],
];

// Only A2 and B2 are kept for depth-2 branches
export const path_sub_depth2: Point[][] = [
  // A2 (from Subpath A horizontal): 90° up then right
  [ { x: 380, y: 190 }, { x: 380, y: 175 }, { x: 430, y: 175 } ],
  // B2 (from Subpath B horizontal): 90° up then right
  [ { x: 920, y: 230 }, { x: 920, y: 210 }, { x: 980, y: 210 } ],
];

// Triggers
export const triggers: { point: Point; pathIdx: number; color: string }[] = [
  { point: { x: 300, y: 220 }, pathIdx: 0, color: 'var(--color-category-database)' },
  { point: { x: 820, y: 170 }, pathIdx: 1, color: 'var(--color-category-frontend)' },
];

export const depth2Triggers: Record<number, { point: Point; depth2Idx: number; color: string }[]> = {
  0: [
    { point: { x: 380, y: 190 }, depth2Idx: 0, color: 'var(--color-category-database)' },
  ],
  1: [
    { point: { x: 920, y: 230 }, depth2Idx: 1, color: 'var(--color-category-frontend)' },
  ],
};

// Optimized animation and visual settings
export const settings = {
  // Animation speeds
  speedMain: 0.5,
  speedDepth1: 0.75,
  speedDepth2: 1,
  
  // Performance limits
  maxWalkers: 6, // reduced from 8
  triggerCooldownMs: 900,
  samplesParam: 200, // reduced from 400 for better performance
  
  // Collision detection
  triggerRadiusMainSq: 324, // 18 * 18
  depth2ProximitySq: 36,    // 6 * 6
  
  // Radius settings
  minMainRadius: 3.2,
  minDepth1Radius: 2.6,
  defaultMainRadius: 5,
} as const;

// Visual configuration
export const visual = {
  // Line appearance
  strokeWidthMain: 3,
  strokeWidthD1: 2,
  strokeWidthD2: 1.5,
  opacityMain: 0.9,
  opacityD1: 0.7,
  opacityD2: 0.55,
  inactiveStrokeColor: '#bdbdbd',
  glowStdDeviation: 5,

  // Moving beam dimensions
  mainLength: 28,
  mainThicknessFactor: 1.6,
  mainThicknessMin: 2.5,
  subLengthFactor: 4.2,
  subLengthMin: 10,
  subThicknessFactor: 1.6,
  subThicknessMin: 2,

  // Effects
  shockwave: {
    color: strokeColor,
    startOpacity: 0.95,
    startStrokeWidth: 3,
    growSpeed: 20,
    life: 1.5,
  },
  
  boot: {
    duration: 0.9,
    sweepColor: '#ffffff',
    sweepLength: 60,
    sweepThickness: 6,
    shockwaveAtStart: true,
  },
} as const;
