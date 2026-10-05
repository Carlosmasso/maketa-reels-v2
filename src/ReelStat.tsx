import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS, MONO, Header, Kicker, Rise, EndCard, Reel, Scene, reelDuration, io } from "./brand";

const TAG = "EL DATO";

export type StatConfig = {
  hook: string;
  value: number;
  suffix: string;
  label: string;
  source: string;
  punch: string;
  cta: string;
};

// Always cite a verifiable source: a made-up stat destroys trust
export const EJEMPLO_STAT: StatConfig = {
  hook: "¿Cuánto espera alguien a que cargue tu web?",
  value: 53,
  suffix: "%",
  label: "abandona una web móvil si tarda más de 3 segundos.",
  source: "Fuente: Google / SOASTA",
  punch: "Una web lenta es una tienda con la persiana a medio bajar.",
  cta: "Webs ligeras por diseño.",
};

const Hook: React.FC<{ c: StatConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} />
    <Rise at={0}>
      <div style={{ fontFamily: SANS, fontSize: 116, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: C.dark }}>{c.hook}</div>
    </Rise>
  </AbsoluteFill>
);

const Stat: React.FC<{ c: StatConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.dark, padding: "0 80px", justifyContent: "center" }}>
      <Header tag={TAG} dark />
      <div style={{ fontFamily: MONO, fontSize: 380, fontWeight: 700, lineHeight: 1, letterSpacing: -16, color: C.white }}>
        {Math.round(io(f, [0, 36], [0, c.value]))}
        <span style={{ color: C.blueSoft }}>{c.suffix}</span>
      </div>
      <Rise at={24}>
        <div style={{ fontFamily: SANS, fontSize: 62, fontWeight: 600, lineHeight: 1.2, color: C.white, marginTop: 20 }}>{c.label}</div>
      </Rise>
      <Rise at={40} style={{ position: "absolute", bottom: 200, left: 80 }}>
        <div style={{ fontFamily: MONO, fontSize: 28, fontWeight: 500, color: C.grey }}>{c.source}</div>
      </Rise>
    </AbsoluteFill>
  );
};

const Punch: React.FC<{ c: StatConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.white, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} />
    <Rise at={0}>
      <Kicker>Traducido</Kicker>
    </Rise>
    <Rise at={6}>
      <div style={{ fontFamily: SANS, fontSize: 100, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3, color: C.dark, marginTop: 24 }}>{c.punch}</div>
    </Rise>
  </AbsoluteFill>
);

const scenes = (c: StatConfig): Scene[] => [
  { name: "Hook", dur: 70, el: <Hook c={c} /> },
  { name: "Dato", dur: 130, el: <Stat c={c} /> },
  { name: "Traducción", dur: 100, el: <Punch c={c} /> },
  { name: "Cierre", dur: 110, el: <EndCard title={c.cta} sub="Diseña la tuya gratis, sin registro." /> },
];

export const STAT_DURATION = reelDuration(scenes(EJEMPLO_STAT));

export const ReelStat: React.FC<{ config: StatConfig }> = ({ config }) => <Reel scenes={scenes(config)} />;
