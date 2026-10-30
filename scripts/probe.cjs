const http = require("http");

const routes = {
  "/": ["SRIRAM", "VIDEO EDITOR", "OPEN TO WORK", "portrait-1200", "ENTER PLAYGROUND"],
  "/about": ["BEHIND THE SCREEN", "SRIRAM V", "PROJECTS"],
  "/journey": ["STILL", "BECOMING", "LEARN"],
  "/development/skills": ["TOOLS", "ReactFlow", "xyflow"],
  "/development": ["I BUILD", "SYSTEMS", "DebugStrip", "PATCH"],
  "/development/projects": ["BUILT", "nebula-commerce"],
  "/development/github": ["Its-sriramhere", "Sriram-portfolio", "8 public"],
  "/universe": ["Enter", "system", "Universe"],
  "/creative": ["STORIES MOVE", "WATCH SHOWREEL"],
  "/creative/showreel": ["SHOWREEL", "PLAY REEL"],
  "/creative/editing": ["CUT", "Neon Reel", "RAW FOOTAGE"],
  "/creative/motion": ["STATIC", "Typography"],
  "/creative/color-grading": ["COLOUR", "BEFORE", "AFTER"],
  "/playground": ["SIGNAL", "Memory Stack", "Escape Room"],
  "/playground/memory-stack": ["Memory Stack", "Hidden card"],
  "/playground/debug-matrix": ["DEBUG MATRIX", "TypeError"],
  "/playground/api-runner": ["API Runner", "SEND REQUEST"],
  "/playground/color-grade": ["MOOD", "WARM"],
  "/playground/motion-lab": ["MAKE IT MOVE", "PLAY ANIMATION"],
  "/playground/shot-builder": ["SHOT PROFILE", "CAMERA"],
  "/playground/transition-lab": ["TRANSITION", "GLITCH"],
  "/playground/editor-timeline": ["TIMELINE", "RENDER"],
  "/playground/escape-room": ["BREAK OUT", "UNLOCK"],
  "/ai-lab": ["IMAGINATION", "ASK THE LAB"],
  "/achievements": ["UNLOCKED", "CODE EXPLORER"],
  "/resume": ["SHORT", "VERSION", "SriramV-Resume.pdf"],
  "/contact": ["SOMETHING", "sriram.efx@gmail.com", "SEND TRANSMISSION"],
};

function get(path) {
  return new Promise((resolve) => {
    http.get({ host: "localhost", port: 3001, path, timeout: 25000 }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    }).on("error", (e) => resolve({ status: 0, body: "ERR:" + e.message }));
  });
}

(async () => {
  for (const [path, markers] of Object.entries(routes)) {
    const { status, body } = await get(path);
    const missing = markers.filter((m) => !body.toUpperCase().includes(m.toUpperCase()));
    console.log(`${status === 200 && missing.length === 0 ? "OK  " : "FAIL"} ${path} [${status}] ${missing.length ? "MISSING: " + missing.join(" | ") : ""} len=${body.length}`);
  }
})();
