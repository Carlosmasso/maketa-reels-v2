import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useVideoConfig } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { C, SANS, ease } from "./brand";

// photo: remote URL (e.g. pexelsPhoto(id)) or a path inside public/. focus: CSS object-position to keep the face in the square crop.
export type Person = { name: string; role: string; photo?: string; focus?: string; accent?: string };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const Avatar: React.FC<{ person: Person; size: number; radius?: number }> = ({ person, size, radius = size / 2 }) => {
  const accent = person.accent ?? C.blue;
  return (
    <div style={{ width: size, height: size, borderRadius: radius, overflow: "hidden", flexShrink: 0, background: `linear-gradient(150deg, ${accent}, ${C.dark})` }}>
      {person.photo ? (
        <Img
          src={person.photo.startsWith("http") ? person.photo : staticFile(person.photo)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: person.focus ?? "50% 30%" }}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 800, fontSize: size * 0.36, color: C.white, letterSpacing: -2 }}>
          {initials(person.name)}
        </div>
      )}
    </div>
  );
};

/** Full-screen card with the person: used inside the wipe and as a standalone scene */
export const PersonCard: React.FC<{ person: Person }> = ({ person }) => (
  <AbsoluteFill style={{ background: C.dark, alignItems: "center", justifyContent: "center", gap: 56 }}>
    <Avatar person={person} size={640} radius={72} />
    <div style={{ textAlign: "center", fontFamily: SANS }}>
      <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, color: C.white }}>{person.name}</div>
      <div style={{ fontSize: 42, fontWeight: 500, color: C.blueSoft, marginTop: 10 }}>{person.role}</div>
    </div>
  </AbsoluteFill>
);

// Card rises to cover the outgoing scene, holds so the face registers, then exits upwards revealing the next scene
const PersonWipe: React.FC<TransitionPresentationComponentProps<{ person: Person }>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
  passedProps,
}) => {
  const { height } = useVideoConfig();
  if (presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const q = interpolate(p, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 1], { easing: ease });
  const cardTop = height * (1 - 2 * q);
  const revealFrom = Math.max(0, cardTop + height);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(${revealFrom}px 0 0 0)` }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ translate: `0px ${cardTop}px` }}>
        <PersonCard person={passedProps.person} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const personWipe = (person: Person): TransitionPresentation<{ person: Person }> => ({
  component: PersonWipe,
  props: { person },
});

export const PERSON_WIPE = 48;
