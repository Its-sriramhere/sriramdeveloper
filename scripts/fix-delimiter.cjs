const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "components", "fx", "SplitFlapText.tsx");
let content = fs.readFileSync(file, "utf8");
const before = content;
content = content.replace(
  /const phrasesKey = .*?;/,
  'const phrasesKey = typeof text === "string" ? text : sourceWords.map((w) => String(w ?? "")).join("\\u001F");'
);
content = content.replace(
  /const phrases = useMemo\(\(\) => phrasesKey\.split\(.*?\), \[phrasesKey\]\);/,
  'const phrases = useMemo(() => phrasesKey.split("\\u001F"), [phrasesKey]);'
);
if (content === before) {
  console.error("NO MATCH - file unchanged");
  process.exit(1);
}
fs.writeFileSync(file, content);
console.log("delimiter normalized");
