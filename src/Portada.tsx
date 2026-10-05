import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { C, MONO, SANS, Kicker, LogoMark } from "./brand";

export type PortadaConfig = {
  kicker: string;
  title: string;
  highlight?: string;
  big?: string;
  accent: string;
  bg: "blue" | "dark" | "light";
  photo?: string;
  focus?: string;
};

const BG = { blue: C.blue, dark: C.dark, light: C.bg };

// Instagram crops reel covers to 3:4 in the profile grid: keep everything inside y 240–1680
export const Portada: React.FC<PortadaConfig> = ({ kicker, title, highlight, big, accent, bg, photo, focus }) => {
  const onDark = bg !== "light" || !!photo;
  const fg = onDark ? C.white : C.dark;
  const hl = bg === "blue" && !photo ? C.blueSoft : accent;
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : [title];
  return (
    <AbsoluteFill style={{ background: BG[bg], fontFamily: SANS }}>
      {photo ? (
        <>
          <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: focus ?? "50% 30%" }} />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(22,26,48,.25) 0%, rgba(22,26,48,.55) 45%, rgba(22,26,48,.92) 100%)" }} />
        </>
      ) : null}
      <AbsoluteFill style={{ padding: photo ? "0 90px 420px" : "0 90px", justifyContent: photo ? "flex-end" : "center" }}>
        <div>
          <Kicker color={onDark ? (bg === "blue" && !photo ? C.blueSoft : accent) : accent}>{kicker}</Kicker>
          {big ? (
            <div style={{ fontFamily: MONO, fontSize: 300, fontWeight: 700, letterSpacing: -12, lineHeight: 1, color: hl, marginTop: 20 }}>{big}</div>
          ) : null}
          <div style={{ fontSize: big ? 84 : 128, fontWeight: 800, lineHeight: 1.0, letterSpacing: -4, color: fg, marginTop: 24 }}>
            {parts.length === 2 ? (
              <>
                {parts[0]}
                <span style={{ color: hl, whiteSpace: "nowrap" }}>{highlight}</span>
                {parts[1]}
              </>
            ) : (
              title
            )}
          </div>
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 90, bottom: 300, display: "flex", alignItems: "center", gap: 16 }}>
        <LogoMark size={56} bg={onDark ? C.white : C.blue} color={onDark ? C.blue : C.white} />
        <div style={{ fontSize: 40, fontWeight: 800, color: fg }}>
          maketa<span style={{ color: onDark ? C.blueSoft : C.blue }}>.es</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
