// Downloads vertical b-roll from Pexels into public/broll/<sector>.mp4 (10 s, 1080x1920, no audio).
// Usage: pnpm broll [sector...]   To change a clip, put another Pexels video ID below:
// the ID is the number at the end of the video page URL (pexels.com/video/<slug>-<ID>/). It must have a vertical version.
import { execFileSync } from "node:child_process";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const CLIPS = {
  dental: 5356419,
  peluqueria: 7383793,
  taller: 4489872,
  abogados: 7735908,
  boutique: 7680438,
};

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";
const sectors = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CLIPS);
await mkdir("public/broll", { recursive: true });

for (const sector of sectors) {
  const id = CLIPS[sector];
  if (!id) {
    console.warn(`${sector}: sin ID en CLIPS`);
    continue;
  }
  const res = await fetch(`https://www.pexels.com/download/video/${id}/?h=1920&w=1080`, { headers: { "User-Agent": UA }, redirect: "manual" });
  const file = res.headers.get("location");
  if (!file || !/_1080_(1920|2048)_/.test(file)) {
    console.warn(`${sector}: el vídeo ${id} no tiene versión vertical 1080x1920`);
    continue;
  }
  const raw = `public/broll/${sector}.raw.mp4`;
  const mp4 = await fetch(file, { headers: { "User-Agent": UA } });
  await writeFile(raw, Buffer.from(await mp4.arrayBuffer()));
  execFileSync("npx", ["remotion", "ffmpeg", "-loglevel", "error", "-y", "-i", raw, "-t", "10", "-an", "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920", "-c:v", "libx264", "-crf", "26", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", `public/broll/${sector}.mp4`]);
  await rm(raw);
  console.log(`${sector}: ok (${id})`);
}

const credits = Object.entries(CLIPS)
  .filter(([sector]) => existsSync(`public/broll/${sector}.mp4`))
  .map(([sector, id]) => `- ${sector}.mp4 — https://www.pexels.com/video/${id}/`);
await writeFile("public/broll/CREDITS.md", `# B-roll (Pexels License)\n\n${credits.join("\n")}\n`);
