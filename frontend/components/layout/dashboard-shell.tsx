"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

const nav = [
  { href: "/dashboard", label: "Главная" },
  { href: "/goals", label: "Цели" },
  { href: "/operations", label: "Операции" },
  { href: "/statistics", label: "Статистика" },
  { href: "/achievements", label: "Достижения" },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-40 border-b border-white/30 bg-white/35 backdrop-blur-2xl dark:border-border dark:bg-background/70">
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/dashboard" aria-label="GoalUp">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-white/50 bg-white/50 p-1 shadow-[0_8px_30px_-12px_rgba(80,40,180,.25)] backdrop-blur-xl lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                    active
                      ? "bg-grad-primary text-primary-foreground shadow-sm"
                      : "text-foreground/65 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeSwitcher />
            <span className="hidden size-9 place-items-center rounded-full bg-grad-primary text-sm font-extrabold text-primary-foreground shadow sm:grid">
              Д
            </span>
          </div>
        </div>
      </header>

      <nav className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-bold transition-colors ${
                active
                  ? "bg-grad-primary text-primary-foreground shadow-sm"
                  : "border border-white/50 bg-white/40 text-foreground/60"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </div>
  );
}