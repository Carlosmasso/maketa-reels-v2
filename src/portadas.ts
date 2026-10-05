import { PortadaConfig } from "./Portada";
import { ABOGADOS, DENTAL, PELUQUERIA, TALLER } from "./casos";
import { C } from "./brand";

const photoOf = (s: { host: { photo?: string; focus?: string } }) => ({ photo: s.host.photo, focus: s.host.focus });

// One cover per reel id (same ids as the compositions)
export const PORTADAS: Record<string, PortadaConfig> = {
  ReelFisio: { kicker: "Web en 30 segundos", title: "La web de una fisio.", highlight: "fisio", accent: "#16927F", bg: "light" },
  ReelPrecio: { kicker: "Diseñada en maketa", title: "¿Pagarías 249 € por esta web?", highlight: "249 €", accent: "#7D89FF", bg: "dark" },
  ReelTestimonial: { kicker: "Caso real", title: "Vendía solo en la tienda física.", highlight: "solo", accent: "#E2725B", bg: "light" },
  ReelBeforeAfter: { kicker: "Antes / después", title: "Misma panadería. Otra web.", highlight: "Otra web.", accent: "#C9A25E", bg: "dark" },
  ReelTips: { kicker: "Guárdalo", title: "3 errores que cuestan clientes.", highlight: "3 errores", accent: C.blue, bg: "blue" },
  ReelStat: { kicker: "El dato", big: "53%", title: "abandona si tu web tarda más de 3 s.", accent: "#7D89FF", bg: "dark" },
  ReelCTA: { kicker: "Sin plantillas · sin registro", title: "Tú eliges cómo es.", highlight: "Tú", accent: C.blue, bg: "blue" },
  "BA-Peluqueria": { kicker: "Antes / después", title: "Misma peluquería. Otra web.", highlight: "Otra web.", accent: PELUQUERIA.accent, bg: "dark", ...photoOf(PELUQUERIA) },
  "BA-Dental": { kicker: "Antes / después", title: "La web que da confianza.", highlight: "confianza.", accent: DENTAL.accent, bg: "dark", ...photoOf(DENTAL) },
  "BA-Taller": { kicker: "Antes / después", title: "Un taller también puede tener buena web.", highlight: "buena web.", accent: TALLER.accent, bg: "dark", ...photoOf(TALLER) },
  "BA-Abogados": { kicker: "Antes / después", title: "Menos jerga. Más clientes.", highlight: "Más clientes.", accent: "#8FB3D9", bg: "dark", ...photoOf(ABOGADOS) },
  "Tips-Peluqueria": { kicker: "Si tienes una peluquería", title: "3 cosas que tu web necesita ya.", highlight: "3 cosas", accent: PELUQUERIA.accent, bg: "dark", ...photoOf(PELUQUERIA) },
  "Tips-Dental": { kicker: "Si tienes una clínica", title: "El miedo se quita antes de la cita.", highlight: "antes de la cita.", accent: "#7CC4E8", bg: "dark", ...photoOf(DENTAL) },
  "Persona-Peluqueria": { kicker: "Historias reales", title: "Ahora la agenda se llena sola.", highlight: "se llena sola.", accent: PELUQUERIA.accent, bg: "dark" },
  "Persona-Taller": { kicker: "Historias reales", title: "Treinta años arreglando coches. Invisible en Google.", highlight: "Invisible en Google.", accent: TALLER.accent, bg: "dark" },
};
