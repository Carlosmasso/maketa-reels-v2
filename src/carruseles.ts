// Instagram carousels (1080x1350). Plain data (no imports) so scripts/carrusel.mjs can read it with Node.
// Each slide is one image; `pnpm carrusel [id]` exports them to out/carruseles/<id>/.

export type Slide =
  | { t: "portada"; kicker: string; title: string; highlight?: string }
  | { t: "punto"; title: string; body: string }
  | { t: "dato"; big: string; text: string; source?: string }
  | { t: "lista"; title: string; items: string[] }
  | { t: "vs"; title: string; left: { label: string; items: string[] }; right: { label: string; items: string[] } }
  | { t: "cierre"; title: string; sub: string; question?: string };

export type Carrusel = { accent: string; slides: Slide[]; caption: string };

const TAGS = "#diseñoweb #paginaweb #pequeñonegocio #emprendedores #negociolocal #maketa";

export const CARRUSELES: Record<string, Carrusel> = {
  "web-que-vende": {
    accent: "#4353E0",
    slides: [
      { t: "portada", kicker: "Guárdalo", title: "5 cosas que tu web necesita para vender.", highlight: "para vender." },
      { t: "punto", title: "Qué haces, en 3 segundos.", body: "Un titular arriba del todo que diga qué ofreces y para quién. Si hay que hacer scroll para entenderlo, se van." },
      { t: "punto", title: "Un solo botón de contacto.", body: "Llamar, reservar o pedir presupuesto: elige uno, hazlo visible y repítelo al bajar." },
      { t: "punto", title: "Pensada para el móvil.", body: "La mayoría de visitas llegan desde el teléfono. Diseña primero para él y después para el ordenador." },
      { t: "punto", title: "Prueba de que eres de fiar.", body: "Reseñas reales, fotos de tu trabajo y caras del equipo. La confianza vende más que cualquier texto." },
      { t: "punto", title: "Dónde y cuándo.", body: "Dirección, horario y teléfono a la vista. Es lo que más se busca y lo que más se esconde." },
      { t: "cierre", title: "¿Cuántas cumple tu web?", sub: "Diseña una que cumpla las cinco, gratis y sin registro.", question: "Dime el número en comentarios 👇" },
    ],
    caption: `5 cosas que tu web necesita para vender (guárdalo para cuando la revises) 💾

1. Qué haces, en 3 segundos
2. Un solo botón de contacto
3. Pensada para el móvil
4. Prueba de que eres de fiar
5. Dónde y cuándo

¿Cuántas cumple la tuya? Dime el número en comentarios 👇
👉 Diseña una que cumpla las cinco en maketa.es

${TAGS} #consejosweb #marketingdigital`,
  },
  "instagram-vs-web": {
    accent: "#E2725B",
    slides: [
      { t: "portada", kicker: "Pregunta sincera", title: "¿Basta con Instagram o necesito web?", highlight: "web?" },
      { t: "vs", title: "Cada uno hace una cosa.", left: { label: "Instagram", items: ["Te descubren", "Enseñas el día a día", "Hablas con tu comunidad"] }, right: { label: "Tu web", items: ["Te encuentran en Google", "Reservan o compran solos", "Es tuya, sin algoritmo"] } },
      { t: "punto", title: "Instagram no es tuyo.", body: "Si cambia el algoritmo o te bloquean la cuenta, pierdes el escaparate. Tu web sigue ahí." },
      { t: "punto", title: "En Google no sale tu perfil.", body: "Quien busca \"peluquería cerca de mí\" encuentra webs y fichas de Google, no publicaciones." },
      { t: "punto", title: "Los DMs no escalan.", body: "Responder precios y horarios uno a uno te quita horas. Una web lo responde por ti, también de noche." },
      { t: "lista", title: "La combinación que funciona:", items: ["Instagram para que te descubran", "Enlace a tu web en la bio", "La web cierra la reserva o la venta"] },
      { t: "cierre", title: "Usa los dos.", sub: "Diseña tu web gratis y ponla en tu bio hoy.", question: "¿Tú vendes más por DM o por web? 👇" },
    ],
    caption: `¿Basta con Instagram o necesito una web? 🤔

Instagram sirve para que te descubran. Tu web, para que te encuentren en Google y te compren sin escribirte.

Lo que mejor funciona: Instagram para atraer, enlace en la bio y la web cierra la venta.

¿Tú vendes más por DM o por web? Te leo 👇
👉 Diseña la tuya gratis en maketa.es

${TAGS} #instagramparanegocios #redessociales`,
  },
  "checklist-antes-de-publicar": {
    accent: "#16927F",
    slides: [
      { t: "portada", kicker: "Checklist", title: "Antes de publicar tu web, revisa esto.", highlight: "revisa esto." },
      { t: "lista", title: "Contenido", items: ["Titular claro arriba", "Servicios con precio orientativo", "Fotos reales, no de banco", "Textos sin faltas"] },
      { t: "lista", title: "Contacto", items: ["Botón visible en cada pantalla", "Teléfono que se pulsa y llama", "Dirección con mapa", "Horario actualizado"] },
      { t: "lista", title: "Móvil", items: ["Se lee sin hacer zoom", "Los botones se pulsan con el dedo", "Carga rápido con datos", "Nada se sale de la pantalla"] },
      { t: "lista", title: "Confianza", items: ["Reseñas de clientes reales", "Aviso legal y privacidad", "Dominio propio (.es o .com)", "Redes enlazadas"] },
      { t: "cierre", title: "¿Lo cumple todo?", sub: "Diseña la tuya gratis en maketa y repásala con esta lista.", question: "Guárdalo y revísalo con tu web abierta 💾" },
    ],
    caption: `Checklist antes de publicar tu web ✅ Guárdalo y repásalo con tu web abierta.

✔️ Contenido: titular claro, precios orientativos, fotos reales
✔️ Contacto: botón visible, teléfono que llama, mapa y horario
✔️ Móvil: se lee sin zoom, botones grandes, carga rápida
✔️ Confianza: reseñas reales, aviso legal, dominio propio

¿Cuál se te había pasado? 👇
👉 Diseña la tuya gratis en maketa.es

${TAGS} #checklist #consejosweb`,
  },
};
