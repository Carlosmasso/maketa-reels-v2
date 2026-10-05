// Exports Instagram carousels: out/carruseles/<id>/01.png, 02.png… + caption.txt
// Usage: pnpm carrusel [id...]   (ids as in src/carruseles.ts)
import { execFileSync } from "node:child_process";
import { mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { CARRUSELES } from "../src/carruseles.ts";

const pedidos = process.argv.slice(2);
const ids = pedidos.length ? pedidos : Object.keys(CARRUSELES);
const run = (args) => execFileSync("npx", ["remotion", ...args], { stdio: ["ignore", "ignore", "inherit"] });

run(["bundle", "src/index.ts", "--out-dir", "out/.bundle"]);
for (const id of ids) {
  const data = CARRUSELES[id];
  if (!data) {
    console.warn(`${id}: no existe en src/carruseles.ts`);
    continue;
  }
  const dir = `out/carruseles/${id}`;
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  // Each frame is a slide: render the whole composition as a PNG sequence in one go
  run(["render", "out/.bundle", `Carrusel-${id}`, dir, "--sequence", "--image-format=png", "--log=error"]);
  const frames = (await readdir(dir)).filter((f) => f.endsWith(".png")).sort();
  for (const [i, f] of frames.entries()) await rename(`${dir}/${f}`, `${dir}/${String(i + 1).padStart(2, "0")}.png`);
  await writeFile(`${dir}/caption.txt`, data.caption + "\n");
  console.log(`${id}: ${frames.length} diapositivas + caption.txt`);
}
