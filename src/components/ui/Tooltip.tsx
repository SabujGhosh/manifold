import { useState, useId, type ReactNode } from 'react';
import { cn } from './cn';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Hover/focus tooltip. Shown on pointer hover and keyboard focus; dismissed on
 * Escape. The trigger is expected to be a focusable element (button/anchor).
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      {open && (
        <span
          role="tooltip"
          id={id}
          className="font-ui pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-xs -translate-x-1/2 rounded-lg border border-border bg-surface px-3 py-2 text-left text-xs leading-snug text-ink shadow-lg animate-fade-in"
        >
          {content}
        </span>
      )}
    </span>
  );
}
