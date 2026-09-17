"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link href="/" aria-label="GoalUp — главная">
        <Logo />
      </Link>
      <div className="flex items-center gap-3">
        <Link
          href="/design"
          className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
        >
          Варианты дизайна
        </Link>
        <ThemeSwitcher />
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm font-semibold text-foreground hover:opacity-80"
          >
            Войти
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Начать
          </Link>
        </div>
      </div>
    </header>
  );
}