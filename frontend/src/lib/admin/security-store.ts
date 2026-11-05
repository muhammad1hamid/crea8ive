import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = process.env.CREA8IV_CMS_DATA_DIR || path.join(process.cwd(), ".crea8iv-cms");
const SECURITY_FILE = path.join(DATA_DIR, "security.json");

type SecurityStore = {
  adminPasswordHash?: string;
  passwordUpdatedAt?: string;
};

async function readSecurityStore(): Promise<SecurityStore> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await readFile(SECURITY_FILE, "utf8");
    return JSON.parse(raw) as SecurityStore;
  } catch {
    return {};
  }
}

async function writeSecurityStore(store: SecurityStore) {
  await mkdir(DATA_DIR, { recursive: true });
  const tmpFile = `${SECURITY_FILE}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmpFile, JSON.stringify(store, null, 2));
  await rename(tmpFile, SECURITY_FILE);
}

export async function getAdminPasswordHashOverride() {
  const store = await readSecurityStore();
  return store.adminPasswordHash || "";
}

export async function updateAdminPasswordHash(adminPasswordHash: string) {
  const store = await readSecurityStore();
  const nextStore = {
    ...store,
    adminPasswordHash,
    passwordUpdatedAt: new Date().toISOString(),
  };
  await writeSecurityStore(nextStore);
  return nextStore.passwordUpdatedAt;
}
