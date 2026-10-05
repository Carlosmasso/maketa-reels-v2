// Exports, per reel, everything to post on Instagram: out/reels/<id>/<id>.mp4 + portada.png + caption.txt
// Usage: pnpm publicar [id...] [--sin-video]   (ids as in Remotion Studio, e.g. ReelTips BA-Taller)
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { CAPTIONS } from "../src/captions.ts";

const args = process.argv.slice(2);
const conVideo = !args.includes("--sin-video");
const pedidos = args.filter((a) => !a.startsWith("--"));
const ids = pedidos.length ? pedidos : Object.keys(CAPTIONS);
const run = (args) => execFileSync("npx", ["remotion", ...args], { stdio: ["ignore", "ignore", "inherit"] });

run(["bundle", "src/index.ts", "--out-dir", "out/.bundle"]);
for (const id of ids) {
  if (!CAPTIONS[id]) {
    console.warn(`${id}: sin caption en src/captions.ts`);
    continue;
  }
  await mkdir(`out/reels/${id}`, { recursive: true });
  await writeFile(`out/reels/${id}/caption.txt`, CAPTIONS[id] + "\n");
  run(["still", "out/.bundle", `Portada-${id}`, `out/reels/${id}/portada.png`, "--log=error"]);
  if (conVideo) run(["render", "out/.bundle", id, `out/reels/${id}/${id}.mp4`, "--codec=h264", "--crf=18", "--log=error"]);
  console.log(`${id}: ${conVideo ? `${id}.mp4 + ` : ""}portada.png + caption.txt`);
}
