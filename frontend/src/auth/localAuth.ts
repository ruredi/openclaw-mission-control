"use client";

import { AuthMode } from "@/auth/mode";

let localToken: string | null = null;
const STORAGE_KEY = "mc_local_auth_token";

function writeToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Ignore storage failures (private mode / policy).
  }
  try {
    window.sessionStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Ignore storage failures (private mode / policy).
  }
}

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromLocal = window.localStorage.getItem(STORAGE_KEY);
    if (fromLocal) return fromLocal;
  } catch {
    // Ignore storage failures (private mode / policy).
  }
  try {
    const fromSession = window.sessionStorage.getItem(STORAGE_KEY);
    if (fromSession) return fromSession;
  } catch {
    // Ignore storage failures (private mode / policy).
  }
  return null;
}

export function isLocalAuthMode(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_MODE === AuthMode.Local;
}

export function setLocalAuthToken(token: string): void {
  localToken = token;
  writeToken(token);
}

export function getLocalAuthToken(): string | null {
  if (localToken) return localToken;
  const stored = readToken();
  if (stored) {
    localToken = stored;
    return stored;
  }
  return null;
}

export function clearLocalAuthToken(): void {
  localToken = null;
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures (private mode / policy).
  }
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures (private mode / policy).
  }
}
