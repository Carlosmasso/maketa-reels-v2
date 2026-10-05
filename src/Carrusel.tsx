import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, MONO, SANS, LogoMark } from "./brand";
import { Carrusel as CarruselData, Slide } from "./carruseles";

const W = 1080;
const PAD = 96;

const Icon: React.FC<{ size: number; color: string; style?: React.CSSProperties }> = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke={color} strokeWidth={1.4} />
    <rect x="6" y="6.5" width="12" height="3.5" rx="1.2" fill={color} />
    <rect x="6" y="12.5" width="5" height="5" rx="1.2" fill={color} />
    <rect x="13" y="12.5" width="5" height="5" rx="1.2" fill={color} opacity="0.6" />
  </svg>
);

const Highlighted: React.FC<{ text: string; highlight?: string; color: string }> = ({ text, highlight, color }) => {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [a, b] = text.split(highlight);
  return (
    <>
      {a}
      <span style={{ color, whiteSpace: "nowrap" }}>{highlight}</span>
      {b}
    </>
  );
};

const H: React.FC<{ children: React.ReactNode; color: string; size?: number }> = ({ children, color, size = 96 }) => (
  <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3.5, color }}>{children}</div>
);

const Body: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <div style={{ fontSize: 46, fontWeight: 500, lineHeight: 1.35, color, marginTop: 40 }}>{children}</div>
);

const Check: React.FC<{ color: string; on: string }> = ({ color, on }) => (
  <div style={{ width: 52, height: 52, borderRadius: 14, background: color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="30" height="30" viewBox="0 0 24 24">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={on} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const SlideBody: React.FC<{ s: Slide; n: number; accent: string; tone: string; dark: boolean }> = ({ s, n, accent, tone, dark }) => {
  const fg = dark ? C.white : C.dark;
  const soft = dark ? C.blueSoft : C.ink;
  switch (s.t) {
    case "portada":
      return (
        <>
          <div style={{ display: "inline-block", padding: "12px 26px", borderRadius: 100, background: C.white, color: tone, fontSize: 28, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 36 }}>
            {s.kicker}
          </div>
          <H color={C.white} size={124}>
            <Highlighted text={s.title} highlight={s.highlight} color={C.dark} />
          </H>
        </>
      );
    case "punto":
      return (
        <>
          <div style={{ fontFamily: MONO, fontSize: 120, fontWeight: 700, letterSpacing: -6, color: accent, lineHeight: 1, marginBottom: 30 }}>{String(n).padStart(2, "0")}</div>
          <H color={fg}>{s.title}</H>
          <Body color={soft}>{s.body}</Body>
        </>
      );
    case "dato":
      return (
        <>
          <div style={{ fontFamily: MONO, fontSize: 300, fontWeight: 700, letterSpacing: -14, color: accent, lineHeight: 1 }}>{s.big}</div>
          <H color={fg} size={72}>
            {s.text}
          </H>
          {s.source ? <div style={{ fontFamily: MONO, fontSize: 28, color: C.grey, marginTop: 30 }}>{s.source}</div> : null}
        </>
      );
    case "lista":
      return (
        <>
          <H color={fg} size={88}>
            {s.title}
          </H>
          <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 30 }}>
            {s.items.map((it) => (
              <div key={it} style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 46, fontWeight: 600, color: fg, lineHeight: 1.2 }}>
                <Check color={accent} on={C.white} />
                {it}
              </div>
            ))}
          </div>
        </>
      );
    case "vs":
      return (
        <>
          <H color={fg} size={84}>
            {s.title}
          </H>
          <div style={{ display: "flex", gap: 24, marginTop: 50 }}>
            {[s.left, s.right].map((col, i) => (
              <div key={col.label} style={{ flex: 1, borderRadius: 32, padding: "36px 32px", background: i ? accent : dark ? "rgba(255,255,255,.08)" : C.white, border: i ? "none" : `3px solid ${dark ? "rgba(255,255,255,.12)" : C.line}` }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: i ? C.white : fg, marginBottom: 26 }}>{col.label}</div>
                {col.items.map((it) => (
                  <div key={it} style={{ fontSize: 34, fontWeight: 600, lineHeight: 1.25, color: i ? C.white : soft, marginBottom: 20 }}>
                    {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      );
    case "cierre":
      return (
        <>
          <Icon size={180} color={C.white} style={{ marginBottom: 44 }} />
          <H color={C.white} size={112}>
            {s.title}
          </H>
          <Body color={C.blueSoft}>{s.sub}</Body>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 18, marginTop: 50, background: C.white, color: C.blue, borderRadius: 100, padding: "24px 44px 24px 28px", fontSize: 48, fontWeight: 800 }}>
            <LogoMark size={56} />
            maketa.es
          </div>
          {s.question ? <div style={{ fontSize: 40, fontWeight: 700, color: C.white, marginTop: 56, paddingTop: 36, borderTop: "3px solid rgba(255,255,255,.25)" }}>{s.question}</div> : null}
        </>
      );
  }
};

/** One carousel = one composition; each frame is one slide */
export const Carrusel: React.FC<{ data: CarruselData }> = ({ data }) => {
  const i = Math.min(useCurrentFrame(), data.slides.length - 1);
  const s = data.slides[i];
  const total = data.slides.length;
  const first = s.t === "portada";
  const last = s.t === "cierre";
  // Cover in accent, closing in maketa blue, content slides alternate light/dark for rhythm
  const bg = first ? data.accent : last ? C.blue : i % 2 ? C.bg : C.dark;
  const dark = bg !== C.bg;
  const fg = dark ? C.white : C.dark;
  const pointNumber = data.slides.slice(0, i + 1).filter((x) => x.t === "punto").length;
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: SANS, overflow: "hidden" }}>
      {first || last ? (
        <Icon size={1100} color="rgba(255,255,255,.1)" style={{ position: "absolute", right: -420, bottom: -380, rotate: "-12deg" }} />
      ) : null}
      <div style={{ position: "absolute", top: 80, left: PAD, right: PAD, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <LogoMark size={48} bg={dark ? C.white : C.blue} color={dark ? (first ? data.accent : C.blue) : C.white} />
          <div style={{ fontSize: 34, fontWeight: 800, color: fg }}>
            maketa<span style={{ color: dark ? C.blueSoft : C.blue }}>.es</span>
          </div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 700, color: dark ? "rgba(255,255,255,.7)" : C.grey }}>
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
      <AbsoluteFill style={{ padding: `0 ${PAD}px`, justifyContent: "center" }}>
        <div>
          <SlideBody s={s} n={pointNumber} accent={first || last ? C.white : data.accent} tone={data.accent} dark={dark} />
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {data.slides.map((_, k) => (
            <div key={k} style={{ height: 8, width: k === i ? 56 : 20, borderRadius: 8, background: dark ? (k === i ? C.white : "rgba(255,255,255,.3)") : k === i ? data.accent : C.line }} />
          ))}
        </div>
        {last ? null : (
          <div style={{ fontSize: 32, fontWeight: 800, color: dark ? C.white : data.accent, display: "flex", alignItems: "center", gap: 12 }}>
            Desliza
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const CARRUSEL_SIZE = { width: W, height: 1350 };
