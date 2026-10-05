import React from "react";
import { C, SANS, SERIF } from "./brand";

export type Biz = {
  name: string;
  kicker: string;
  headline: string;
  sub: string;
  cta: string;
  services: { t: string; d: string }[];
  bg: string;
  dark?: boolean;
  rating?: { score: string; count: string };
  reviews?: { name: string; text: string }[];
  contact?: { address: string; phone: string; hours: string };
};

const DEFAULT_REVIEWS = [
  { name: "Marta G.", text: "Reservé desde el móvil en un minuto. Todo clarísimo." },
  { name: "Javier R.", text: "Trato de diez y la web te explica todo antes de ir." },
];
const DEFAULT_CONTACT = { address: "C/ Mayor 12, Madrid", phone: "910 000 000", hours: "L-V · 9:00–20:00" };

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

const Stars: React.FC<{ accent: string; size: number }> = ({ accent, size }) => (
  <div style={{ display: "flex", gap: size * 0.2 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill={accent} />
      </svg>
    ))}
  </div>
);

/** Stylised street map with a pin, no external tiles */
const MapBlock: React.FC<{ accent: string; dark?: boolean; h: number }> = ({ accent, dark, h }) => (
  <div style={{ height: h, borderRadius: 18, overflow: "hidden", position: "relative", background: dark ? "#2A312D" : "#EEF0F4" }}>
    {[0.22, 0.58, 0.85].map((y) => (
      <div key={y} style={{ position: "absolute", left: 0, right: 0, top: `${y * 100}%`, height: h * 0.06, background: dark ? "#3A423D" : "#fff" }} />
    ))}
    {[0.3, 0.7].map((x) => (
      <div key={x} style={{ position: "absolute", top: 0, bottom: 0, left: `${x * 100}%`, width: h * 0.07, background: dark ? "#3A423D" : "#fff" }} />
    ))}
    <div style={{ position: "absolute", left: "50%", top: "40%", width: h * 0.16, height: h * 0.16, marginLeft: -h * 0.08, borderRadius: "50% 50% 50% 0", rotate: "-45deg", background: accent, boxShadow: `0 0 0 ${h * 0.06}px ${tint(accent, 0.2)}` }} />
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
  const serif = headFont === SERIF;
  const hw = serif ? 600 : 800;
  const ls = serif ? -0.5 : -1.5;
  const card = { background: biz.dark ? "rgba(255,255,255,.06)" : "#fff", border: `2px solid ${biz.dark ? "rgba(255,255,255,.08)" : C.line}`, borderRadius: 20 };
  const reviews = biz.reviews ?? DEFAULT_REVIEWS;
  const contact = biz.contact ?? DEFAULT_CONTACT;
  const rating = biz.rating ?? { score: "4,9", count: "128 reseñas" };
  const pad = m ? "0 32px" : "0 40px";
  const h2 = { fontFamily: headFont, fontSize: m ? 38 : 28, fontWeight: hw, letterSpacing: ls };
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
            <div style={{ fontFamily: headFont, fontSize: m ? 58 : 46, lineHeight: 1.05, fontWeight: hw, marginTop: 14, letterSpacing: ls }}>
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
        {/* rating */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: m ? "28px 32px 0" : "24px 40px 0", fontSize: m ? 19 : 14, fontWeight: 700 }}>
          <Stars accent={accent} size={m ? 20 : 15} />
          <span>{rating.score}</span>
          <span style={{ color: muted, fontWeight: 500 }}>· {rating.count}</span>
        </div>
        {/* services */}
        <div style={{ overflow: "hidden", maxHeight: services * (m ? 900 : 400), opacity: services }}>
          <div style={{ padding: m ? "50px 32px 0" : "40px 40px 0" }}>
            <div style={h2}>Servicios</div>
            <div style={{ display: m ? "block" : "flex", gap: 18, marginTop: 20 }}>
              {biz.services.map((s) => (
                <div key={s.t} style={{ ...card, flex: 1, display: "flex", gap: 18, alignItems: "center", padding: m ? 22 : 16, marginBottom: m ? 16 : 0 }}>
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
        {/* reviews */}
        <div style={{ padding: pad, marginTop: m ? 50 : 40 }}>
          <div style={h2}>Lo que dicen</div>
          <div style={{ display: m ? "block" : "flex", gap: 18, marginTop: 20 }}>
            {reviews.map((r) => (
              <div key={r.name} style={{ ...card, flex: 1, padding: m ? 24 : 18, marginBottom: m ? 16 : 0 }}>
                <Stars accent={accent} size={m ? 16 : 12} />
                <div style={{ fontSize: m ? 20 : 14, lineHeight: 1.45, marginTop: 12 }}>“{r.text}”</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
                  <div style={{ width: m ? 36 : 26, height: m ? 36 : 26, borderRadius: 40, background: tint(accent, 0.2), color: accent, fontSize: m ? 15 : 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {r.name[0]}
                  </div>
                  <div style={{ fontSize: m ? 17 : 13, fontWeight: 700, color: muted }}>{r.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* contact */}
        <div style={{ padding: pad, marginTop: m ? 40 : 36 }}>
          <div style={h2}>Contacto</div>
          <div style={{ display: m ? "block" : "flex", gap: 18, marginTop: 20 }}>
            <div style={{ ...card, flex: 1, padding: m ? 24 : 18 }}>
              {["Nombre", "Teléfono"].map((ph) => (
                <div key={ph} style={{ border: `2px solid ${biz.dark ? "rgba(255,255,255,.12)" : C.line}`, borderRadius: 12, padding: m ? "16px 18px" : "12px 14px", fontSize: m ? 19 : 14, color: muted, marginBottom: 12 }}>
                  {ph}
                </div>
              ))}
              <div style={{ background: accent, color: "#fff", borderRadius: 12, padding: m ? "17px 0" : "12px 0", textAlign: "center", fontSize: m ? 20 : 15, fontWeight: 700 }}>{biz.cta}</div>
            </div>
            <div style={{ flex: 1, marginTop: m ? 16 : 0 }}>
              {[contact.address, contact.phone, contact.hours].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: m ? 20 : 14, fontWeight: 600, marginBottom: m ? 14 : 10 }}>
                  <div style={{ width: m ? 12 : 9, height: m ? 12 : 9, borderRadius: 3, background: accent, flexShrink: 0 }} />
                  {t}
                </div>
              ))}
              <MapBlock accent={accent} dark={biz.dark} h={m ? 220 : 150} />
            </div>
          </div>
        </div>
        {/* footer */}
        <div style={{ marginTop: m ? 50 : 40, padding: m ? "34px 32px 60px" : "24px 40px 40px", borderTop: `2px solid ${biz.dark ? "rgba(255,255,255,.08)" : C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: headFont, fontSize: m ? 24 : 18, fontWeight: hw }}>{biz.name}</div>
          <div style={{ fontSize: m ? 15 : 12, color: muted }}>Hecha con maketa.es</div>
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
