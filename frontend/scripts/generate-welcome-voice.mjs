#!/usr/bin/env node
/**
 * Generates the premium welcome voice (public/voice/welcome.mp3) via OpenAI TTS.
 * The VoiceAssistant widget auto-detects this file and uses it instead of the
 * browser's built-in voice.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-welcome-voice.mjs
 *
 * Optional env:
 *   OPENAI_TTS_MODEL  (default: gpt-4o-mini-tts)
 *   OPENAI_TTS_VOICE  (default: onyx)   — onyx | alloy | nova | shimmer | echo | fable
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT = `Welcome to Crea8iv Media. We help businesses grow through digital marketing, custom software development, A.I. automation, branding, websites, mobile applications, S.E.O., Google Ads, Meta Ads, social media management, and business growth solutions. Whether you need more leads, more sales, better visibility, or a custom software solution to streamline your operations, our team is here to help. To get started, please choose one of the options below. Get a custom strategy and proposal through our client portal, and submit your project requirements. Or connect directly with our team on WhatsApp for immediate assistance. We're excited to help grow your business.`;

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error("✗ Set OPENAI_API_KEY to generate the premium voice.");
  process.exit(1);
}

const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
const voice = process.env.OPENAI_TTS_VOICE || "onyx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "public", "voice", "welcome.mp3");

console.log(`→ Generating welcome voice (model=${model}, voice=${voice})…`);

const res = await fetch("https://api.openai.com/v1/audio/speech", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model,
    voice,
    input: SCRIPT,
    instructions:
      "Speak as a premium, confident, warm business consultant. Professional, natural English, unhurried, welcoming.",
    format: "mp3",
  }),
});

if (!res.ok) {
  console.error(`✗ OpenAI TTS error ${res.status}: ${await res.text()}`);
  process.exit(1);
}

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, Buffer.from(await res.arrayBuffer()));
console.log(`✓ Saved ${outPath}`);
console.log("  Reload the site — the assistant now uses the premium voice.");
