import { Composition, Folder, Still } from "remotion";
import { ReelFisio, FISIO_DURATION } from "./ReelFisio";
import { ReelPrecio, PRECIO_DURATION } from "./ReelPrecio";
import { ReelTestimonial, TESTIMONIAL_DURATION, EJEMPLO_TESTIMONIAL } from "./ReelTestimonial";
import { ReelBeforeAfter, EJEMPLO_BEFOREAFTER, beforeAfterDuration } from "./ReelBeforeAfter";
import { ReelTips, EJEMPLO_TIPS, tipsDuration } from "./ReelTips";
import { ReelStat, STAT_DURATION, EJEMPLO_STAT } from "./ReelStat";
import { ReelCTA, CTA_DURATION, EJEMPLO_CTA } from "./ReelCTA";
import { ReelPersona, personaDuration } from "./ReelPersona";
import { CASOS_BEFOREAFTER, CASOS_PERSONA, CASOS_TIPS } from "./casos";
import { Portada } from "./Portada";
import { PORTADAS } from "./portadas";
import { Carrusel, CARRUSEL_SIZE } from "./Carrusel";
import { CARRUSELES } from "./carruseles";

const V = { fps: 30, width: 1080, height: 1920 };

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Plantillas">
      <Composition id="ReelFisio" component={ReelFisio} durationInFrames={FISIO_DURATION} {...V} />
      <Composition id="ReelPrecio" component={ReelPrecio} durationInFrames={PRECIO_DURATION} {...V} />
      <Composition id="ReelTestimonial" component={ReelTestimonial} durationInFrames={TESTIMONIAL_DURATION} defaultProps={{ config: EJEMPLO_TESTIMONIAL }} {...V} />
      <Composition
        id="ReelBeforeAfter"
        component={ReelBeforeAfter}
        durationInFrames={beforeAfterDuration(EJEMPLO_BEFOREAFTER)}
        defaultProps={{ config: EJEMPLO_BEFOREAFTER }}
        calculateMetadata={({ props }) => ({ durationInFrames: beforeAfterDuration(props.config) })}
        {...V}
      />
      <Composition
        id="ReelTips"
        component={ReelTips}
        durationInFrames={tipsDuration(EJEMPLO_TIPS)}
        defaultProps={{ config: EJEMPLO_TIPS }}
        calculateMetadata={({ props }) => ({ durationInFrames: tipsDuration(props.config) })}
        {...V}
      />
      <Composition id="ReelStat" component={ReelStat} durationInFrames={STAT_DURATION} defaultProps={{ config: EJEMPLO_STAT }} {...V} />
      <Composition id="ReelCTA" component={ReelCTA} durationInFrames={CTA_DURATION} defaultProps={{ config: EJEMPLO_CTA }} {...V} />
    </Folder>
    <Folder name="Antes-Despues">
      {CASOS_BEFOREAFTER.map(({ id, config }) => (
        <Composition key={id} id={id} component={ReelBeforeAfter} durationInFrames={beforeAfterDuration(config)} defaultProps={{ config }} {...V} />
      ))}
    </Folder>
    <Folder name="Tips">
      {CASOS_TIPS.map(({ id, config }) => (
        <Composition key={id} id={id} component={ReelTips} durationInFrames={tipsDuration(config)} defaultProps={{ config }} {...V} />
      ))}
    </Folder>
    <Folder name="Personas">
      {CASOS_PERSONA.map(({ id, config }) => (
        <Composition key={id} id={id} component={ReelPersona} durationInFrames={personaDuration(config)} defaultProps={{ config }} {...V} />
      ))}
    </Folder>
    <Folder name="Carruseles">
      {Object.entries(CARRUSELES).map(([id, data]) => (
        <Composition key={id} id={`Carrusel-${id}`} component={Carrusel} durationInFrames={data.slides.length} fps={1} defaultProps={{ data }} {...CARRUSEL_SIZE} />
      ))}
    </Folder>
    <Folder name="Portadas">
      {Object.entries(PORTADAS).map(([id, cover]) => (
        <Still key={id} id={`Portada-${id}`} component={Portada} defaultProps={cover} width={1080} height={1920} />
      ))}
    </Folder>
  </>
);
