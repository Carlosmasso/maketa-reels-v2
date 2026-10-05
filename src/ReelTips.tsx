import React from "react";
import { AbsoluteFill } from "remotion";
import { C, SANS, SERIF, MONO, Header, Kicker, Rise, EndCard, Reel, Scene, reelDuration } from "./brand";

const TAG = "GUÁRDALO";

export type TipsConfig = {
  kicker: string;
  hook: string;
  tips: { t: string; d: string }[];
  cta: string;
  question: string;
};

export const EJEMPLO_TIPS: TipsConfig = {
  kicker: "3 errores que cuestan clientes",
  hook: "Tu web no vende por esto.",
  tips: [
    { t: "No dices qué haces en 3 segundos.", d: "Titular claro arriba del todo: qué ofreces y para quién." },
    { t: "El botón de contacto está escondido.", d: "Un único botón visible, repetido al hacer scroll." },
    { t: "Está pensada para ordenador.", d: "8 de cada 10 visitas llegan desde el móvil. Diseña para él." },
  ],
  cta: "Corrígelos en minutos.",
  question: "¿Cuál de los tres tiene tu web? Dímelo en comentarios.",
};

const Hook: React.FC<{ c: TipsConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.dark, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} dark />
    <Rise at={0}>
      <Kicker color={C.blueSoft}>{c.kicker}</Kicker>
    </Rise>
    <Rise at={5}>
      <div style={{ fontFamily: SERIF, fontSize: 136, fontWeight: 600, lineHeight: 1.0, letterSpacing: -4, color: C.white, marginTop: 24 }}>
        {c.hook}
      </div>
    </Rise>
  </AbsoluteFill>
);

const Tip: React.FC<{ n: number; total: number; t: string; d: string }> = ({ n, total, t, d }) => (
  <AbsoluteFill style={{ background: n % 2 ? C.white : C.bg, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} />
    <Rise at={0}>
      <div style={{ fontFamily: MONO, fontSize: 44, fontWeight: 700, color: C.blue }}>
        {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </Rise>
    <Rise at={5}>
      <div style={{ fontFamily: SERIF, fontSize: 100, fontWeight: 600, lineHeight: 1.05, letterSpacing: -3, color: C.dark, marginTop: 28 }}>{t}</div>
    </Rise>
    <Rise at={16}>
      <div style={{ fontFamily: SANS, fontSize: 50, fontWeight: 500, lineHeight: 1.3, color: C.ink, marginTop: 40, paddingLeft: 30, borderLeft: `6px solid ${C.blue}` }}>
        {d}
      </div>
    </Rise>
  </AbsoluteFill>
);

const scenes = (c: TipsConfig): Scene[] => [
  { name: "Hook", dur: 70, el: <Hook c={c} /> },
  ...c.tips.map((tip, i) => ({ name: `Tip ${i + 1}`, dur: 120, el: <Tip n={i + 1} total={c.tips.length} {...tip} /> })),
  { name: "Cierre", dur: 120, el: <EndCard title={c.cta} sub="Diseña tu web gratis, sin registro." question={c.question} /> },
];

export const tipsDuration = (c: TipsConfig) => reelDuration(scenes(c));

export const ReelTips: React.FC<{ config: TipsConfig }> = ({ config }) => <Reel scenes={scenes(config)} />;
