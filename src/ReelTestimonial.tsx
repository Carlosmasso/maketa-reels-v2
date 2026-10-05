import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS, MONO, Header, Kicker, Rise, EndCard, io } from "./brand";
import { Reel, Scene, endFrames, readFrames, reelDuration } from "./reel";
import { Avatar, Person } from "./people";
import { BrollBg, brollFor } from "./media";

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
  person: Person;
  cta: string;
  broll?: string;
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
  person: { name: "Laura Gil", role: "Boutique Verde", accent: "#E2725B" },
  cta: "¿Tu negocio sigue vendiendo por DM?",
  broll: "boutique",
};

const Hook: React.FC<{ c: TestimonialConfig }> = ({ c }) => {
  const clip = c.broll ? brollFor(c.broll) : undefined;
  return (
    <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
      {clip ? <BrollBg src={clip} /> : null}
      <Header tag={TAG} dark={!!clip} />
      <Rise at={0}>
        <Kicker color={clip ? C.blueSoft : c.accent}>{c.sector}</Kicker>
      </Rise>
      <Rise at={5}>
        <div style={{ fontFamily: SANS, fontSize: 120, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: clip ? C.white : C.dark, marginTop: 24 }}>
          {c.hook}
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

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
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 84, lineHeight: 1.15, letterSpacing: -3, color: C.dark }}>
        “{c.quote}”
      </div>
    </Rise>
    <Rise at={14}>
      <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 50 }}>
        <Avatar person={c.person} size={120} />
        <div style={{ fontFamily: SANS }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: C.dark }}>{c.person.name}</div>
          <div style={{ fontSize: 34, fontWeight: 500, color: c.accent }}>{c.person.role}</div>
        </div>
      </div>
    </Rise>
  </AbsoluteFill>
);

const scenes = (c: TestimonialConfig): Scene[] => [
  { name: "Hook", dur: Math.max(c.broll && brollFor(c.broll) ? 95 : 75, readFrames(`${c.sector} ${c.hook}`)), el: <Hook c={c} /> },
  { name: "Antes", dur: readFrames(c.before, 30), el: <Before c={c} /> },
  { name: "Resultado", dur: readFrames(c.metricLabel, 60), el: <Result c={c} /> },
  { name: "Cita", dur: readFrames(`${c.quote} ${c.person.name}`, 70), el: <Quote c={c} />, via: c.person },
  { name: "Cierre", dur: endFrames(c.cta, "Diseña tu web gratis, sin registro."), el: <EndCard title={c.cta} sub="Diseña tu web gratis, sin registro." /> },
];

export const TESTIMONIAL_DURATION = reelDuration(scenes(EJEMPLO_TESTIMONIAL));

export const ReelTestimonial: React.FC<{ config: TestimonialConfig }> = ({ config }) => (
  <Reel scenes={scenes(config)} />
);
