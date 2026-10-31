/* Image preparation for the owner-supplied chapter pages and expression sheet.
   Usage: node scripts/prepare-journey.cjs <chapter-directory> <expression-sheet> */
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const scenes = [
  ["01_the_coast_that_raised_me.png", [640, 1145, 365, 350], [20, 535, 980, 180]],
  ["02_small_things_big_questions.png", [25, 120, 975, 320], [20, 510, 980, 200]],
  ["03_a_bag_full_of_possibilities.png", [480, 475, 520, 230], [25, 115, 630, 250]],
  ["04_hello_coimbatore.png", [490, 285, 510, 325], [25, 710, 970, 290]],
  ["05_signals_circuits_possibilities.png", [25, 325, 970, 215], [25, 620, 970, 210]],
  ["06_the_wire_boss_battle.png", [25, 555, 970, 380], [25, 1050, 570, 350]],
  ["07_another_kind_of_building.png", [690, 100, 310, 340], [25, 515, 970, 160]],
  ["08_it_worked_a_minute_ago.png", [635, 505, 365, 300], [25, 865, 970, 110]],
  ["09_the_small_breakthrough.png", [25, 765, 970, 245], [650, 450, 340, 180]],
  ["10_stories_between_the_frames.png", [570, 305, 425, 250], [470, 645, 520, 240]],
  ["11_final_really_final.png", [25, 765, 970, 390], [25, 485, 490, 175]],
  ["12_still_becoming.png", [610, 1170, 385, 330], [25, 465, 970, 300]],
];
const rect = ([left, top, width, height]) => ({ left, top, width, height });

async function masked(source, crop, polygon, destination) {
  const { width, height } = rect(crop);
  const mask = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="${polygon}" fill="white"/></svg>`);
  const base = await sharp(source).extract(rect(crop)).ensureAlpha().png().toBuffer();
  const { data, info } = await sharp(base).composite([{ input: mask, blend: "dest-in" }]).raw().toBuffer({ resolveWithObject: true });
  // Remove only near-white paper connected to the outside of the ink mask.
  // Enclosed facial highlights stay intact; no generative face repainting is used.
  const seen = new Uint8Array(width * height), queue = new Int32Array(width * height);
  let head = 0, tail = 0;
  const visit = index => {
    if (seen[index]) return;
    const p = index * 4;
    if (data[p + 3] < 10 || (data[p] > 240 && data[p + 1] > 240 && data[p + 2] > 240)) {
      seen[index] = 1; queue[tail++] = index;
    }
  };
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (head < tail) {
    const index = queue[head++]; data[index * 4 + 3] = 0;
    const x = index % width, y = Math.floor(index / width);
    if (x > 0) visit(index - 1); if (x < width - 1) visit(index + 1);
    if (y > 0) visit(index - width); if (y < height - 1) visit(index + width);
  }
  await sharp(data, { raw: info }).webp({ quality: 88, alphaQuality: 100 }).toFile(destination);
}

async function main() {
  const [sourceDir, sheet] = process.argv.slice(2);
  if (!sourceDir || !sheet) throw new Error("Supply a chapter directory and expression sheet.");
  const output = path.resolve(__dirname, "../public/images/journey");
  await fs.mkdir(output, { recursive: true });
  const manifest = { source: "Owner-supplied twelve-chapter manga and expression reference", chapters: [], expressions: [] };
  for (let i = 0; i < scenes.length; i++) {
    const [file, world, detail] = scenes[i];
    const id = String(i + 1).padStart(2, "0");
    const source = path.join(sourceDir, file);
    await sharp(source).resize({ width: 960 }).webp({ quality: 80, effort: 5 }).toFile(path.join(output, `chapter-${id}.webp`));
    await sharp(source).extract(rect(world)).resize({ width: Math.min(world[2], 960) }).webp({ quality: 83, effort: 5 }).toFile(path.join(output, `world-${id}.webp`));
    await sharp(source).extract(rect(detail)).resize({ width: Math.min(detail[2], 800) }).webp({ quality: 82, effort: 5 }).toFile(path.join(output, `detail-${id}.webp`));
    manifest.chapters.push({ id, source: file, page: `chapter-${id}.webp`, world: `world-${id}.webp`, detail: `detail-${id}.webp`, worldCrop: world, detailCrop: detail });
  }

  // The sunglasses tile (row 2 / column 4) is deliberately excluded.
  const expressions = [
    ["joy", 12, 10], ["sadness", 394, 10], ["rage", 777, 10], ["shock", 1159, 10],
    ["fear", 12, 346], ["confusion", 394, 346], ["suspicion", 777, 346],
    ["embarrassment", 12, 677], ["determination", 394, 677], ["exhaustion", 777, 677], ["grief", 1159, 677],
  ];
  for (const [name, left, top] of expressions) {
    await sharp(sheet).extract({ left, top, width: 365, height: 288 }).resize({ width: 365 }).webp({ quality: 84 }).toFile(path.join(output, `expression-${name}.webp`));
    manifest.expressions.push(name);
  }
  // Ink-mask head used by the small articulated traveller, not a substitute for the chapter artwork.
  await masked(sheet, [394, 677, 365, 288], "M52 288L59 239 45 186 47 113 68 54 110 17 187 2 265 18 308 64 321 118 305 190 285 222 291 288Z", path.join(output, "traveller-head.webp"));
  await masked(path.join(sourceDir, scenes[0][0]), [20, 1130, 980, 385], "M288 350L281 315 289 275 298 221 323 181 340 157 345 132 346 106 354 80 352 56 370 34 391 22 420 20 442 34 446 59 437 88 432 105 444 122 458 139 481 150 487 174 484 197 501 209 522 219 536 243 540 275 557 298 556 326 535 343 492 351 463 342 429 338 402 334 369 350 330 349Z", path.join(output, "character-01.webp"));
  await masked(path.join(sourceDir, scenes[2][0]), [20, 420, 980, 300], "M0 276L1 223 27 191 70 165 123 147 177 137 201 125 209 100 213 70 227 36 252 12 280 0 326 0 348 14 357 33 352 56 366 70 371 94 361 112 348 126 370 139 383 164 390 200 414 239 430 279Z", path.join(output, "character-03.webp"));
  await masked(path.join(sourceDir, scenes[6][0]), [20, 1030, 980, 475], "M110 475L120 410 145 361 180 321 224 285 270 254 275 220 296 195 302 170Q282 145 286 112Q285 65 320 42Q342 20 370 15Q400 -6 433 0Q474 -4 510 24Q541 39 552 77Q568 100 560 137L544 161 544 181Q536 212 505 230L470 240 476 259 528 281 559 280 544 255 542 233 558 210Q583 189 604 207L619 216 634 251 646 275 658 300 670 331 690 370 710 475Z", path.join(output, "character-07.webp"));
  await masked(path.join(sourceDir, scenes[11][0]), [20, 1130, 980, 385], "M91 385L109 297 144 236 182 176 220 151 224 99 254 43 294 2 353 6 382 34 392 77 380 111 405 146 426 187 455 230 486 267 499 325 474 374 383 384Z", path.join(output, "character-12.webp"));
  await masked(path.join(sourceDir, scenes[4][0]), [20, 545, 530, 310], "M0 0L174 24 264 59 324 104 377 141 406 175 399 194 378 197 344 166 299 149 279 145 306 187 294 209 269 198 225 164 186 143 131 158 75 183 0 172Z", path.join(output, "prop-solder-hand.webp"));
  await masked(path.join(sourceDir, scenes[6][0]), [20, 505, 970, 180], "M0 5L232 7 351 0 424 9 470 29 502 63 529 102 513 132 494 119 472 84 441 65 442 107 429 145 412 135 399 87 377 67 347 69 299 93 210 104 111 121 0 118Z", path.join(output, "prop-typing-hand.webp"));

  const files = await fs.readdir(output);
  let total = 0;
  for (const file of files.filter(file => file.endsWith(".webp"))) total += (await fs.stat(path.join(output, file))).size;
  manifest.totalWebpBytes = total;
  await fs.writeFile(path.join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Prepared ${files.filter(file => file.endsWith('.webp')).length} WebP assets, ${(total / 1048576).toFixed(2)} MB. No eyewear expression exported.`);
}
main().catch(error => { console.error(error.message); process.exit(1); });
