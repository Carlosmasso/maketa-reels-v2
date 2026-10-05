import React from "react";
import { AbsoluteFill, OffthreadVideo, getStaticFiles, staticFile } from "remotion";
import { C } from "./brand";

// Returns the path only if the file is in public/, so missing assets fall back instead of breaking the render
export const asset = (path: string | undefined) =>
  path && getStaticFiles().some((f) => f.name === path) ? path : undefined;

export const brollFor = (sector: string) => asset(`broll/${sector}.mp4`);
// Pexels photo served from their CDN (ID = number at the end of pexels.com/photo/<slug>-<ID>/)
export const pexelsPhoto = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** Full-bleed muted clip with a dark gradient so white text on top stays legible */
export const BrollBg: React.FC<{ src: string; dim?: number }> = ({ src, dim = 0.55 }) => (
  <AbsoluteFill style={{ background: C.dark }}>
    <OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(22,26,48,${dim * 0.6}) 0%, rgba(22,26,48,${dim}) 55%, rgba(22,26,48,${Math.min(1, dim + 0.35)}) 100%)` }} />
  </AbsoluteFill>
);
