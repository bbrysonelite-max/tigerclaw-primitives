export const tigerClawBrand = {
  id: "tigerclaw",
  name: "Tiger Claw",
  colors: {
    base: "#0A0A0A",
    surface: "#1A1A1A",
    ink: "#050505",
    orange: "#E8722A",
    green: "#4ADE80",
    text: "#F5F5F5",
    textMuted: "rgba(255, 255, 255, 0.60)",
    textFaint: "rgba(255, 255, 255, 0.35)",
    border: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    display: "Bebas Neue",
    body: "Space Grotesk",
    technical: "IBM Plex Mono",
  },
  usage: {
    orange: "Primary brand, emphasis, motion, and action color.",
    green: "Reserved for success, confirmed states, live indicators, completed progress, and positive proof.",
  },
  tone: ["aggressive", "high-contrast", "neo-brutalist", "mechanical", "direct"],
} as const;

export type TigerClawBrand = typeof tigerClawBrand;
