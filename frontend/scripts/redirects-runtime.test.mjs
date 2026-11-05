import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import path from "node:path";

test("Node serves reviewed migrations as one-hop redirects, including stale portfolio files", async () => {
  const root = path.resolve(import.meta.dirname, "..");
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const port = probe.address().port;
  await new Promise((resolve) => probe.close(resolve));
  // This process reads static files only and does not inherit provider secrets.
  const child = spawn(process.execPath, ["server.mjs"], { cwd: root, env: { PATH: process.env.PATH, PORT: String(port), NO_INDEX: "true" }, stdio: ["ignore", "pipe", "pipe"] });
  try {
    await Promise.race([once(child.stdout, "data"), once(child, "exit").then(([code]) => { throw new Error(`Server exited ${code}`); })]);
    const base = `http://127.0.0.1:${port}`;
    const redirects = JSON.parse(await readFile(path.join(root, "src/data/legacy-redirects.json"), "utf8"));
    for (const [source, destination] of Object.entries(redirects)) {
      for (const alias of [source, source.replace(/\/$/, "")]) {
        const response = await fetch(`${base}${alias}?utm_source=regression`, { redirect: "manual" });
        assert.equal(response.status, 301, alias);
        assert.equal(response.headers.get("location"), `${destination}?utm_source=regression`, alias);
      }
      assert.equal((await fetch(`${base}${destination}`, { redirect: "manual" })).status, 200, destination);
    }
    for (const [source, destination] of [["/website-portfolio/retired-item/", "/website-portfolio/"], ["/results/retired-item/", "/results/"]]) {
      const response = await fetch(`${base}${source}`, { redirect: "manual" });
      assert.equal(response.status, 301);
      assert.equal(response.headers.get("location"), destination);
    }
    assert.equal((await fetch(`${base}/does-not-exist-indexing-test/`)).status, 404);
    assert.equal((await fetch(`${base}/online-casino-spam/`)).status, 410);
  } finally {
    if (child.exitCode === null) { const exited = once(child, "exit"); child.kill("SIGTERM"); await exited; }
  }
});
