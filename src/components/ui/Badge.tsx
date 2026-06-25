import type { HTMLAttributes } from 'react';
import { cn } from './cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Optional accent color (e.g. a field hue) applied as tinted text + ring. */
  color?: string;
}

export function Badge({ className, color, style, children, ...props }: BadgeProps) {
  const colorStyle = color
    ? { color, borderColor: color, backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }
    : undefined;
  return (
    <span
      className={cn(
        'font-ui inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        !color && 'border-border bg-surface-2 text-ink-muted',
        className,
      )}
      style={{ ...colorStyle, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
