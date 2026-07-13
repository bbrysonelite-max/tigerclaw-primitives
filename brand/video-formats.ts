export const tigerClawVideoFormats = {
  "youtube-16x9": {
    width: 1920,
    height: 1080,
    fps: 30,
    kind: "video",
  },
  "vertical-9x16": {
    width: 1080,
    height: 1920,
    fps: 30,
    kind: "video",
  },
  "thumbnail-16x9": {
    width: 1280,
    height: 720,
    fps: 30,
    kind: "still",
  },
} as const;

export type TigerClawVideoFormatId = keyof typeof tigerClawVideoFormats;
export type TigerClawVideoFormat = (typeof tigerClawVideoFormats)[TigerClawVideoFormatId];
