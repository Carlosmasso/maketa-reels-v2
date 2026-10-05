import { Composition } from "remotion";
import { ReelFisio, FISIO_DURATION } from "./ReelFisio";
import { ReelPrecio, PRECIO_DURATION } from "./ReelPrecio";
import { ReelTestimonial, TESTIMONIAL_DURATION, EJEMPLO_TESTIMONIAL } from "./ReelTestimonial";
import { ReelBeforeAfter, BEFOREAFTER_DURATION, EJEMPLO_BEFOREAFTER } from "./ReelBeforeAfter";
import { ReelTips, EJEMPLO_TIPS, tipsDuration } from "./ReelTips";
import { ReelStat, STAT_DURATION, EJEMPLO_STAT } from "./ReelStat";
import { ReelCTA, CTA_DURATION, EJEMPLO_CTA } from "./ReelCTA";

const V = { fps: 30, width: 1080, height: 1920 };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ReelFisio" component={ReelFisio} durationInFrames={FISIO_DURATION} {...V} />
    <Composition id="ReelPrecio" component={ReelPrecio} durationInFrames={PRECIO_DURATION} {...V} />
    <Composition id="ReelTestimonial" component={ReelTestimonial} durationInFrames={TESTIMONIAL_DURATION} defaultProps={{ config: EJEMPLO_TESTIMONIAL }} {...V} />
    <Composition id="ReelBeforeAfter" component={ReelBeforeAfter} durationInFrames={BEFOREAFTER_DURATION} defaultProps={{ config: EJEMPLO_BEFOREAFTER }} {...V} />
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
  </>
);
