import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PERSON_WIPE, Person, personWipe } from "./people";

export const FADE = 10;

// Time to read on a phone (~3.75 words/s at 30 fps) plus the entrance animation
export const readFrames = (text: string, entrance = 40) => entrance + text.trim().split(/\s+/).length * 8;

// EndCard text starts at frame 28 and the button pulses until 80
export const endFrames = (title: string, sub: string, question = "") =>
  Math.max(110, readFrames(`${title} ${sub}`, 50), question ? readFrames(question, 70) : 0);

// via: enter this scene through a full-screen card of that person instead of a fade
export type Scene = { name: string; dur: number; el: React.ReactNode; via?: Person };

const transitionDur = (s: Scene) => (s.via ? PERSON_WIPE : FADE);

export const reelDuration = (scenes: Scene[]) =>
  scenes.reduce((sum, s, i) => sum + s.dur - (i > 0 ? transitionDur(s) : 0), 0);

export const Reel: React.FC<{ scenes: Scene[] }> = ({ scenes }) => (
  <TransitionSeries>
    {scenes.flatMap((s, i) => [
      ...(i === 0
        ? []
        : s.via
          ? [<TransitionSeries.Transition key={`t${i}`} presentation={personWipe(s.via)} timing={linearTiming({ durationInFrames: PERSON_WIPE })} />]
          : [<TransitionSeries.Transition key={`t${i}`} presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />]),
      <TransitionSeries.Sequence key={s.name} name={s.name} durationInFrames={s.dur}>
        {s.el}
      </TransitionSeries.Sequence>,
    ])}
  </TransitionSeries>
);
