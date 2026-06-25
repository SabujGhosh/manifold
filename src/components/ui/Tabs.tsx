import { type ReactNode } from 'react';
import { cn } from './cn';

export interface TabItem {
  value: string;
  label: ReactNode;
  ariaLabel?: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (v: string) => void;
  ariaLabel: string;
  className?: string;
}

/** Roving-tabindex tablist. Arrow keys move selection. */
export function Tabs({ items, value, onValueChange, ariaLabel, className }: TabsProps) {
  const idx = items.findIndex((i) => i.value === value);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const next = (idx + delta + items.length) % items.length;
    onValueChange(items[next].value);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn('font-ui inline-flex gap-1 rounded-lg border border-border bg-surface-2 p-1', className)}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={active}
            aria-label={item.ariaLabel}
            tabIndex={active ? 0 : -1}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-smooth',
              active ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
