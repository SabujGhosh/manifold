/**
 * Tiny typed wrapper over localStorage. All keys are namespaced under `eq:`.
 * Fails silently if storage is unavailable (private mode, SSR/prerender).
 */
const PREFIX = 'eq:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* ignore quota / unavailable */
  }
}

/** For primitive string prefs we store raw (the theme bootstrap reads it directly). */
export function loadRaw(key: string): string | null {
  try {
    return localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

export function saveRaw(key: string, value: string): void {
  try {
    localStorage.setItem(PREFIX + key, value);
  } catch {
    /* ignore */
  }
}
