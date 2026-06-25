import { Tabs, type TabItem } from './ui/Tabs';
import { levelName } from '@/lib/format';
import type { Level } from '@/content/types';

const LEVELS: Level[] = [1, 2, 3, 4, 5];

interface LevelSwitcherProps {
  level: Level;
  onChange: (l: Level) => void;
}

/**
 * The five-stop level control: a labelled slider AND tab buttons, kept in sync.
 * Keyboard: the tablist handles ←/→ (see Tabs); the range input handles ←/→
 * natively. The active level is owned by the parent (URL-driven).
 */
export function LevelSwitcher({ level, onChange }: LevelSwitcherProps) {
  const tabs: TabItem[] = LEVELS.map((l) => ({
    value: String(l),
    label: (
      <span className="flex flex-col items-center leading-tight">
        <span className="font-semibold">L{l}</span>
        <span className="hidden text-[0.65rem] font-normal text-ink-faint sm:block">
          {levelName(l)}
        </span>
      </span>
    ),
    ariaLabel: `Level ${l}: ${levelName(l)}`,
  }));

  return (
    <div className="font-ui">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label htmlFor="level-slider" className="text-sm font-medium text-ink-muted">
          Reading level
        </label>
        <span className="text-sm text-ink-faint">
          L{level} · <span className="text-ink">{levelName(level)}</span>
        </span>
      </div>

      <input
        id="level-slider"
        type="range"
        min={1}
        max={5}
        step={1}
        value={level}
        onChange={(e) => onChange(Number(e.target.value) as Level)}
        aria-valuetext={`Level ${level}: ${levelName(level)}`}
        className="mb-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-accent"
      />
      <div className="mb-4 flex justify-between px-0.5 text-[0.7rem] text-ink-faint" aria-hidden>
        {LEVELS.map((l) => (
          <span key={l}>L{l}</span>
        ))}
      </div>

      <Tabs
        items={tabs}
        value={String(level)}
        onValueChange={(v) => onChange(Number(v) as Level)}
        ariaLabel="Choose reading level"
        className="flex w-full justify-between"
      />
    </div>
  );
}
