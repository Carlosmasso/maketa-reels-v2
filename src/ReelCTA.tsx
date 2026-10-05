import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS, Header, Rise, EndCard, Reel, Scene, reelDuration, io } from "./brand";

export type CTAConfig = {
  lines: string[];
  highlight: string;
  title: string;
  sub: string;
};

export const EJEMPLO_CTA: CTAConfig = {
  lines: ["Sin plantillas.", "Sin registro.", "Sin saber de código."],
  highlight: "Tú eliges cómo es.",
  title: "Empieza ahora.",
  sub: "Webs desde 249 €. Diseñarla es gratis.",
};

const Lines: React.FC<{ c: CTAConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  const last = c.lines.length * 14;
  return (
    <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
      <Header tag="" />
      {c.lines.map((t, i) => (
        <Rise key={t} at={i * 14}>
          <div style={{ fontFamily: SANS, fontSize: 76, fontWeight: 700, lineHeight: 1.3, letterSpacing: -2, color: C.grey }}>{t}</div>
        </Rise>
      ))}
      <div
        style={{
          fontFamily: SANS,
          fontSize: 120,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -3,
          color: C.blue,
          marginTop: 40,
          opacity: io(f, [last, last + 8], [0, 1]),
          scale: io(f, [last, last + 16], [1.15, 1]),
          transformOrigin: "left center",
        }}
      >
        {c.highlight}
      </div>
    </AbsoluteFill>
  );
};

const scenes = (c: CTAConfig): Scene[] => [
  { name: "Mensajes", dur: 110, el: <Lines c={c} /> },
  { name: "Cierre", dur: 110, el: <EndCard title={c.title} sub={c.sub} /> },
];

export const CTA_DURATION = reelDuration(scenes(EJEMPLO_CTA));

export const ReelCTA: React.FC<{ config: CTAConfig }> = ({ config }) => <Reel scenes={scenes(config)} />;
