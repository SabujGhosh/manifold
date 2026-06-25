import { useCallback, useEffect, useState } from 'react';
import { loadRaw, saveRaw } from './storage';

export type ThemePref = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const KEY = 'theme';

function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  return pref === 'system' ? systemTheme() : pref;
}

function apply(pref: ThemePref) {
  const resolved = resolveTheme(pref);
  document.documentElement.setAttribute('data-theme', resolved);
}

/** Theme preference + setter. Persists to localStorage; tracks system changes. */
export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(() => (loadRaw(KEY) as ThemePref) ?? 'system');

  useEffect(() => {
    apply(pref);
    saveRaw(KEY, pref);
  }, [pref]);

  useEffect(() => {
    if (pref !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [pref]);

  const cycle = useCallback(() => {
    setPref((p) => (p === 'light' ? 'dark' : p === 'dark' ? 'system' : 'light'));
  }, []);

  return { pref, setPref, resolved: resolveTheme(pref), cycle };
}
