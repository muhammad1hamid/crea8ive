import assert from "node:assert/strict";
import test from "node:test";
import { restrictQaRequests } from "./lib/qa-browser.mjs";

const base = "http://127.0.0.1:4183";
for (const [method, url, expected] of [
  ["GET", `${base}/case-studies/`, "continue"],
  ["HEAD", `${base}/img/project.webp`, "continue"],
  ["POST", `${base}/contact/`, "abort"],
  ["DELETE", `${base}/content`, "abort"],
  ["GET", `${base}/app/account`, "abort"],
  ["GET", `${base}/api/enquiries`, "abort"],
  ["GET", `${base}/clinic/`, "abort"],
  ["GET", `${base}/enquiries/submit.php`, "abort"],
  ["GET", "https://crea8ivmedia.com/", "abort"],
  ["GET", "https://analytics.example/track", "abort"],
  ["GET", "data:image/png;base64,AAAA", "continue"],
  ["POST", "data:text/plain,test", "abort"],
]) {
  test(`${method} ${url}: ${expected}`, async () => {
    let handler;
    const page = {
      async setRequestInterception(enabled) { assert.equal(enabled, true); },
      on(event, callback) { assert.equal(event, "request"); handler = callback; },
    };
    await restrictQaRequests(page, base);
    let decision;
    handler({ method: () => method, url: () => url, continue: () => { decision = "continue"; }, abort: () => { decision = "abort"; } });
    assert.equal(decision, expected);
  });
}
