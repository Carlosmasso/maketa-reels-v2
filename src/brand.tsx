import React from "react";
import { loadFont as cargarInter } from "@remotion/google-fonts/Inter";
import { loadFont as cargarFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as cargarMono } from "@remotion/google-fonts/JetBrainsMono";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

const inter = cargarInter("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });
const fraunces = cargarFraunces("normal", { weights: ["400", "600", "700"], subsets: ["latin"] });
cargarFraunces("italic", { weights: ["400"], subsets: ["latin"] });
const mono = cargarMono("normal", { weights: ["500", "700"], subsets: ["latin"] });

export const C = {
  bg: "#F6F7FC",
  blue: "#4353E0",
  blueSoft: "#CED3F8",
  dark: "#161A30",
  ink: "#2A2F45",
  grey: "#8A90A8",
  line: "#E3E6EF",
  white: "#FFFFFF",
};

export const SANS = `${inter.fontFamily}, sans-serif`;
export const SERIF = `${fraunces.fontFamily}, serif`;
export const HEADLINE = SERIF;
export const MONO = `${mono.fontFamily}, monospace`;

export const FADE = 10;

export type Scene = { name: string; dur: number; el: React.ReactNode };

// Duration accounts for the overlap of each fade between scenes
export const reelDuration = (scenes: Scene[]) =>
  scenes.reduce((s, x) => s + x.dur, 0) - FADE * (scenes.length - 1);

export const Reel: React.FC<{ scenes: Scene[] }> = ({ scenes }) => (
  <TransitionSeries>
    {scenes.flatMap((s, i) => [
      ...(i > 0
        ? [<TransitionSeries.Transition key={`t${i}`} presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />]
        : []),
      <TransitionSeries.Sequence key={s.name} name={s.name} durationInFrames={s.dur}>
        {s.el}
      </TransitionSeries.Sequence>,
    ])}
  </TransitionSeries>
);

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const ease = Easing.bezier(0.65, 0, 0.35, 1);

export const io = (
  f: number,
  input: number[],
  output: number[],
  easing = easeOut,
) =>
  interpolate(f, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Text that rises in with a soft fade */
export const Rise: React.FC<{
  at: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  dist?: number;
}> = ({ at, children, style, dist = 60 }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        opacity: io(f, [at, at + 10], [0, 1]),
        translate: `0px ${io(f, [at, at + 18], [dist, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const LogoMark: React.FC<{ size?: number; color?: string; bg?: string }> = ({
  size = 44,
  color = C.white,
  bg = C.blue,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke={color} strokeWidth="2.6" />
      <rect x="6" y="6.5" width="12" height="3.5" rx="1.2" fill={color} />
      <rect x="6" y="12.5" width="5" height="5" rx="1.2" fill={color} />
      <rect x="13" y="12.5" width="5" height="5" rx="1.2" fill={color} opacity="0.6" />
    </svg>
  </div>
);

/** Top bar shared by every reel: logo left, series tag right */
export const Header: React.FC<{ tag: string; dark?: boolean }> = ({ tag, dark }) => (
  <div
    style={{
      position: "absolute",
      top: 110,
      left: 80,
      right: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: SANS,
      zIndex: 50,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <LogoMark size={52} bg={dark ? C.white : C.blue} color={dark ? C.blue : C.white} />
      <div style={{ fontSize: 38, fontWeight: 800, color: dark ? C.white : C.dark }}>
        maketa<span style={{ color: dark ? C.blueSoft : C.blue }}>.es</span>
      </div>
    </div>
    <div
      style={{
        fontSize: 26,
        fontWeight: 800,
        letterSpacing: 3,
        color: dark ? C.blueSoft : C.blue,
      }}
    >
      {tag}
    </div>
  </div>
);

/** Animated mouse pointer that travels between points and clicks */
export const Cursor: React.FC<{
  path: { f: number; x: number; y: number; click?: boolean }[];
}> = ({ path }) => {
  const f = useCurrentFrame();
  const fs = path.map((p) => p.f);
  const x = interpolate(f, fs, path.map((p) => p.x), {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const y = interpolate(f, fs, path.map((p) => p.y), {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const clickScale = path
    .filter((p) => p.click)
    .reduce((s, p) => s * (f >= p.f && f < p.f + 8 ? 0.82 : 1), 1);
  const ripple = path.filter((p) => p.click).map((p) => {
    const t = f - p.f;
    if (t < 0 || t > 16) return null;
    return (
      <div
        key={p.f}
        style={{
          position: "absolute",
          left: p.x - 50,
          top: p.y - 50,
          width: 100,
          height: 100,
          borderRadius: 100,
          border: `5px solid ${C.blue}`,
          opacity: io(t, [0, 16], [0.8, 0]),
          scale: io(t, [0, 16], [0.3, 1.2]),
        }}
      />
    );
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 40 }}>
      {ripple}
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: x - 8,
          top: y - 4,
          scale: clickScale,
          filter: "drop-shadow(0 6px 10px rgba(22,26,48,.35))",
        }}
      >
        <path
          d="M4 2l15 9.5-6.6 1.5 3.8 7.2-3 1.6-3.8-7.3L4 19.5z"
          fill={C.dark}
          stroke={C.white}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </AbsoluteFill>
  );
};

/** Shared closing card */
export const EndCard: React.FC<{ title: string; sub: string; question?: string }> = ({
  title,
  sub,
  question,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: C.blue,
        fontFamily: SANS,
        color: C.white,
        padding: "0 80px",
        justifyContent: "center",
      }}
    >
      <Header tag="" dark />
      <Rise at={4}>
        <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
          {title}
        </div>
      </Rise>
      <Rise at={12}>
        <div style={{ fontSize: 48, fontWeight: 500, marginTop: 30, color: C.blueSoft }}>{sub}</div>
      </Rise>
      <Rise at={20}>
        <div
          style={{
            marginTop: 70,
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            background: C.white,
            color: C.blue,
            borderRadius: 100,
            padding: "30px 52px",
            fontSize: 54,
            fontWeight: 800,
            scale: io(f, [40, 48, 56], [1, 1.06, 1], ease),
          }}
        >
          maketa.es
        </div>
      </Rise>
      {question ? (
        <Rise at={34} style={{ position: "absolute", bottom: 210, left: 80, right: 80 }}>
          <div
            style={{
              borderTop: `3px solid rgba(255,255,255,.25)`,
              paddingTop: 40,
              fontSize: 50,
              fontWeight: 700,
            }}
          >
            {question}
          </div>
        </Rise>
      ) : null}
    </AbsoluteFill>
  );
};

/** Small uppercase label above a headline */
export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.blue }) => (
  <div style={{ fontFamily: SANS, fontSize: 30, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase", color }}>
    {children}
  </div>
);
