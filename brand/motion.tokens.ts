export const tigerClawMotion = {
  fps: 30,
  frames: {
    snap: 6,
    fastEntrance: 10,
    standardEntrance: 14,
    fullReveal: 18,
    fastExit: 8,
    logoImpactMin: 20,
    logoImpactMax: 24,
    transitionMax: 15,
  },
  easing: {
    decisive: [0.16, 1, 0.3, 1] as const,
    linear: [0, 0, 1, 1] as const,
  },
  rules: {
    deterministic: true,
    cssAnimationsForbidden: true,
    tailwindAnimationUtilitiesForbidden: true,
    bouncePolicy: "Use only for intentional impact. Never use playful or cartoon motion.",
  },
} as const;

export type TigerClawMotion = typeof tigerClawMotion;
