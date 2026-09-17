"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

const nav = [
  { href: "/dashboard", label: "Главная", icon: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" },
  { href: "/goals", label: "Мои цели", icon: "M12 12a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 0v7M7 17h10" },
  { href: "/operations", label: "Операции", icon: "M5 6h14M5 12h14M5 18h9" },
  { href: "/statistics", label: "Статистика", icon: "M4 19V9M10 19V5M16 19v-8M22 19H2" },
  {
    href: "/achievements",
    label: "Достижения",
    icon: "M20 4l-3 3-2-2-3 3M8 21h8M12 18v3M6 7l4 4a6 6 0 0 0 6-6 6 6 0 0 0-4 4",
  },
  { href: "/settings", label: "Настройки", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm9-3a9 9 0 0 1-.22 1.9l1.4 1-1.4 1.4-1.4-.4a8 8 0 0 1-4.5 4.5l.4 1.4-1.4 1.4-1-1.4A9 9 0 0 1 12 21a9 9 0 0 1-1.9-.2l-1 1.2-1.4-1.4.4-1.4a8 8 0 0 1-4.5-4.5l-1.4.4-1.4-1.4 1.4-1A9 9 0 0 1 3 12a9 9 0 0 1 .2-1.9l-1.2-1 1.4-1.4 1.4.4a8 8 0 0 1 4.5-4.5l-.4-1.4 1.4-1.4 1 1.2A9 9 0 0 1 12 3a9 9 0 0 1 1.9.2l1-1.2 1.4 1.4-.4 1.4a8 8 0 0 1 4.5 4.5l1.4-.4 1.4 1.4-1.4 1A9 9 0 0 1 21 12Z" },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-44 flex-col border-r border-border bg-card px-3 py-4 lg:flex">
        <Link href="/dashboard" className="px-2" aria-label="GoalUp">
          <Logo />
        </Link>
        <nav className="mt-3 flex flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold ${
                  active
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none"
                  aria-hidden="true"
                >
                  <path d={item.icon} />
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <ThemeSwitcher />
          <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2.5">
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-grad-primary text-sm font-bold text-primary-foreground">
              Д
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-bold">Даня</span>
              <span className="block truncate text-[11px] text-muted-foreground">
                danya@mail.ru
              </span>
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="ml-auto flex-none text-muted-foreground"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </aside>

      <div className="lg:pl-44">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/dashboard" aria-label="GoalUp">
            <Logo />
          </Link>
          <ThemeSwitcher />
        </header>
        {children}
      </div>
    </div>
  );
}