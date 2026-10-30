const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public/images/src/IMG_8243.jpg");
const OUT = path.join(__dirname, "..", "public/images");
// Torso-up 4:5 window: 1800x2250 @ (644,938) — face upper-third right
const LEFT = 644, TOP = 938, W = 1800, H = 2250;

async function run() {
  const base = sharp(SRC).extract({ left: LEFT, top: TOP, width: W, height: H });
  await base.clone().resize(1200, 1500).jpeg({ quality: 82 }).toFile(path.join(OUT, "portrait-1200.jpg"));
  await base.clone().resize(900, 1125).jpeg({ quality: 80 }).toFile(path.join(OUT, "portrait-900.jpg"));
  await base.clone().resize(600, 750).jpeg({ quality: 78 }).toFile(path.join(OUT, "portrait-600.jpg"));
  await base.clone().resize(1200, 1500).webp({ quality: 80 }).toFile(path.join(OUT, "portrait-1200.webp"));
  await base.clone().resize(600, 750).webp({ quality: 78 }).toFile(path.join(OUT, "portrait-600.webp"));
  await base.clone().resize(32, 40).jpeg({ quality: 40 }).toBuffer().then((b) => {
    require("fs").writeFileSync(path.join(OUT, "portrait-blur.txt"), `data:image/jpeg;base64,${b.toString("base64")}`);
  });
  console.log("portrait crops done");
}

run().catch((e) => { console.error(e); process.exit(1); });
