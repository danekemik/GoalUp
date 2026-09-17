import { Button } from "@/components/ui/button";
import {
  GoalHeroCarousel,
  type HeroGoal,
} from "@/components/dashboard/goal-hero-carousel";
import { WhatIf } from "@/components/dashboard/what-if";
import { MiniProgressChart } from "@/components/dashboard/mini-progress-chart";
import { formatRubles } from "@/lib/format";

const goals: HeroGoal[] = [
  {
    id: "macbook",
    emoji: "💻",
    name: "MacBook Pro",
    target: 240_000,
    saved: 118_400,
    state: "ahead",
    stateLabel: "Успеваешь",
    forecast: "ноя 2027",
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
    accent: "#2563eb",
    glow: "bg-sky-400/30",
    shape: "border-white/30",
  },
  {
    id: "japan",
    emoji: "🌸",
    name: "Отпуск в Японии",
    target: 320_000,
    saved: 141_200,
    state: "onTime",
    stateLabel: "В процессе",
    forecast: "июнь 2028",
    gradient: "from-pink-400 via-rose-500 to-fuchsia-500",
    accent: "#db2777",
    glow: "bg-rose-400/30",
    shape: "border-white/30",
  },
  {
    id: "car",
    emoji: "🚗",
    name: "Новая машина",
    target: 1_500_000,
    saved: 620_000,
    state: "push",
    stateLabel: "Нужно ускориться",
    forecast: "июль 2030",
    gradient: "from-lime-400 via-green-500 to-emerald-500",
    accent: "#16a34a",
    glow: "bg-lime-400/30",
    shape: "border-white/30",
  },
  {
    id: "fender",
    emoji: "🎸",
    name: "Гитара Fender",
    target: 120_000,
    saved: 96_500,
    state: "ahead",
    stateLabel: "Успеваешь",
    forecast: "фев 2027",
    gradient: "from-violet-400 via-purple-500 to-indigo-500",
    accent: "#7c3aed",
    glow: "bg-violet-400/30",
    shape: "border-white/30",
  },
];

const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
const pace = 41_700;

function StatCard({
  label,
  value,
  note,
  emoji,
  accent,
}: {
  label: string;
  value: string;
  note: string;
  emoji: string;
  accent: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_20px_50px_-30px_rgba(80,30,180,.3)] backdrop-blur-xl transition-transform hover:-translate-y-1">
      <span
        className="absolute -right-8 -top-10 size-28 rounded-full blur-2xl"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <span className="text-xl" aria-hidden="true">
          {emoji}
        </span>
      </div>
      <p className="mt-2 text-2xl font-extrabold tracking-tight tabular-nums sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
      <span
        className="pointer-events-none absolute -left-24 top-24 size-80 rounded-full bg-violet-300/30 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-20 top-40 size-72 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-40 left-1/3 size-64 rounded-full bg-fuchsia-200/30 blur-3xl"
        aria-hidden="true"
      />

      <header className="relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
            8 месяцев продуктивности
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Привет, Даня! 👋
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Твои копилки бьют рекорды. Общая сумма накоплений —{" "}
            <b className="text-foreground">{formatRubles(totalSaved)}</b>.
          </p>
        </div>

        <div className="relative animate-float">
          <Button
            size="lg"
            className="h-14 rounded-2xl bg-grad-primary px-8 text-base shadow-[0_24px_48px_-16px_rgba(124,58,237,.8)]"
          >
            ＋ Создать цель
          </Button>
        </div>
      </header>

      <section className="relative mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Всего накоплено"
          value={formatRubles(totalSaved)}
          note="+118 400 ₽ за последний месяц"
          emoji="💎"
          accent="rgba(139,92,246,.35)"
        />
        <StatCard
          label="Средний темп"
          value={formatRubles(pace) + "/мес"}
          note="растёт с каждым месяцем"
          emoji="⚡"
          accent="rgba(56,189,248,.3)"
        />
        <StatCard
          label="Ближайший дедлайн"
          value="10 дек"
          note="до «Гитары Fender»"
          emoji="🎯"
          accent="rgba(244,114,182,.3)"
        />
      </section>

      <section className="relative mt-12">
        <GoalHeroCarousel goals={goals} />
      </section>

      <section className="relative mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
        <WhatIf
          goalName="Машина"
          target={1_500_000}
          saved={620_000}
          pace={pace * 0.4}
        />
        <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-card p-6 shadow-[0_30px_60px_-30px_rgba(80,30,180,.25)] sm:p-8">
          <span className="absolute -right-14 -top-16 size-48 rounded-full bg-sky-200/30 blur-3xl" />
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Прогресс
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            От золотой мечты к цели
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Накопления за последние месяцы
          </p>
          <div className="mt-6">
            <MiniProgressChart />
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-4 py-3">
            <span className="text-xs text-muted-foreground">Сентябрь → сегодня</span>
            <span className="text-sm font-extrabold tabular-nums">
              {formatRubles(134_000)} → {formatRubles(totalSaved)}
            </span>
          </div>
        </div>
      </section>

      <p className="mt-14 text-center text-xs text-muted-foreground">
        Демо-данные. Подключение к API — на этапе Foundation.
      </p>
    </main>
  );
}