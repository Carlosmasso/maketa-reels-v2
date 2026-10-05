import React from "react";
import { AbsoluteFill, interpolateColors, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { C, SANS, SERIF, Header, LogoMark, Rise, ease, io } from "./brand";
import { Biz, Browser, Phone, SiteMock } from "./SiteMock";

const TAG = "DISEÑADA EN MAKETA";
const GOLD = "#C9A25E";
const BRIGHT = "#7D89FF";

export const LUA: Biz = {
  name: "Casa Lúa",
  kicker: "Cocina de mercado",
  headline: "Mesa para hoy, sin llamar.",
  sub: "Producto de temporada, menú del día y reservas online en un minuto.",
  cta: "Reservar mesa",
  bg: "#1D2320",
  dark: true,
  services: [
    { t: "Carta", d: "Cambia cada temporada" },
    { t: "Menú del día", d: "De lunes a viernes" },
    { t: "Eventos", d: "Grupos y celebraciones" },
  ],
};

export const PrecioHook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.dark, fontFamily: SANS, color: C.white }}>
      <Header tag="" dark />
      <div style={{ position: "absolute", top: 300, left: 80, right: 80 }}>
        <Rise at={0}>
          <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -3 }}>¿Pagarías</div>
        </Rise>
        <div
          style={{
            fontSize: 290,
            fontWeight: 800,
            letterSpacing: -12,
            lineHeight: 1,
            color: BRIGHT,
            opacity: io(f, [5, 12], [0, 1]),
            scale: io(f, [5, 20], [1.25, 1]),
            transformOrigin: "left center",
          }}
        >
          249 €
        </div>
        <Rise at={12}>
          <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -3 }}>por esta web?</div>
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 250, top: io(f, [18, 52], [1920, 1150]) }}>
        <Phone w={580}>
          <SiteMock biz={LUA} accent={GOLD} headFont={SERIF} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

export const PrecioShow: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: SANS }}>
      <Header tag={TAG} />
      <div style={{ position: "absolute", top: 240, left: 80, right: 80 }}>
        <Rise at={2}>
          <div style={{ fontSize: 40, fontWeight: 700, color: C.grey }}>Restaurante · Casa Lúa</div>
        </Rise>
        <Rise at={6}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05, color: C.dark, marginTop: 10 }}>
            Reservas online, carta y menú del día.
          </div>
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 40, top: 640, opacity: io(f, [0, 12], [0, 1]), translate: `${io(f, [0, 20], [-160, 0])}px 0px` }}>
        <Browser w={880} h={600}>
          <SiteMock biz={LUA} accent={GOLD} headFont={SERIF} mode="desktop" scroll={io(f, [30, 150], [0, 220], ease)} />
        </Browser>
      </div>
      <div style={{ position: "absolute", left: 610, top: io(f, [10, 34], [1920, 1000]) }}>
        <Phone w={390}>
          <SiteMock biz={LUA} accent={GOLD} headFont={SERIF} scroll={io(f, [30, 150], [0, 760], ease)} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

const LINES = ["No es una plantilla.", "Tú eliges cómo es.", "Yo la construyo."];

export const PrecioClaims: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#fff", fontFamily: SANS, justifyContent: "center", padding: "0 80px" }}>
      <Header tag={TAG} />
      {LINES.map((t, i) => {
        const at = i * 28;
        const done = f > at + 28 && i < 2;
        return (
          <Rise key={t} at={at}>
            <div
              style={{
                fontSize: 104,
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 1.15,
                color: done ? interpolateColors(f, [at + 28, at + 36], [C.dark, "#C5C9D8"]) : i === 2 ? C.blue : C.dark,
              }}
            >
              {t}
            </div>
          </Rise>
        );
      })}
    </AbsoluteFill>
  );
};

export const PrecioEnd: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.blue, fontFamily: SANS, color: "#fff", justifyContent: "center", padding: "0 80px" }}>
      <Header tag="" dark />
      <Rise at={2}>
        <div style={{ fontSize: 64, fontWeight: 700, color: C.blueSoft }}>Webs desde</div>
      </Rise>
      <div
        style={{
          fontSize: 300,
          fontWeight: 800,
          letterSpacing: -12,
          lineHeight: 1,
          opacity: io(f, [6, 12], [0, 1]),
          scale: io(f, [6, 22], [1.2, 1]),
          transformOrigin: "left center",
        }}
      >
        249 €
      </div>
      <Rise at={18}>
        <div style={{ fontSize: 50, fontWeight: 500, marginTop: 30, color: C.blueSoft }}>
          Diséñala gratis, sin registro.
        </div>
      </Rise>
      <Rise at={26}>
        <div
          style={{
            marginTop: 60,
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            background: "#fff",
            color: C.blue,
            borderRadius: 100,
            padding: "26px 46px 26px 30px",
            fontSize: 54,
            fontWeight: 800,
            scale: io(f, [50, 58, 66], [1, 1.06, 1], ease),
          }}
        >
          <LogoMark size={64} />
          maketa.es
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

export const PRECIO_DURATION = 75 + 165 + 100 + 110 - 10 - 12 - 10;

export const ReelPrecio: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={75}>
      <PrecioHook />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />
    <TransitionSeries.Sequence name="Web" durationInFrames={165}>
      <PrecioShow />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 12 })} />
    <TransitionSeries.Sequence name="Mensajes" durationInFrames={100}>
      <PrecioClaims />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />
    <TransitionSeries.Sequence name="Precio" durationInFrames={110}>
      <PrecioEnd />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
