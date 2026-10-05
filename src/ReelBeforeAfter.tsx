import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS, SERIF, MONO, Header, Kicker, Rise, EndCard, io, ease } from "./brand";
import { Reel, Scene, endFrames, readFrames, reelDuration } from "./reel";
import { Biz, Phone, SiteMock } from "./SiteMock";
import { Person } from "./people";
import { BrollBg, brollFor } from "./media";

const TAG = "ANTES / DESPUÉS";

export type BeforeAfterConfig = {
  biz: Biz;
  accent: string;
  hook: string;
  beforeFlaws: string[];
  metric?: string;
  metricLabel?: string;
  cta: string;
  host?: Person;
  broll?: string;
};

export const EJEMPLO_BEFOREAFTER: BeforeAfterConfig = {
  biz: {
    name: "Clínica Dental Colmillo",
    kicker: "Clínica dental",
    headline: "Sonríe con confianza.",
    sub: "Tratamientos personalizados para tu salud bucal.",
    cta: "Pedir cita",
    bg: "#FFFFFF",
    services: [
      { t: "Revisión dental", d: "Chequeos regulares para mantener tu salud bucal" },
      { t: "Limpieza dental", d: "Eliminación de placa y sarro" },
      { t: "Ortodoncia", d: "Alineación de dientes para una sonrisa perfecta" },
    ],
  },
  accent: "#C9A25E",
  hook: "Misma clínica dental. Otra web.",
  beforeFlaws: ["No se ve bien en el móvil", "Sin botón de pedido", "Nadie sabe qué vende"],
  metric: "3×",
  metricLabel: "más encargos en el primer mes",
  cta: "¿Tu web vende o solo existe?",
};

const Hook: React.FC<{ c: BeforeAfterConfig }> = ({ c }) => {
  const clip = c.broll ? brollFor(c.broll) : undefined;
  return (
    <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
      {clip ? <BrollBg src={clip} /> : null}
      <Header tag={TAG} dark={!!clip} />
      <Rise at={0}>
        <Kicker color={clip ? C.blueSoft : c.accent}>{c.biz.kicker}</Kicker>
      </Rise>
      <Rise at={5}>
        <div style={{ fontFamily: SANS, fontSize: 162, fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, color: clip ? C.white : C.dark, marginTop: 24 }}>
          {c.hook}
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

const OldSite: React.FC = () => (
  <div style={{ background: "#EDEDED", width: "100%", height: "100%", padding: "80px 28px", fontFamily: "Times New Roman, serif" }}>
    <div style={{ fontSize: 44, color: "#0000EE", textDecoration: "underline", textAlign: "center" }}>BIENVENIDOS!!!</div>
    <div style={{ height: 220, background: "#C8C8C8", marginTop: 30 }} />
    {[0.95, 0.8, 0.9, 0.6, 0.85].map((w, i) => (
      <div key={i} style={{ height: 16, width: `${w * 100}%`, background: "#BDBDBD", marginTop: 18 }} />
    ))}
    <div style={{ fontSize: 26, color: "#555", marginTop: 40 }}>Última actualización: 2014</div>
  </div>
);

const Before: React.FC<{ c: BeforeAfterConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.white }}>
      <Header tag={TAG} />
      <div style={{ position: "absolute", top: 240, left: 80 }}>
        <Kicker color={C.grey}>Antes</Kicker>
      </div>
      <div style={{ position: "absolute", left: 80, top: io(f, [0, 24], [1920, 360]), filter: "grayscale(1)" }}>
        <Phone w={430}>
          <OldSite />
        </Phone>
      </div>
      <div style={{ position: "absolute", left: 570, right: 60, top: 600 }}>
        {c.beforeFlaws.map((t, i) => (
          <Rise key={t} at={20 + i * 24}>
            <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 700, lineHeight: 1.2, color: C.ink, marginBottom: 44 }}>
              <span style={{ color: "#D64545" }}>✕ </span>
              {t}
            </div>
          </Rise>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const After: React.FC<{ c: BeforeAfterConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Header tag={TAG} />
      <div style={{ position: "absolute", top: 240, left: 80 }}>
        <Kicker color={c.accent}>Después · maketa</Kicker>
      </div>
      <div style={{ position: "absolute", left: 250, top: io(f, [0, 24], [1920, 360]) }}>
        <Phone w={580}>
          <SiteMock biz={c.biz} accent={c.accent} headFont={SERIF} scroll={io(f, [24, 125], [0, 1550], ease)} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

const Impact: React.FC<{ c: BeforeAfterConfig }> = ({ c }) => (
  <AbsoluteFill style={{ background: C.dark, padding: "0 80px", justifyContent: "center" }}>
    <Header tag={TAG} dark />
    <Rise at={0}>
      <div style={{ fontFamily: MONO, fontSize: 320, fontWeight: 700, lineHeight: 1, letterSpacing: -12, color: c.accent }}>{c.metric}</div>
    </Rise>
    <Rise at={10}>
      <div style={{ fontFamily: SANS, fontSize: 64, fontWeight: 600, lineHeight: 1.2, color: C.white, marginTop: 24 }}>{c.metricLabel}</div>
    </Rise>
  </AbsoluteFill>
);

const scenes = (c: BeforeAfterConfig): Scene[] => [
  { name: "Hook", dur: Math.max(75, readFrames(`${c.biz.kicker} ${c.hook}`)), el: <Hook c={c} /> },
  { name: "Antes", dur: readFrames(c.beforeFlaws.join(" "), 20 + c.beforeFlaws.length * 24), el: <Before c={c} /> },
  { name: "Después", dur: c.host ? 160 : 130, el: <After c={c} />, via: c.host },
  ...(c.metric ? [{ name: "Impacto", dur: readFrames(c.metricLabel ?? "", 50), el: <Impact c={c} /> }] : []),
  { name: "Cierre", dur: endFrames(c.cta, "Diseña la nueva gratis, sin registro."), el: <EndCard title={c.cta} sub="Diseña la nueva gratis, sin registro." /> },
];

export const beforeAfterDuration = (c: BeforeAfterConfig) => reelDuration(scenes(c));

export const ReelBeforeAfter: React.FC<{ config: BeforeAfterConfig }> = ({ config }) => (
  <Reel scenes={scenes(config)} />
);
