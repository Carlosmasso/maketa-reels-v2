# maketa reels

Generador de reels de Instagram para [maketa.es](https://maketa.es), hecho con [Remotion](https://www.remotion.dev). Cada reel es una **plantilla** (el tipo de vídeo) más un **config** (el contenido), así que crear uno nuevo es escribir datos, no código.

La estrategia de contenido (qué publicar, cuándo y por qué) está en [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md).

## Empezar

```console
pnpm i
pnpm dev
```

`pnpm dev` abre Remotion Studio. Los reels aparecen agrupados en carpetas:

| Carpeta | Qué contiene |
|---|---|
| Plantillas | Un ejemplo de cada tipo de reel |
| Antes-Despues, Tips, Personas | Casos por sector (peluquería, dental, taller, abogados) |
| Portadas | La imagen de portada de cada reel |

En las plantillas, el panel **Props** de la derecha permite cambiar textos y colores en vivo para probar (no se guarda en el código).

## Publicar en Instagram

```console
pnpm publicar                      # los 15 reels
pnpm publicar ReelTips BA-Taller   # solo esos
pnpm publicar --sin-video          # solo portadas y textos (rápido)
```

Cada reel queda listo para subir en su carpeta:

```
out/reels/ReelTips/
├── ReelTips.mp4   vídeo 1080×1920, 30 fps, H.264
├── portada.png    portada (el texto cabe en el recorte 3:4 del perfil)
└── caption.txt    pie de foto con hashtags
```

`out/` no se sube a git: los textos y las portadas viven en `src/`.

## Carruseles

```console
pnpm carrusel                  # todos
pnpm carrusel web-que-vende    # solo ese
```

Genera `out/carruseles/<id>/01.png, 02.png…` (1080×1350, formato 4:5) y `caption.txt`. Cada carrusel se define en [src/carruseles.ts](src/carruseles.ts) como una lista de diapositivas:

| Tipo | Para qué |
|---|---|
| `portada` | Primera diapositiva: etiqueta y titular con una parte resaltada |
| `punto` | Consejo numerado automáticamente (01, 02…) con título y explicación |
| `dato` | Cifra grande con su fuente |
| `lista` | Título y lista con checks |
| `vs` | Comparativa en dos columnas |
| `cierre` | Llamada a la acción con maketa.es y pregunta para comentarios |

La portada usa el color de acento del carrusel, el cierre el azul de maketa y las del medio alternan claro y oscuro. Todas llevan contador, barra de progreso y "Desliza". En el Studio están en la carpeta *Carruseles*.

## Tipos de reel

| Tipo | Fichero | Para qué |
|---|---|---|
| Tips | `ReelTips.tsx` | Consejos numerados. Busca guardados |
| Stat | `ReelStat.tsx` | Un dato con su fuente y qué significa |
| Antes/Después | `ReelBeforeAfter.tsx` | Web antigua frente a la nueva |
| Testimonial | `ReelTestimonial.tsx` | Caso de cliente con resultado y cita |
| Persona | `ReelPersona.tsx` | Historia de una persona y su negocio |
| CTA | `ReelCTA.tsx` | Reel corto de conversión |
| Fisio, Precio | `ReelFisio.tsx`, `ReelPrecio.tsx` | Reels hechos a mano, con animaciones coreografiadas |

## Crear un reel nuevo

1. **Contenido:** añade el caso en [src/casos.tsx](src/casos.tsx), copiando uno existente del mismo tipo. TypeScript avisa si falta algún campo.
2. **Registro:** los casos de `CASOS_BEFOREAFTER`, `CASOS_TIPS` y `CASOS_PERSONA` aparecen solos en el Studio. Para otro tipo, añade un `<Composition>` en [src/Root.tsx](src/Root.tsx).
3. **Portada:** añade una entrada con el mismo id en [src/portadas.ts](src/portadas.ts).
4. **Pie de foto:** añade el texto con el mismo id en [src/captions.ts](src/captions.ts).
5. **Exportar:** `pnpm publicar <id>`.

Las duraciones se calculan solas según la cantidad de texto (`readFrames` en [src/reel.tsx](src/reel.tsx), unas 3,75 palabras por segundo). Para cambiar el ritmo de todos los reels, cambia ahí el `8` (fotogramas por palabra).

## Sectores, fotos y vídeos

Cada sector de `casos.tsx` define su web de ejemplo, su color, su vídeo de fondo y su presentador.

- **Fotos:** se cargan directamente desde Pexels con `pexelsPhoto(ID)`. El ID es el número final de la URL de la foto (`pexels.com/photo/<nombre>-<ID>/`). El segundo parámetro de `host()` es el encuadre de la cara, por ejemplo `"80% 40%"`.
- **Vídeos de fondo:** se guardan en `public/broll/`, recortados a 10 s. Para añadir o cambiar uno, pon el ID del vídeo de Pexels en `CLIPS` dentro de [scripts/broll.mjs](scripts/broll.mjs) y ejecuta:

  ```console
  pnpm broll peluqueria   # o sin argumentos para todos
  ```

  El vídeo tiene que tener versión vertical; si no, el script avisa. Si un vídeo falta, el reel usa el diseño sin vídeo. Los créditos quedan en `public/broll/CREDITS.md`.

## Identidad visual

Todo está en [src/brand.tsx](src/brand.tsx):

- **Tipografía:** Inter para todo el texto; JetBrains Mono solo para precios, cifras y numeración.
- **Colores:** azul maketa `#4353E0` en cabecera y cierre; cada reel puede tener su color de acento.
- **Cierre:** el icono de maketa se monta pieza a pieza (`LogoBuild`).

## Antes de publicar

- **Testimonios y personas reales:** Testimonial y Persona solo con clientes reales y con su permiso. Los ejemplos actuales (Laura, Nora, Antonio) son inventados y no se pueden publicar: los testimonios falsos son ilegales en la UE.
- **Presentadores de Pexels:** las fotos de Pexels sirven como presentadores ilustrativos, siempre con el sector como rol y nunca como clientes con nombre.
- **Cifras:** solo con fuente verificable.
- **Checklist completa:** en [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md).

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Abre Remotion Studio |
| `pnpm publicar` | Exporta vídeo, portada y pie de foto |
| `pnpm carrusel` | Exporta los carruseles (imágenes y pie de foto) |
| `pnpm broll` | Descarga los vídeos de fondo de Pexels |
| `pnpm lint` | Revisa tipos y estilo del código |
