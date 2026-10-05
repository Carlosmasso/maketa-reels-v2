import { PortadaConfig } from "./Portada";
import { ABOGADOS, DENTAL, PELUQUERIA, TALLER } from "./casos";
import { C } from "./brand";
import { FISIO } from "./ReelFisio";
import { LUA } from "./ReelPrecio";
import { EJEMPLO_BEFOREAFTER } from "./ReelBeforeAfter";

const photoOf = (s: { host: { photo?: string; focus?: string } }) => ({ photo: s.host.photo, focus: s.host.focus });

// One cover per reel id (same ids as the compositions)
export const PORTADAS: Record<string, PortadaConfig> = {
  ReelFisio: { layout: "split", kicker: "Web en 30 segundos", title: "La web de una fisio.", highlight: "fisio", accent: "#16927F", bg: "light", visual: { kind: "phone", biz: FISIO } },
  ReelPrecio: { layout: "foco", kicker: "Diseñada en maketa", title: "¿Pagarías 249 € por esta web?", highlight: "249 €", accent: "#7D89FF", bg: "dark", visual: { kind: "phone", biz: LUA } },
  ReelTestimonial: { layout: "foco", kicker: "Caso real", title: "Vendía solo en la tienda física.", highlight: "solo", accent: "#E2725B", bg: "light", visual: { kind: "text", text: "“", sans: true } },
  ReelBeforeAfter: { layout: "titular", kicker: "Antes / después", title: "Misma panadería. Otra web.", highlight: "Otra web.", accent: "#C9A25E", bg: "dark", visual: { kind: "phone", biz: EJEMPLO_BEFOREAFTER.biz } },
  ReelTips: { layout: "titular", kicker: "Guárdalo", title: "3 errores que cuestan clientes.", highlight: "3 errores", accent: C.blue, bg: "blue", visual: { kind: "text", text: "×3" } },
  ReelStat: { layout: "centrado", kicker: "El dato", big: "53%", title: "abandona si tu web tarda más de 3 s.", accent: "#7D89FF", bg: "dark" },
  ReelCTA: { layout: "centrado", kicker: "Sin plantillas · sin registro", title: "Tú eliges cómo es.", highlight: "Tú", accent: C.blue, bg: "blue" },
  "BA-Peluqueria": { layout: "split", kicker: "Antes / después", title: "Misma peluquería. Otra web.", highlight: "Otra web.", accent: PELUQUERIA.accent, bg: "dark", visual: { kind: "phone", biz: PELUQUERIA.biz } },
  "BA-Dental": { layout: "titular", kicker: "Antes / después", title: "La web que da confianza.", highlight: "confianza.", accent: DENTAL.accent, bg: "dark", visual: { kind: "phone", biz: DENTAL.biz } },
  "BA-Taller": { layout: "foco", kicker: "Antes / después", title: "Un taller también puede tener buena web.", highlight: "buena web.", accent: TALLER.accent, bg: "dark", visual: { kind: "phone", biz: TALLER.biz } },
  "BA-Abogados": { layout: "split", kicker: "Antes / después", title: "Menos jerga. Más clientes.", highlight: "Más clientes.", accent: ABOGADOS.accent, bg: "dark", visual: { kind: "phone", biz: ABOGADOS.biz } },
  "Tips-Peluqueria": { layout: "foco", kicker: "Si tienes una peluquería", title: "3 cosas que tu web necesita ya.", highlight: "3 cosas", accent: PELUQUERIA.accent, bg: "dark", ...photoOf(PELUQUERIA) },
  "Tips-Dental": { layout: "split", kicker: "Si tienes una clínica", title: "El miedo se quita antes de la cita.", highlight: "antes de la cita.", accent: DENTAL.accent, bg: "dark", ...photoOf(DENTAL) },
  "Persona-Peluqueria": { layout: "titular", kicker: "Historias reales", title: "Ahora la agenda se llena sola.", highlight: "se llena sola.", accent: PELUQUERIA.accent, bg: "dark", visual: { kind: "phone", biz: PELUQUERIA.biz } },
  "Persona-Taller": { layout: "foco", kicker: "Historias reales", title: "Treinta años arreglando coches. Invisible en Google.", highlight: "Invisible en Google.", accent: TALLER.accent, bg: "dark", visual: { kind: "phone", biz: TALLER.biz } },
};
