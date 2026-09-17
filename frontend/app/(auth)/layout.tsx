import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" aria-label="GoalUp — главная">
          <Logo />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          На главную
        </Link>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 py-10 sm:py-16">
        {children}
      </main>
    </div>
  );
}