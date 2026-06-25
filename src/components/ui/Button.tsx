import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-white border-transparent shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95',
  secondary: 'bg-surface text-ink border-border shadow-sm hover:bg-surface-2 hover:border-accent/40',
  ghost: 'bg-transparent text-ink-muted border-transparent hover:bg-surface-2 hover:text-ink',
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'font-ui inline-flex items-center justify-center rounded-lg border font-medium transition-all duration-200 ease-smooth active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
});
