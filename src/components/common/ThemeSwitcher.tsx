import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme, Theme } from '@/context/ThemeContext';

interface ThemeSwitcherProps {
  variant?: 'toggle' | 'segmented' | 'dropdown';
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeSwitcher = ({
  variant = 'toggle',
  className = '',
  size = 'md',
}: ThemeSwitcherProps) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'segmented') {
    const options: { value: Theme; label: string; icon: typeof Sun }[] = [
      { value: 'light', label: 'Light', icon: Sun },
      { value: 'dark', label: 'Dark', icon: Moon },
      { value: 'system', label: 'System', icon: Laptop },
    ];

    return (
      <div
        className={`inline-flex p-1 rounded-xl bg-farm-surface-muted border border-farm-border select-none ${className}`}
        role="radiogroup"
        aria-label="Theme selection"
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setTheme(opt.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-farm-surface text-farm-brand border border-farm-border shadow-subtle'
                  : 'text-farm-text-secondary hover:text-farm-text-primary hover:bg-farm-surface-hover/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Default compact toggle for headers
  const isDark = resolvedTheme === 'dark';
  const buttonSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${buttonSize} rounded-xl bg-farm-surface border border-farm-border text-farm-text flex items-center justify-center hover:bg-farm-surface-hover active:scale-95 transition-all shadow-subtle cursor-pointer ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      id="theme-switcher-toggle"
    >
      {isDark ? (
        <Sun className={`${iconSize} text-farm-gold`} />
      ) : (
        <Moon className={`${iconSize} text-farm-brand`} />
      )}
    </button>
  );
};
