import { useCallback, useState } from 'react';
import { load, save } from './storage';
import type { Level } from '@/content/types';

/** Global default reading level (applied on first open of an equation page). */
export function useDefaultLevel(): [Level, (l: Level) => void] {
  const [level, setLevel] = useState<Level>(() => load<Level>('defaultLevel', 1));
  const set = useCallback((l: Level) => {
    setLevel(l);
    save('defaultLevel', l);
  }, []);
  return [level, set];
}

/** A persisted set of equation ids, used for both bookmarks and "read" marks. */
export function usePersistedSet(key: string) {
  const [set, setSet] = useState<Set<string>>(() => new Set(load<string[]>(key, [])));

  const toggle = useCallback(
    (id: string) => {
      setSet((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        save(key, [...next]);
        return next;
      });
    },
    [key],
  );

  const has = useCallback((id: string) => set.has(id), [set]);

  return { set, toggle, has, size: set.size };
}
