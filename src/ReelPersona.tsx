import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, SANS, SERIF, Header, Kicker, Rise, EndCard, io, ease } from "./brand";
import { Reel, Scene, endFrames, readFrames, reelDuration } from "./reel";
import { Avatar, Person, PersonCard } from "./people";
import { Biz, Phone, SiteMock } from "./SiteMock";
import { BrollBg, brollFor } from "./media";

const TAG = "HISTORIAS REALES";

export type PersonaConfig = {
  person: Person;
  biz: Biz;
  accent: string;
  lines: string[];
  reveal: string;
  cta: string;
  broll?: string;
};

const Intro: React.FC<{ c: PersonaConfig }> = ({ c }) => {
  const clip = c.broll ? brollFor(c.broll) : undefined;
  if (!clip) {
    return (
      <AbsoluteFill>
        <PersonCard person={c.person} />
        <Rise at={8} style={{ position: "absolute", top: 220, left: 0, right: 0, textAlign: "center" }}>
          <Kicker color={C.blueSoft}>Conoce a</Kicker>
        </Rise>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ padding: "0 80px", justifyContent: "flex-end", paddingBottom: 260 }}>
      <BrollBg src={clip} dim={0.35} />
      <Header tag={TAG} dark />
      <Rise at={6}>
        <Kicker color={C.blueSoft}>Conoce a</Kicker>
      </Rise>
      <Rise at={12}>
        <div style={{ fontFamily: SANS, marginTop: 24 }}>
          <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -4, color: C.white, lineHeight: 1 }}>{c.person.name}</div>
          <div style={{ fontSize: 44, fontWeight: 500, color: C.blueSoft, marginTop: 14 }}>{c.person.role}</div>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

const lineFrames = (line: string) => readFrames(line, 16);
const lineStarts = (lines: string[]) => lines.map((_, i) => lines.slice(0, i).reduce((s, l) => s + lineFrames(l), 0));
const storyFrames = (lines: string[]) => lines.reduce((s, l) => s + lineFrames(l), 0) + 30;

// Lines appear one by one like subtitles; the previous one dims
const Story: React.FC<{ c: PersonaConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  const starts = lineStarts(c.lines);
  return (
    <AbsoluteFill style={{ background: C.bg, padding: "0 80px", justifyContent: "center" }}>
      <Header tag={TAG} />
      <div style={{ position: "absolute", top: 260, left: 80, display: "flex", alignItems: "center", gap: 22 }}>
        <Avatar person={c.person} size={96} />
        <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: C.dark }}>{c.person.name}</div>
      </div>
      {c.lines.map((t, i) => {
        const at = starts[i];
        const current = i === c.lines.length - 1 || f < starts[i + 1];
        return (
          <Rise key={t} at={at}>
            <div style={{ fontFamily: SANS, fontSize: 76, fontWeight: 800, lineHeight: 1.12, letterSpacing: -2, color: current ? C.dark : "#C5C9D8", marginBottom: 30 }}>
              {t}
            </div>
          </Rise>
        );
      })}
    </AbsoluteFill>
  );
};

const Site: React.FC<{ c: PersonaConfig }> = ({ c }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Header tag={TAG} />
      <div style={{ position: "absolute", top: 250, left: 80, right: 80 }}>
        <Rise at={0}>
          <div style={{ fontFamily: SANS, fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: C.dark }}>{c.reveal}</div>
        </Rise>
      </div>
      <div style={{ position: "absolute", left: 270, top: io(f, [6, 30], [1920, 560]) }}>
        <Phone w={540}>
          <SiteMock biz={c.biz} accent={c.accent} headFont={SERIF} scroll={io(f, [30, 140], [0, 1500], ease)} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

const scenes = (c: PersonaConfig): Scene[] => [
  { name: "Presentación", dur: c.broll && brollFor(c.broll) ? 110 : 70, el: <Intro c={c} /> },
  { name: "Historia", dur: storyFrames(c.lines), el: <Story c={c} /> },
  { name: "Su web", dur: 160, el: <Site c={c} /> },
  { name: "Cierre", dur: endFrames(c.cta, "Diseña la tuya gratis, sin registro."), el: <EndCard title={c.cta} sub="Diseña la tuya gratis, sin registro." /> },
];

export const personaDuration = (c: PersonaConfig) => reelDuration(scenes(c));

export const ReelPersona: React.FC<{ config: PersonaConfig }> = ({ config }) => <Reel scenes={scenes(config)} />;
