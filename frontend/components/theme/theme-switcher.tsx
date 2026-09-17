"use client";

import { THEMES, useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTheme(t.id)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            theme === t.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}