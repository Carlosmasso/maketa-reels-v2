import React from "react";
import { C, SANS } from "./brand";

export type Biz = {
  name: string;
  kicker: string;
  headline: string;
  sub: string;
  cta: string;
  services: { t: string; d: string }[];
  bg: string;
  dark?: boolean;
};

// Accepts "#rrggbb" or "rgb(a)(...)" (interpolateColors returns the latter)
const tint = (color: string, a: number) => {
  if (color.startsWith("#")) {
    const n = parseInt(color.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  const [r, g, b] = color.replace(/[^\d,.]/g, "").split(",");
  return `rgba(${r},${g},${b},${a})`;
};

/** Abstract "photo" block so there are no stock images */
const Visual: React.FC<{ accent: string; h: number; r: number }> = ({ accent, h, r }) => (
  <div
    style={{
      height: h,
      borderRadius: r,
      background: `linear-gradient(140deg, ${tint(accent, 0.9)}, ${tint(accent, 0.45)})`,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", width: h * 0.9, height: h * 0.9, borderRadius: "50%", right: -h * 0.2, top: -h * 0.25, background: "rgba(255,255,255,.18)" }} />
    <div style={{ position: "absolute", width: h * 0.6, height: h * 0.6, borderRadius: "50%", left: -h * 0.15, bottom: -h * 0.3, background: "rgba(255,255,255,.12)" }} />
  </div>
);

export const SiteMock: React.FC<{
  biz: Biz;
  accent: string;
  headFont: string;
  services?: number; // 0..1 reveal
  scroll?: number;
  mode?: "mobile" | "desktop";
}> = ({ biz, accent, headFont, services = 1, scroll = 0, mode = "mobile" }) => {
  const m = mode === "mobile";
  const fg = biz.dark ? "#F4F1EA" : C.ink;
  const muted = biz.dark ? "rgba(244,241,234,.6)" : C.grey;
  const u = m ? 1 : 0.62; // unit scale for desktop
  const hw = headFont.includes("DMSerif") ? 400 : 800;
  return (
    <div style={{ width: "100%", height: "100%", background: biz.bg, overflow: "hidden", fontFamily: SANS, color: fg }}>
      <div style={{ translate: `0px ${-scroll}px` }}>
        {/* nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: m ? "34px 32px" : "22px 40px" }}>
          <div style={{ fontFamily: headFont, fontSize: 30 * u + (m ? 0 : 6), fontWeight: hw }}>{biz.name}</div>
          {!m ? (
            <div style={{ display: "flex", gap: 28, fontSize: 16, color: muted, fontWeight: 600 }}>
              <span>Servicios</span><span>Equipo</span><span>Contacto</span>
            </div>
          ) : null}
          <div style={{ background: accent, color: "#fff", borderRadius: 100, padding: m ? "12px 22px" : "10px 20px", fontSize: m ? 20 : 15, fontWeight: 700 }}>
            {biz.cta}
          </div>
        </div>
        {/* hero */}
        <div style={{ display: m ? "block" : "flex", gap: 36, padding: m ? "10px 32px 0" : "20px 40px 0", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: m ? 17 : 13, fontWeight: 800, letterSpacing: 2, color: accent }}>{biz.kicker.toUpperCase()}</div>
            <div style={{ fontFamily: headFont, fontSize: m ? 58 : 46, lineHeight: 1.05, fontWeight: hw, marginTop: 14, letterSpacing: headFont.includes("DMSerif") ? 0 : -1.5 }}>
              {biz.headline}
            </div>
            <div style={{ fontSize: m ? 22 : 16, lineHeight: 1.45, color: muted, marginTop: 18, fontWeight: 500 }}>{biz.sub}</div>
            <div style={{ display: "inline-block", marginTop: 26, background: accent, color: "#fff", borderRadius: 14, padding: m ? "18px 30px" : "14px 24px", fontSize: m ? 22 : 16, fontWeight: 700 }}>
              {biz.cta}
            </div>
          </div>
          <div style={{ flex: 1, marginTop: m ? 34 : 0 }}>
            <Visual accent={accent} h={m ? 300 : 290} r={m ? 26 : 20} />
          </div>
        </div>
        {/* services */}
        <div style={{ overflow: "hidden", maxHeight: services * (m ? 900 : 400), opacity: services }}>
          <div style={{ padding: m ? "50px 32px 0" : "40px 40px 0" }}>
            <div style={{ fontFamily: headFont, fontSize: m ? 38 : 28, fontWeight: hw }}>Servicios</div>
            <div style={{ display: m ? "block" : "flex", gap: 18, marginTop: 20 }}>
              {biz.services.map((s) => (
                <div key={s.t} style={{ flex: 1, display: "flex", gap: 18, alignItems: "center", background: biz.dark ? "rgba(255,255,255,.06)" : "#fff", border: `2px solid ${biz.dark ? "rgba(255,255,255,.08)" : C.line}`, borderRadius: 20, padding: m ? 22 : 16, marginBottom: m ? 16 : 0 }}>
                  <div style={{ width: m ? 58 : 42, height: m ? 58 : 42, borderRadius: 14, background: tint(accent, 0.15), flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: m ? 22 : 16, height: m ? 22 : 16, borderRadius: 6, background: accent }} />
                  </div>
                  <div>
                    <div style={{ fontSize: m ? 24 : 16, fontWeight: 700 }}>{s.t}</div>
                    <div style={{ fontSize: m ? 18 : 13, color: muted, marginTop: 4 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* contact */}
        <div style={{ margin: m ? "34px 32px" : "36px 40px", borderRadius: 24, background: accent, color: "#fff", padding: m ? 34 : 28 }}>
          <div style={{ fontFamily: headFont, fontSize: m ? 36 : 26, fontWeight: hw }}>¿Hablamos?</div>
          <div style={{ fontSize: m ? 20 : 15, opacity: 0.85, marginTop: 8 }}>Reserva en un minuto, sin llamadas.</div>
        </div>
      </div>
    </div>
  );
};

export const Phone: React.FC<{ w?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 560, children, style }) => (
  <div style={{ width: w, height: w * 2.05, borderRadius: w * 0.13, background: C.dark, padding: w * 0.028, boxShadow: "0 50px 90px rgba(22,26,48,.28)", ...style }}>
    <div style={{ width: "100%", height: "100%", borderRadius: w * 0.105, overflow: "hidden", position: "relative" }}>
      {children}
      <div style={{ position: "absolute", top: w * 0.025, left: "50%", marginLeft: -w * 0.13, width: w * 0.26, height: w * 0.06, borderRadius: 100, background: C.dark }} />
    </div>
  </div>
);

export const Browser: React.FC<{ w?: number; h?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 900, h = 600, children, style }) => (
  <div style={{ width: w, height: h, borderRadius: 26, background: "#fff", boxShadow: "0 40px 80px rgba(22,26,48,.22)", overflow: "hidden", display: "flex", flexDirection: "column", ...style }}>
    <div style={{ height: 46, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", borderBottom: `2px solid ${C.line}`, flexShrink: 0 }}>
      {["#F26B5B", "#F5C04E", "#5BC27A"].map((c) => (
        <div key={c} style={{ width: 14, height: 14, borderRadius: 14, background: c }} />
      ))}
    </div>
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
  </div>
);
