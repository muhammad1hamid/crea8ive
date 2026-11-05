import "server-only";

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { AdminRole } from "@/lib/admin/types";
import { getAdminPasswordHashOverride } from "@/lib/admin/security-store";

const COOKIE_NAME = "crea8iv_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  email: string;
  role: AdminRole;
  exp: number;
};

const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "dev-only-change-admin-session-secret";
}

function base64url(value: string | Buffer) {
  return Buffer.from(value).toString("base64url");
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const body = base64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.email || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string) {
  const [method, salt, hash] = stored.split(":");
  if (method !== "scrypt" || !salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === candidate.length && timingSafeEqual(expected, candidate);
}

function safeEqualText(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAutomationRequest(request: NextRequest) {
  const token = process.env.CREA8IV_AUTOMATION_TOKEN || "";
  if (token.length < 32) return false;

  const authHeader = request.headers.get("authorization") || "";
  const headerToken = request.headers.get("x-crea8iv-automation-token") || "";
  const queryToken = request.nextUrl.searchParams.get("token") || "";
  const candidate = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : headerToken || queryToken;

  return Boolean(candidate) && safeEqualText(candidate, token);
}

export function automationUnauthorized() {
  return NextResponse.json(
    { message: "Unauthorized automation request." },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (!attempt || attempt.resetAt < now) {
    loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  attempt.count += 1;
  return attempt.count > 8;
}

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSession(token);
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function loginAdmin(email: string, password: string, ip = "local") {
  if (isRateLimited(`${ip}:${email.toLowerCase()}`)) {
    return { ok: false, message: "Too many login attempts. Try again later." };
  }

  const expectedEmail = (process.env.ADMIN_EMAIL || "owner@crea8ivmedia.com").toLowerCase();
  const passwordHash = (await getAdminPasswordHashOverride()) || process.env.ADMIN_PASSWORD_HASH || "";
  const plainPassword = process.env.ADMIN_PASSWORD || "";
  const emailOk = email.toLowerCase().trim() === expectedEmail;
  const passwordOk = passwordHash ? verifyPassword(password, passwordHash) : Boolean(plainPassword && password === plainPassword);

  if (!emailOk || !passwordOk) {
    return { ok: false, message: "Invalid admin credentials." };
  }

  return {
    ok: true,
    token: encodeSession({
      email: expectedEmail,
      role: "owner",
      exp: Date.now() + SESSION_TTL_SECONDS * 1000,
    }),
  };
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
