import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS, SERIF, MONO, Header, Kicker, Rise, EndCard, Reel, Scene, reelDuration, io } from "./brand";

const TAG = "CASO REAL";

export type TestimonialConfig = {
  sector: string;
  accent: string;
  hook: string;
  before: string;
  metric: number;
  metricSuffix: string;
  metricLabel: string;
  quote: string;
  author: string;
  cta: string;
};

// Placeholder: replace with a real client before publishing (fake reviews are illegal in the EU)
export const EJEMPLO_TESTIMONIAL: TestimonialConfig = {
  sector: "Tienda de ropa",
  accent: "#E2725B",
  hook: "Vendía solo en la tienda física.",
  before: "Los clientes preguntaban por Instagram si había tallas. Cada venta era un mensaje.",
  metric: 40,
  metricSuffix: "%",
  metricLabel: "de las ventas ya llegan desde la web",
  quote: "Ahora el catálogo trabaja por mí mientras atiendo la tienda.",
  author: "Laura · Boutique Verde",
  cta: "¿Tu negocio sigue vendiendo por DM?",
};

const Hook: React.FC<{ c: TestimonialConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} />
    <Rise at={0}>
      <Kicker color={c.accent}>{c.sector}</Kicker>
    </Rise>
    <Rise at={5}>
      <div style={{ fontFamily: SERIF, fontSize: 120, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3, color: C.dark, marginTop: 24 }}>
        {c.hook}
      </div>
    </Rise>
  </AbsoluteFill>
);

const Before: React.FC<{ c: TestimonialConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.white, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} />
    <Rise at={0}>
      <Kicker color={C.grey}>Antes</Kicker>
    </Rise>
    <Rise at={6}>
      <div style={{ fontFamily: SANS, fontSize: 64, fontWeight: 600, lineHeight: 1.25, color: C.ink, marginTop: 24 }}>{c.before}</div>
    </Rise>
  </AbsoluteFill>
);

const Result: React.FC<{ c: TestimonialConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.dark, padding: "0 80px", justifyContent: "center" }}>
      <Header tag={TAG} dark />
      <Rise at={0}>
        <Kicker color={C.blueSoft}>Después</Kicker>
      </Rise>
      <div style={{ fontFamily: MONO, fontSize: 280, fontWeight: 700, lineHeight: 1, letterSpacing: -10, color: c.accent, marginTop: 20 }}>
        {Math.round(io(f, [4, 40], [0, c.metric]))}
        {c.metricSuffix}
      </div>
      <Rise at={20}>
        <div style={{ fontFamily: SANS, fontSize: 60, fontWeight: 600, lineHeight: 1.2, color: C.white, marginTop: 20 }}>{c.metricLabel}</div>
      </Rise>
    </AbsoluteFill>
  );
};

const Quote: React.FC<{ c: TestimonialConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} />
    <Rise at={0}>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 84, lineHeight: 1.15, letterSpacing: -1.5, color: C.dark }}>
        “{c.quote}”
      </div>
    </Rise>
    <Rise at={14}>
      <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 700, color: c.accent, marginTop: 40 }}>— {c.author}</div>
    </Rise>
  </AbsoluteFill>
);

const scenes = (c: TestimonialConfig): Scene[] => [
  { name: "Hook", dur: 75, el: <Hook c={c} /> },
  { name: "Antes", dur: 100, el: <Before c={c} /> },
  { name: "Resultado", dur: 100, el: <Result c={c} /> },
  { name: "Cita", dur: 110, el: <Quote c={c} /> },
  { name: "Cierre", dur: 110, el: <EndCard title={c.cta} sub="Diseña tu web gratis, sin registro." /> },
];

export const TESTIMONIAL_DURATION = reelDuration(scenes(EJEMPLO_TESTIMONIAL));

export const ReelTestimonial: React.FC<{ config: TestimonialConfig }> = ({ config }) => (
  <Reel scenes={scenes(config)} />
);
