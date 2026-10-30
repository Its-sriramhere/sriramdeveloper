/* Exercise the real route with a mocked provider. Never sends a real email. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const ts = require("typescript");

const routePath = path.join(__dirname, "../app/api/contact/route.ts");
const source = ts.transpileModule(fs.readFileSync(routePath, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function loadRoute({ configured = true, provider = async () => Response.json({ id: "email-test-id" }) } = {}) {
  const module = { exports: {} };
  const calls = [];
  const context = vm.createContext({
    module, exports: module.exports, require: createRequire(routePath), Request, Response, Headers, AbortSignal, URL,
    process: { env: configured ? { RESEND_API_KEY: "test-key-not-a-secret", CONTACT_FROM_EMAIL: "Portfolio <test@example.com>" } : {} },
    fetch: async (url, options) => { assert.equal(url, "https://api.resend.com/emails"); calls.push(options); return provider(url, options); },
  });
  vm.runInContext(source, context, { filename: routePath });
  return { POST: module.exports.POST, calls };
}

const valid = { name: "Test Visitor", email: "visitor@example.com", subject: "A frontend experience", message: "I would like to discuss a project with you.", website: "" };
function request(body = valid, headers = {}) {
  return new Request("https://portfolio.example/api/contact", { method: "POST", headers: { "Content-Type": "application/json", origin: "https://portfolio.example", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}

(async () => {
  let route = loadRoute();
  let response = await route.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  const sent = JSON.parse(route.calls[0].body);
  assert.deepEqual(sent.to, ["sriram.efx@gmail.com"]);
  assert.equal(sent.reply_to, valid.email);
  assert.equal(sent.from, "Portfolio <test@example.com>");
  assert(sent.text.includes(valid.message));
  assert.equal(sent.html, undefined);
  console.log("PASS accepted provider send, exact recipient, reply-to and plain-text content");

  route = loadRoute({ configured: false });
  response = await route.POST(request());
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /sriram\.efx@gmail\.com/);
  assert.equal(route.calls.length, 0);
  console.log("PASS missing credentials never reports delivery success");

  route = loadRoute();
  assert.equal((await route.POST(request({ ...valid, email: "invalid" }))).status, 400);
  assert.equal((await route.POST(request({ ...valid, message: "short" }))).status, 400);
  assert.equal((await route.POST(request({ ...valid, website: "filled-by-bot" }))).status, 400);
  assert.equal((await route.POST(request("not-json"))).status, 400);
  assert.equal((await route.POST(request(valid, { origin: "https://other.example" }))).status, 403);
  assert.equal((await route.POST(request(valid, { "content-length": "90000" }))).status, 413);
  assert.equal(route.calls.length, 0);
  console.log("PASS validation, malformed body, origin and body-size checks");

  for (const provider of [
    async () => Response.json({ message: "provider rejection" }, { status: 422 }),
    async () => Response.json({}),
    async () => { throw new Error("network unavailable"); },
  ]) {
    route = loadRoute({ provider });
    response = await route.POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, undefined);
  }
  console.log("PASS provider rejection, invalid acknowledgement and connection failure");

  route = loadRoute();
  for (let i = 0; i < 5; i++) assert.equal((await route.POST(request())).status, 200);
  response = await route.POST(request());
  assert.equal(response.status, 429);
  assert(Number(response.headers.get("retry-after")) > 0);
  assert.equal(route.calls.length, 5);
  console.log("PASS per-instance sending throttle");
})().catch(error => { console.error(error); process.exitCode = 1; });
