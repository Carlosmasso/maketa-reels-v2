import { Biz } from "./SiteMock";
import { BeforeAfterConfig } from "./ReelBeforeAfter";
import { TipsConfig } from "./ReelTips";
import { PersonaConfig } from "./ReelPersona";
import { Person } from "./people";
import { pexelsPhoto } from "./media";

// Sector packs: each one feeds several reel types.
// host = Pexels stock photo, illustrative only: shown with the sector as role, never as a named client.
// Persona/Testimonial people must be real clients with consent (photo URL or file in public/) before publishing.

type Sector = { id: string; biz: Biz; accent: string; broll: string; host: Person };

const host = (photo: number, focus: string, name: string, role: string, accent: string): Person => ({ name, role, accent, focus, photo: pexelsPhoto(photo) });

export const PELUQUERIA: Sector = {
  broll: "peluqueria",
  host: host(3992875, "80% 40%", "Peluquerías", "Cómo vender más con tu web", "#B4637A"),
  id: "Peluqueria",
  accent: "#B4637A",
  biz: {
    name: "Studio Nora",
    kicker: "Peluquería y color",
    headline: "Tu color, sin sorpresas.",
    sub: "Diagnóstico de cabello gratis y cita online en 30 segundos.",
    cta: "Pedir cita",
    bg: "#FFFFFF",
    services: [
      { t: "Corte y peinado", d: "Mujer, hombre y niños" },
      { t: "Color y mechas", d: "Balayage, babylights, matiz" },
      { t: "Tratamientos", d: "Keratina e hidratación" },
    ],
    rating: { score: "4,9", count: "212 reseñas" },
    reviews: [
      { name: "Lucía M.", text: "Por fin un rubio que no se vuelve naranja." },
      { name: "Andrea P.", text: "Reservo desde Instagram en un momento." },
    ],
    contact: { address: "C/ Princesa 24, Madrid", phone: "911 234 567", hours: "M-S · 10:00–20:00" },
  },
};

export const DENTAL: Sector = {
  broll: "dental",
  host: host(19963126, "57% 30%", "Clínicas dentales", "Cómo vender más con tu web", "#2A8FBF"),
  id: "Dental",
  accent: "#2A8FBF",
  biz: {
    name: "Dental Sonríe",
    kicker: "Clínica dental",
    headline: "Sin miedo al dentista.",
    sub: "Primera visita y radiografía gratis. Financiación sin intereses.",
    cta: "Reservar visita",
    bg: "#FFFFFF",
    services: [
      { t: "Ortodoncia invisible", d: "Estudio 3D en la primera visita" },
      { t: "Implantes", d: "Con garantía de por vida" },
      { t: "Higiene y blanqueamiento", d: "En una sola sesión" },
    ],
    rating: { score: "4,8", count: "340 reseñas" },
    reviews: [
      { name: "Carlos D.", text: "Me explicaron el presupuesto sin letra pequeña." },
      { name: "Elena S.", text: "Mi hija ahora quiere volver. Eso lo dice todo." },
    ],
    contact: { address: "Av. Diagonal 410, Barcelona", phone: "932 000 111", hours: "L-V · 9:00–21:00" },
  },
};

export const TALLER: Sector = {
  broll: "taller",
  host: host(6870295, "60% 30%", "Talleres", "Cómo vender más con tu web", "#E07A1F"),
  id: "Taller",
  accent: "#E07A1F",
  biz: {
    name: "Talleres Ruiz",
    kicker: "Mecánica general",
    headline: "Presupuesto antes de tocar tu coche.",
    sub: "Pide cita online y te avisamos por WhatsApp cuando esté listo.",
    cta: "Pedir presupuesto",
    bg: "#16191D",
    dark: true,
    services: [
      { t: "Revisión e ITV", d: "Pre-ITV gratis con la revisión" },
      { t: "Frenos y neumáticos", d: "Montaje en el día" },
      { t: "Diagnosis", d: "Todas las marcas" },
    ],
    rating: { score: "4,7", count: "96 reseñas" },
    reviews: [
      { name: "Pablo T.", text: "Precio cerrado y cumplido. Sin sustos." },
      { name: "Rosa V.", text: "Me mandaron fotos de la pieza cambiada." },
    ],
    contact: { address: "Pol. Ind. Norte, nave 7, Valencia", phone: "963 111 222", hours: "L-V · 8:00–19:00" },
  },
};

export const ABOGADOS: Sector = {
  broll: "abogados",
  host: host(8111876, "35% 30%", "Despachos", "Cómo vender más con tu web", "#3E5C76"),
  id: "Abogados",
  accent: "#3E5C76",
  biz: {
    name: "Vega Abogados",
    kicker: "Derecho laboral y familia",
    headline: "Primera consulta, sin compromiso.",
    sub: "Te decimos en 24 h si tu caso tiene recorrido y cuánto costaría.",
    cta: "Consultar caso",
    bg: "#FAF8F4",
    services: [
      { t: "Despidos", d: "Reclamaciones e indemnizaciones" },
      { t: "Divorcios", d: "De mutuo acuerdo y contenciosos" },
      { t: "Herencias", d: "Testamentos y particiones" },
    ],
    rating: { score: "5,0", count: "58 reseñas" },
    reviews: [
      { name: "Miguel A.", text: "Claros desde el primer correo. Y ganamos." },
      { name: "Sara L.", text: "Me sentí escuchada en un momento muy duro." },
    ],
    contact: { address: "C/ Colón 3, Sevilla", phone: "954 222 333", hours: "L-V · 9:00–18:00" },
  },
};

const fromSector = (s: Sector, hook: string, flaws: string[], cta: string): BeforeAfterConfig => ({
  biz: s.biz,
  accent: s.accent,
  broll: s.broll,
  host: { ...s.host, role: "Así queda su web con maketa" },
  hook,
  beforeFlaws: flaws,
  cta,
});

export const CASOS_BEFOREAFTER: { id: string; config: BeforeAfterConfig }[] = [
  { id: "BA-Peluqueria", config: fromSector(PELUQUERIA, "Misma peluquería. Otra web.", ["Precios en una foto borrosa", "Citas solo por teléfono", "Cero fotos de trabajos"], "¿Tu web enseña lo que sabes hacer?") },
  { id: "BA-Dental", config: fromSector(DENTAL, "La web que da confianza antes de entrar.", ["Parece de 2010", "No dice cuánto cuesta nada", "El teléfono, escondido abajo"], "¿Tu clínica transmite confianza online?") },
  { id: "BA-Taller", config: fromSector(TALLER, "Un taller también puede tener buena web.", ["Solo una página de Facebook", "Sin horario ni ubicación clara", "Nadie sabe qué reparáis"], "¿Te encuentran cuando buscan taller?") },
  { id: "BA-Abogados", config: fromSector(ABOGADOS, "Menos jerga. Más clientes.", ["Textos legales que nadie entiende", "Sin forma de contactar rápido", "Ninguna opinión de clientes"], "¿Tu web habla como tus clientes?") },
];

export const CASOS_TIPS: { id: string; config: TipsConfig }[] = [
  {
    id: "Tips-Peluqueria",
    config: {
      kicker: "Si tienes una peluquería",
      hook: "3 cosas que tu web necesita ya.",
      tips: [
        { t: "Fotos de antes y después.", d: "Es lo primero que buscan. Una galería vende más que cualquier texto." },
        { t: "Cita online 24 h.", d: "Mucha gente reserva de noche, cuando ya has cerrado. Que tu web atienda por ti." },
        { t: "Precios orientativos.", d: "\"Desde 35 €\" quita el miedo a preguntar." },
      ],
      cta: "Haz la web de tu peluquería.",
      question: "¿Cuál te falta? Te leo en comentarios.",
    },
  },
  {
    id: "Tips-Dental",
    config: {
      kicker: "Si tienes una clínica",
      hook: "El miedo se quita antes de la cita.",
      tips: [
        { t: "Pon caras al equipo.", d: "Fotos reales del equipo y la clínica. La confianza empieza por ver a quién vas." },
        { t: "Explica el primer día.", d: "Qué pasa en la primera visita, paso a paso. Menos incertidumbre, más citas." },
        { t: "Financiación, visible.", d: "Si ofreces pagar a plazos, dilo arriba. Es la objeción número uno." },
      ],
      cta: "Haz la web de tu clínica.",
      question: "¿Qué te frena a ti al ir al dentista?",
    },
  },
];

export const CASOS_PERSONA: { id: string; config: PersonaConfig }[] = [
  {
    id: "Persona-Peluqueria",
    config: {
      person: { name: "Nora Castillo", role: "Studio Nora · Madrid", accent: PELUQUERIA.accent },
      biz: PELUQUERIA.biz,
      accent: PELUQUERIA.accent,
      lines: ["Contestaba WhatsApps hasta medianoche.", "Cada cita eran diez mensajes.", "Quería una web que reservara por mí."],
      reveal: "Ahora la agenda se llena sola.",
      cta: "¿Y tu agenda?",
      broll: PELUQUERIA.broll,
    },
  },
  {
    id: "Persona-Taller",
    config: {
      person: { name: "Antonio Ruiz", role: "Talleres Ruiz · Valencia", accent: TALLER.accent },
      biz: TALLER.biz,
      accent: TALLER.accent,
      lines: ["Treinta años arreglando coches.", "Pero si me buscabas en Google, no salía.", "Los clientes nuevos se iban a la competencia."],
      reveal: "Ahora me encuentran.",
      cta: "¿Te encuentran a ti?",
      broll: TALLER.broll,
    },
  },
];
