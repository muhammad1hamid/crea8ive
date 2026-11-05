import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/create-admin-secrets.mjs '<strong-admin-password>'");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString("hex")}`);
console.log(`CREA8IV_AUTOMATION_TOKEN=${randomBytes(32).toString("hex")}`);
