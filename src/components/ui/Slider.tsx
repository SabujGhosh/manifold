import { useId, type InputHTMLAttributes } from 'react';
import { cn } from './cn';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  /** Formatted readout (defaults to the raw number). */
  format?: (v: number) => string;
  unit?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  format,
  unit,
  className,
  ...rest
}: SliderProps) {
  const id = useId();
  return (
    <div className={cn('font-ui', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm text-ink-muted">
          {label}
        </label>
        <span className="font-mono text-sm tabular-nums text-ink">
          {format ? format(value) : value}
          {unit ? <span className="text-ink-faint"> {unit}</span> : null}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-2 accent-accent"
        {...rest}
      />
    </div>
  );
}
