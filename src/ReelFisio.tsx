import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  useCurrentFrame,
} from "remotion";
import { C, Cursor, EndCard, Header, MONO, Rise, SANS, SERIF, ease, io } from "./brand";
import { Biz, Browser, Phone, SiteMock } from "./SiteMock";

// const TAG = "WEB EN 30 SEGUNDOS · 05";

export const FISIO: Biz = {
  name: "Fisio Norte",
  kicker: "Fisioterapia deportiva",
  headline: "Vuelve a moverte sin dolor.",
  sub: "Valoración en la primera sesión y un plan pensado para tu lesión.",
  cta: "Pedir cita",
  bg: "#FFFFFF",
  services: [
    { t: "Lesiones deportivas", d: "Esguinces, roturas, sobrecargas" },
    { t: "Dolor de espalda", d: "Cervical, lumbar y postural" },
    { t: "Rehabilitación", d: "Después de cirugía o lesión" },
  ],
};

const NEUTRAL = "#A3A8BC";
const TEAL = "#16927F";

// ---------- Scene 1: hook ----------
export const FisioHook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: SANS }}>
      <Header />
      <div style={{ position: "absolute", top: 360, left: 80, right: 80 }}>
        <Rise at={0}>
          <div style={{ fontSize: 108, fontFamily: SANS, fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, color: C.dark }}>
            La web de
          </div>
        </Rise>
        <Rise at={5}>
          <div style={{ fontSize: 108, fontFamily: SANS, fontWeight: 800, lineHeight: 1.0, letterSpacing: -3, color: C.dark }}>
            una fisio,
          </div>
        </Rise>
        <Rise at={10}>
          <div style={{ fontSize: 108, fontFamily: SANS, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3, color: C.blue }}>
            en 30 segundos.
          </div>
        </Rise>
      </div>
      {/* empty wireframe phone rising: the "before" */}
      <div
        style={{
          position: "absolute",
          left: 270,
          top: io(f, [8, 40], [1920, 1080]),
        }}
      >
        <Phone w={540}>
          <div style={{ background: "#fff", width: "100%", height: "100%", padding: "90px 36px" }}>
            {[0.5, 0.9, 0.75, 0.4].map((w, i) => (
              <div key={i} style={{ height: i === 1 ? 54 : 24, width: `${w * 100}%`, borderRadius: 10, background: C.line, marginBottom: 22 }} />
            ))}
            <div style={{ height: 300, borderRadius: 24, background: C.line, marginTop: 30 }} />
          </div>
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 2: configure ----------
const PANEL_TOP = 1415;
const SW = [
  { c: C.blue, x: 158 },
  { c: TEAL, x: 222 },
  { c: "#E2725B", x: 286 },
  { c: C.ink, x: 350 },
];
const CY = PANEL_TOP + 150; // controls row centre

const StepLabel: React.FC<{ from: number; to: number; n: string; t: string }> = ({ from, to, n, t }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 220,
        left: 80,
        right: 80,
        display: "flex",
        alignItems: "baseline",
        gap: 22,
        opacity: io(f, [from, from + 8, to - 6, to], [0, 1, 1, 0]),
        translate: `0px ${io(f, [from, from + 14], [40, 0])}px`,
      }}
    >
      <span style={{ fontFamily: MONO, fontSize: 44, fontWeight: 700, color: C.blue }}>{n}</span>
      <span style={{ fontSize: 88, fontFamily: SANS, fontWeight: 800, letterSpacing: -3, color: C.dark }}>{t}</span>
    </div>
  );
};

export const FisioConfig: React.FC = () => {
  const f = useCurrentFrame();
  const accent = interpolateColors(f, [64, 74], [NEUTRAL, TEAL]);
  const serifOn = f >= 128;
  const services = io(f, [182, 206], [0, 1]);
  const scroll = io(f, [196, 236], [0, 560], ease);
  const toggle = io(f, [180, 190], [0, 1]);
  const panelIn = io(f, [0, 18], [400, 0]);
  const active = f < 100 ? 0 : f < 160 ? 1 : 2;
  const col = (i: number): React.CSSProperties => ({
    position: "absolute",
    top: 26,
    bottom: 26,
    left: 26 + i * 296,
    width: 280,
    borderRadius: 24,
    border: `4px solid ${active === i ? C.blue : "transparent"}`,
    background: active === i ? "#F1F3FE" : "transparent",
  });
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: SANS }}>
      <Header />
      <StepLabel from={6} to={100} n="1" t="Color de marca" />
      <StepLabel from={100} to={160} n="2" t="Tipografía" />
      <StepLabel from={160} to={250} n="3" t="Secciones" />
      <div style={{ position: "absolute", left: 310, top: 395 }}>
        <Phone w={460}>
          <SiteMock
            biz={FISIO}
            accent={accent}
            headFont={serifOn ? SERIF : SANS}
            services={services}
            scroll={scroll}
          />
          {/* flash when the font swaps */}
          <AbsoluteFill style={{ background: "#fff", opacity: io(f, [128, 136], [0.7, 0]) * (f >= 128 ? 1 : 0) }} />
        </Phone>
      </div>
      {/* configurator panel */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: PANEL_TOP,
          height: 290,
          background: "#fff",
          borderRadius: 36,
          boxShadow: "0 30px 70px rgba(22,26,48,.18)",
          translate: `0px ${panelIn}px`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={col(i)} />
        ))}
        {["Color", "Tipografía", "Servicios"].map((t, i) => (
          <div key={t} style={{ position: "absolute", top: 58, left: 56 + i * 296, fontSize: 30, fontWeight: 700, color: active === i ? C.blue : C.grey }}>
            {t}
          </div>
        ))}
        {SW.map((s, i) => (
          <div
            key={s.c}
            style={{
              position: "absolute",
              left: s.x - 80 - 26,
              top: CY - PANEL_TOP - 26,
              width: 52,
              height: 52,
              borderRadius: 52,
              background: s.c,
              boxShadow: i === 1 && f >= 64 ? `0 0 0 6px #fff, 0 0 0 11px ${TEAL}` : "none",
            }}
          />
        ))}
        {[
          { x: 468, font: SANS, on: !serifOn },
          { x: 600, font: SERIF, on: serifOn },
        ].map((c) => (
          <div
            key={c.x}
            style={{
              position: "absolute",
              left: c.x - 80 - 55,
              top: CY - PANEL_TOP - 40,
              width: 110,
              height: 80,
              borderRadius: 18,
              border: `3px solid ${c.on ? C.blue : C.line}`,
              background: c.on ? C.blue : "#fff",
              color: c.on ? "#fff" : C.ink,
              fontFamily: c.font,
              fontSize: 40,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Aa
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 838 - 80 - 60,
            top: CY - PANEL_TOP - 32,
            width: 120,
            height: 64,
            borderRadius: 64,
            background: interpolateColors(toggle, [0, 1], [C.line, C.blue]),
          }}
        >
          <div style={{ position: "absolute", top: 7, left: interpolate(toggle, [0, 1], [7, 63]), width: 50, height: 50, borderRadius: 50, background: "#fff" }} />
        </div>
      </div>
      <Cursor
        path={[
          { f: 24, x: 940, y: 1200 },
          { f: 60, x: SW[1].x, y: CY },
          { f: 64, x: SW[1].x, y: CY, click: true },
          { f: 104, x: SW[1].x + 10, y: CY + 20 },
          { f: 124, x: 600, y: CY },
          { f: 128, x: 600, y: CY, click: true },
          { f: 160, x: 610, y: CY + 20 },
          { f: 178, x: 838, y: CY },
          { f: 180, x: 838, y: CY, click: true },
          { f: 230, x: 850, y: CY + 60 },
        ]}
      />
    </AbsoluteFill>
  );
};

// ---------- Scene 3: result ----------
export const FisioResult: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: SANS }}>
      <Header />
      <div style={{ position: "absolute", top: 240, left: 80, right: 80 }}>
        <Rise at={2}>
          <div style={{ fontSize: 96, fontFamily: SANS, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: C.dark }}>
            Lista para
          </div>
        </Rise>
        <Rise at={7}>
          <div style={{ fontSize: 96, fontFamily: SANS, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3, color: TEAL }}>
            recibir citas.
          </div>
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 40, top: 560, translate: `${io(f, [0, 20], [-200, 0])}px 0px`, opacity: io(f, [0, 12], [0, 1]) }}>
        <Browser w={860} h={600}>
          <SiteMock biz={FISIO} accent={TEAL} headFont={SERIF} mode="desktop" scroll={io(f, [30, 110], [0, 180], ease)} />
        </Browser>
      </div>
      <div style={{ position: "absolute", left: 600, top: io(f, [6, 30], [1920, 900]) }}>
        <Phone w={400}>
          <SiteMock biz={FISIO} accent={TEAL} headFont={SERIF} scroll={io(f, [24, 110], [0, 700], ease)} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

export const FisioEnd: React.FC = () => (
  <EndCard title="Diseña la tuya." sub="Gratis y sin registro." question="¿Qué negocio diseño después? Déjalo en comentarios." />
);

export const FISIO_DURATION = 70 + 240 + 120 + 110 - 10 - 10 - 14;

export const ReelFisio: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={70}>
      <FisioHook />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />
    <TransitionSeries.Sequence name="Configurar" durationInFrames={240}>
      <FisioConfig />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />
    <TransitionSeries.Sequence name="Resultado" durationInFrames={120}>
      <FisioResult />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 14 })} />
    <TransitionSeries.Sequence name="Cierre" durationInFrames={110}>
      <FisioEnd />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
