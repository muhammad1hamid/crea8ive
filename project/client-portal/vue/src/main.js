import { createApp } from "vue";
import "./style.css";
const el = document.getElementById("app");
const user = JSON.parse(el?.dataset.user || '{"display_name":"Portal User","role":"client"}');
createApp({
  data: () => ({ user }),
  template: `<main class="min-h-screen bg-[#0b0b0b] p-6 text-white"><section class="mx-auto max-w-6xl"><header class="flex items-center justify-between border-b border-white/10 pb-5"><div><p class="text-xs uppercase tracking-[.25em] text-orange-500">Crea8iv Media Portal</p><h1 class="mt-2 text-2xl font-bold">Welcome, {{ user.display_name }}</h1></div><a href="/logout.php" class="rounded-full border border-orange-500 px-4 py-2 text-sm">Sign out</a></header><div class="grid gap-5 py-8 md:grid-cols-3"><article class="card"><p class="label">Role</p><p class="value">{{ user.role }}</p></article><article class="card"><p class="label">Audit</p><p class="value">Awaiting review</p></article><article class="card"><p class="label">Support</p><p class="value">Available</p></article></div><section class="card"><h2 class="text-xl font-semibold">Portal migration baseline</h2><p class="mt-3 text-white/60">Your local portal authentication is active. Protected production modules require the original portal source and database export before parity can be verified.</p></section></section></main>`
}).mount(el);
