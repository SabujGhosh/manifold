import { useTheme, type ThemePref } from '@/lib/theme';

const NEXT_LABEL: Record<ThemePref, string> = {
  light: 'Switch to dark theme',
  dark: 'Switch to system theme',
  system: 'Switch to light theme',
};

const ICON: Record<ThemePref, string> = {
  light: '☀',
  dark: '☾',
  system: '◐',
};

export function ThemeToggle() {
  const { pref, cycle } = useTheme();
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={NEXT_LABEL[pref]}
      title={`Theme: ${pref}`}
      className="font-ui inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-base text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <span aria-hidden>{ICON[pref]}</span>
    </button>
  );
}
