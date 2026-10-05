import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { C, MONO, SANS, SERIF, LogoMark } from "./brand";
import { Biz, Phone, SiteMock } from "./SiteMock";

type Visual = { kind: "phone"; biz: Biz } | { kind: "text"; text: string; sans?: boolean };

export type Layout = "foco" | "titular" | "centrado" | "split";

export type PortadaConfig = {
  kicker: string;
  title: string;
  highlight?: string;
  big?: string;
  accent: string;
  bg: "blue" | "dark" | "light";
  photo?: string;
  focus?: string;
  visual?: Visual;
  layout?: Layout;
};

const BASE = { blue: C.blue, dark: C.dark, light: C.bg };

const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

const Icon: React.FC<{ size: number; color: string; stroke?: number; style?: React.CSSProperties }> = ({ size, color, stroke = 1.2, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke={color} strokeWidth={stroke} />
    <rect x="6" y="6.5" width="12" height="3.5" rx="1.2" fill={color} />
    <rect x="6" y="12.5" width="5" height="5" rx="1.2" fill={color} />
    <rect x="13" y="12.5" width="5" height="5" rx="1.2" fill={color} opacity="0.6" />
  </svg>
);

const Grain: React.FC<{ strong: boolean }> = ({ strong }) => (
  <AbsoluteFill style={{ backgroundImage: GRAIN, opacity: strong ? 0.14 : 0.08, mixBlendMode: "overlay" }} />
);

const Pill: React.FC<{ text: string; bg: string; fg: string }> = ({ text, bg, fg }) => (
  <div style={{ display: "inline-block", padding: "12px 26px", borderRadius: 100, background: bg, color: fg, fontFamily: SANS, fontSize: 28, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase" }}>
    {text}
  </div>
);

const Title: React.FC<{ c: PortadaConfig; size: number; color: string; hl: string; align?: "left" | "center" }> = ({ c, size, color, hl, align = "left" }) => {
  const parts = c.highlight && c.title.includes(c.highlight) ? c.title.split(c.highlight) : null;
  return (
    <div style={{ fontFamily: SANS, fontSize: size, fontWeight: 800, lineHeight: 1.0, letterSpacing: -4, color, textAlign: align }}>
      {parts ? (
        <>
          {parts[0]}
          <span style={{ color: hl, whiteSpace: "nowrap" }}>{c.highlight}</span>
          {parts[1]}
        </>
      ) : (
        c.title
      )}
    </div>
  );
};

const Brand: React.FC<{ onDark: boolean; line: string; center?: boolean }> = ({ onDark, line, center }) => (
  <div style={{ position: "absolute", left: 90, right: 90, bottom: 290, display: "flex", alignItems: "center", justifyContent: center ? "center" : "space-between" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <LogoMark size={56} bg={onDark ? C.white : C.blue} color={onDark ? C.blue : C.white} />
      <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: onDark ? C.white : C.dark }}>
        maketa<span style={{ color: onDark ? C.blueSoft : C.blue }}>.es</span>
      </div>
    </div>
    {center ? null : <div style={{ height: 6, width: 160, borderRadius: 6, background: line }} />}
  </div>
);

const PhoneMock: React.FC<{ biz: Biz; accent: string; style: React.CSSProperties }> = ({ biz, accent, style }) => (
  <div style={{ position: "absolute", filter: "drop-shadow(0 40px 60px rgba(0,0,0,.35))", ...style }}>
    <Phone w={540}>
      <SiteMock biz={biz} accent={accent} headFont={SERIF} />
    </Phone>
  </div>
);

const BigText: React.FC<{ v: { text: string; sans?: boolean }; color: string; style: React.CSSProperties }> = ({ v, color, style }) => (
  <div style={{ position: "absolute", fontFamily: v.sans ? SANS : MONO, fontSize: v.sans ? 520 : 300, fontWeight: 700, letterSpacing: -14, lineHeight: 1, color, ...style }}>{v.text}</div>
);

const titleSize = (c: PortadaConfig, max = 128) => (c.big ? 84 : c.title.length > 32 ? max - 20 : max);

const BigStat: React.FC<{ c: PortadaConfig; color: string; align?: "left" | "center" }> = ({ c, color, align = "left" }) =>
  c.big ? <div style={{ fontFamily: MONO, fontSize: 300, fontWeight: 700, letterSpacing: -12, lineHeight: 1, color, marginTop: 24, textAlign: align }}>{c.big}</div> : null;

// Visual on top, headline anchored at the bottom
const Foco: React.FC<PortadaConfig> = (c) => {
  const onDark = c.bg !== "light" || !!c.photo;
  const hl = c.bg === "blue" && !c.photo ? C.blueSoft : c.accent;
  return (
    <AbsoluteFill style={{ background: BASE[c.bg], overflow: "hidden" }}>
      {c.photo ? (
        <>
          <Img src={c.photo} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.focus ?? "50% 30%" }} />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(22,26,48,.15) 0%, rgba(22,26,48,.5) 45%, rgba(22,26,48,.94) 100%)" }} />
        </>
      ) : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 88% 12%, ${c.accent}${c.bg === "light" ? "40" : "B3"} 0%, transparent 55%), radial-gradient(circle at 0% 100%, ${c.bg === "blue" ? C.dark : c.accent}${c.bg === "light" ? "1F" : "66"} 0%, transparent 50%)`,
          }}
        />
      )}
      <Icon size={1500} color={onDark ? "rgba(255,255,255,.09)" : "rgba(67,83,224,.08)"} style={{ position: "absolute", right: -560, top: -220, rotate: "-14deg" }} />
      <Grain strong={onDark} />
      {c.visual?.kind === "phone" ? <PhoneMock biz={c.visual.biz} accent={c.accent} style={{ right: 80, top: 250, rotate: "7deg", scale: 0.68, transformOrigin: "top right" }} /> : null}
      {c.visual?.kind === "text" ? <BigText v={c.visual} color={hl} style={{ left: 90, top: 280 }} /> : null}
      <AbsoluteFill style={{ padding: "0 90px 400px", justifyContent: "flex-end" }}>
        <div>
          <Pill text={c.kicker} bg={onDark ? (c.bg === "blue" && !c.photo ? C.white : c.accent) : C.blue} fg={c.bg === "blue" && !c.photo ? C.blue : C.white} />
          <BigStat c={c} color={hl} />
          <div style={{ marginTop: 28 }}>
            <Title c={c} size={titleSize(c)} color={onDark ? C.white : C.dark} hl={hl} />
          </div>
        </div>
      </AbsoluteFill>
      <Brand onDark={onDark} line={hl} />
    </AbsoluteFill>
  );
};

// Flat accent background, big headline on top, visual rising from the bottom edge
const Titular: React.FC<PortadaConfig> = (c) => {
  const base = c.bg === "blue" ? C.blue : c.accent;
  return (
    <AbsoluteFill style={{ background: base, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 100% 100%, ${C.dark}99 0%, transparent 60%)` }} />
      {c.photo ? (
        <AbsoluteFill style={{ top: 980 }}>
          <Img src={c.photo} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.focus ?? "50% 30%" }} />
          <AbsoluteFill style={{ background: `linear-gradient(180deg, ${base} 0%, transparent 35%)` }} />
        </AbsoluteFill>
      ) : null}
      <Icon size={900} color="rgba(255,255,255,.12)" stroke={1.6} style={{ position: "absolute", left: -260, bottom: -200, rotate: "12deg" }} />
      <Grain strong />
      {c.visual?.kind === "phone" && !c.photo ? <PhoneMock biz={c.visual.biz} accent={C.dark} style={{ left: 270, top: 1040, rotate: "-4deg" }} /> : null}
      {c.visual?.kind === "text" && !c.photo ? <BigText v={c.visual} color="rgba(255,255,255,.9)" style={{ right: 90, top: 1100 }} /> : null}
      <div style={{ position: "absolute", left: 90, right: 90, top: 270 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 56 }}>
          <LogoMark size={56} bg={C.white} color={base} />
          <div style={{ fontFamily: SANS, fontSize: 40, fontWeight: 800, color: C.white }}>maketa.es</div>
        </div>
        <Pill text={c.kicker} bg={C.dark} fg={C.white} />
        <BigStat c={c} color={C.white} />
        <div style={{ marginTop: 28 }}>
          <Title c={c} size={titleSize(c, 136)} color={C.white} hl={C.dark} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Everything centred around the maketa icon: for short, punchy messages
const Centrado: React.FC<PortadaConfig> = (c) => {
  const onDark = c.bg !== "light";
  const hl = c.bg === "blue" ? C.blueSoft : c.accent;
  return (
    <AbsoluteFill style={{ background: BASE[c.bg], overflow: "hidden", alignItems: "center", justifyContent: "center", padding: "0 90px" }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, ${c.bg === "blue" ? "#6B79F0" : c.accent}${onDark ? "80" : "33"} 0%, transparent 60%)` }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: "50%", top: "45%", width: 700 + i * 380, height: 700 + i * 380, marginLeft: -(350 + i * 190), marginTop: -(350 + i * 190), borderRadius: "50%", border: `2px solid ${onDark ? "rgba(255,255,255,.08)" : "rgba(67,83,224,.08)"}` }} />
      ))}
      <Grain strong={onDark} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 36, marginTop: -60 }}>
        {c.big ? null : <Icon size={220} color={onDark ? C.white : C.blue} stroke={2.6} />}
        <Pill text={c.kicker} bg={onDark ? C.white : C.blue} fg={onDark ? (c.bg === "blue" ? C.blue : C.dark) : C.white} />
        <BigStat c={c} color={hl} align="center" />
        <Title c={c} size={titleSize(c, 120)} color={onDark ? C.white : C.dark} hl={hl} align="center" />
      </div>
      <Brand onDark={onDark} line={hl} center />
    </AbsoluteFill>
  );
};

// Editorial split: coloured top with the visual, diagonal cut, light bottom with the headline
const Split: React.FC<PortadaConfig> = (c) => {
  const top = c.bg === "light" ? c.accent : c.bg === "blue" ? C.blue : C.dark;
  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ height: 1080, clipPath: "polygon(0 0, 100% 0, 100% 84%, 0 100%)", background: top }}>
        {c.photo ? (
          <Img src={c.photo} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: c.focus ?? "50% 30%" }} />
        ) : (
          <>
            <AbsoluteFill style={{ background: `radial-gradient(circle at 80% 30%, ${c.accent}CC 0%, transparent 60%)` }} />
            <Icon size={1100} color="rgba(255,255,255,.1)" stroke={1.4} style={{ position: "absolute", left: -300, top: -200, rotate: "-10deg" }} />
            <Grain strong />
          </>
        )}
        {c.visual?.kind === "phone" && !c.photo ? <PhoneMock biz={c.visual.biz} accent={c.accent} style={{ left: 300, top: 250, rotate: "5deg", scale: 0.78, transformOrigin: "top center" }} /> : null}
        {c.visual?.kind === "text" && !c.photo ? <BigText v={c.visual} color={C.white} style={{ left: 90, top: 330 }} /> : null}
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 90, right: 90, top: 1130 }}>
        <Pill text={c.kicker} bg={c.accent} fg={C.white} />
        <BigStat c={c} color={c.accent} />
        <div style={{ marginTop: 24 }}>
          <Title c={c} size={titleSize(c, 112)} color={C.dark} hl={c.accent} />
        </div>
      </div>
      <Brand onDark={false} line={c.accent} />
    </AbsoluteFill>
  );
};

// Instagram crops reel covers to 3:4 in the profile grid: keep text inside y 240–1680
export const Portada: React.FC<PortadaConfig> = (c) => {
  switch (c.layout ?? "foco") {
    case "titular":
      return <Titular {...c} />;
    case "centrado":
      return <Centrado {...c} />;
    case "split":
      return <Split {...c} />;
    default:
      return <Foco {...c} />;
  }
};
