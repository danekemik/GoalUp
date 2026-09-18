"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GoalHeroCarousel,
  type HeroGoal,
} from "@/components/dashboard/goal-hero-carousel";
import { AuroraBackground } from "@/components/dashboard/aurora-background";
import { WhatIf } from "@/components/dashboard/what-if";
import { RecentOperations } from "@/components/dashboard/recent-operations";
import { MiniProgressChart } from "@/components/dashboard/mini-progress-chart";
import { formatEuro } from "@/lib/format";

const goals: HeroGoal[] = [
  {
    id: "macbook",
    name: "MacBook Pro",
    target: 2000,
    saved: 1240,
    forecast: "фев 2027",
    world: {
      headerBg: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 28%, #6d28d9 56%, #4f46e5 100%)",
      accent: "#7c3aed",
      accentSoft: "rgba(139, 92, 246, 0.14)",
      ringGlow: "rgba(139, 92, 246, 0.7)",
      barGrad: "linear-gradient(90deg, #c4b5fd, #7c3aed)",
      buttonGrad: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
      statusDot: "bg-lime-300",
      statusLabel: "Успеваешь",
      icon: "💻",
      caption: "Половина собрана — осталось два-три месяца спокойного темпа.",
      aurora: {
        blob1: "rgba(139, 92, 246, 0.32)",
        blob2: "rgba(79, 70, 229, 0.3)",
        blob3: "rgba(244, 114, 182, 0.2)",
        blob4: "rgba(109, 40, 217, 0.18)",
        halo: "rgba(139, 92, 246, 0.5)",
      },
      blobs: [
        { c: "radial-gradient(circle, #f472b6, transparent 70%)", x: "62%", y: "-14%", s: "240px" },
        { c: "radial-gradient(circle, #818cf8, transparent 70%)", x: "-10%", y: "42%", s: "280px" },
        { c: "radial-gradient(circle, #f0abfc, transparent 70%)", x: "50%", y: "58%", s: "230px", o: 0.5 },
      ],
    },
  },
  {
    id: "japan",
    name: "Отпуск в Японии",
    target: 4000,
    saved: 1280,
    forecast: "июн 2028",
    world: {
      headerBg: "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 22%, #0ea5e9 62%, #38bdf8 100%)",
      accent: "#0d9488",
      accentSoft: "rgba(20, 184, 166, 0.15)",
      ringGlow: "rgba(20, 184, 166, 0.65)",
      barGrad: "linear-gradient(90deg, #5eead4, #0ea5e9)",
      buttonGrad: "linear-gradient(135deg, #14b8a6, #0d9488)",
      statusDot: "bg-sky-300",
      statusLabel: "В графике",
      icon: "🌸",
      caption: "Каждая сотня — это день под сакурой. Ещё 2 720 € до вылета.",
      aurora: {
        blob1: "rgba(20, 184, 166, 0.3)",
        blob2: "rgba(56, 189, 248, 0.26)",
        blob3: "rgba(253, 224, 71, 0.18)",
        blob4: "rgba(244, 114, 182, 0.16)",
        halo: "rgba(20, 184, 166, 0.45)",
      },
      blobs: [
        { c: "radial-gradient(circle, #fde047, transparent 70%)", x: "58%", y: "-18%", s: "260px" },
        { c: "radial-gradient(circle, #fb7185, transparent 70%)", x: "-12%", y: "46%", s: "260px", o: 0.5 },
        { c: "radial-gradient(circle, #ffffff, transparent 70%)", x: "44%", y: "62%", s: "230px", o: 0.5 },
      ],
    },
  },
  {
    id: "car",
    name: "Новая машина",
    target: 15000,
    saved: 3500,
    forecast: "июл 2030",
    world: {
      headerBg: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 46%, #2563eb 100%)",
      accent: "#2563eb",
      accentSoft: "rgba(37, 99, 235, 0.13)",
      ringGlow: "rgba(59, 130, 246, 0.6)",
      barGrad: "linear-gradient(90deg, #7dd3fc, #2563eb)",
      buttonGrad: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      statusDot: "bg-amber-300",
      statusLabel: "Добавь темп",
      icon: "🚗",
      caption: "23% бака. Немного больше в неделю — и колёса приедут быстрее.",
      aurora: {
        blob1: "rgba(30, 58, 138, 0.34)",
        blob2: "rgba(59, 130, 246, 0.28)",
        blob3: "rgba(125, 211, 252, 0.2)",
        blob4: "rgba(79, 70, 229, 0.18)",
        halo: "rgba(59, 130, 246, 0.45)",
      },
      blobs: [
        { c: "radial-gradient(circle, #38bdf8, transparent 70%)", x: "60%", y: "-16%", s: "280px" },
        { c: "radial-gradient(circle, #a3e635, transparent 70%)", x: "-12%", y: "44%", s: "240px", o: 0.28 },
        { c: "radial-gradient(circle, #93c5fd, transparent 70%)", x: "42%", y: "60%", s: "220px", o: 0.4 },
      ],
    },
  },
  {
    id: "fender",
    name: "Гитара Fender",
    target: 800,
    saved: 650,
    forecast: "ноя 2026",
    world: {
      headerBg: "linear-gradient(150deg, #f43f5e 0%, #fb7185 26%, #f97316 64%, #c026d3 135%)",
      accent: "#e11d48",
      accentSoft: "rgba(244, 63, 94, 0.15)",
      ringGlow: "rgba(244, 63, 94, 0.65)",
      barGrad: "linear-gradient(90deg, #fda4af, #f43f5e)",
      buttonGrad: "linear-gradient(135deg, #f43f5e, #e11d48)",
      statusDot: "bg-lime-300",
      statusLabel: "Почти у цели",
      icon: "🎸",
      caption: "Осталось 150 € до первого рифа.",
      aurora: {
        blob1: "rgba(244, 63, 94, 0.28)",
        blob2: "rgba(251, 146, 60, 0.24)",
        blob3: "rgba(192, 38, 211, 0.2)",
        blob4: "rgba(112, 26, 117, 0.15)",
        halo: "rgba(244, 63, 94, 0.5)",
      },
      blobs: [
        { c: "radial-gradient(circle, #c084fc, transparent 70%)", x: "60%", y: "-16%", s: "260px" },
        { c: "radial-gradient(circle, #fff7ed, transparent 70%)", x: "-14%", y: "40%", s: "260px", o: 0.5 },
        { c: "radial-gradient(circle, #fb7185, transparent 70%)", x: "40%", y: "60%", s: "230px", o: 0.55 },
      ],
    },
  },
];

const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
const WEEKLY = 85;

function StatChip({
  emoji,
  emojiBg,
  label,
  value,
  note,
}: {
  emoji: string;
  emojiBg: string;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-white/70 bg-white/55 px-4 py-3.5 shadow-[0_18px_40px_-28px_rgba(80,40,180,.5)] backdrop-blur-md transition-transform hover:-translate-y-0.5">
      <span
        className="grid size-11 shrink-0 place-items-center rounded-xl text-xl"
        style={{ background: emojiBg }}
        aria-hidden="true"
      >
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-foreground/55">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-lg font-black tabular-nums tracking-tight">
          {value}
        </span>
        <span className="block truncate text-[12px] font-semibold text-foreground/55">
          {note}
        </span>
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const [active, setActive] = useState(0);
  const activeGoal = goals[active];

  return (
    <main className="relative mx-auto w-full max-w-7xl flex-1 overflow-hidden px-4 pb-24 sm:px-6">
      <AuroraBackground aurora={activeGoal.world.aurora} />

      <header className="goalup-rise relative z-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary backdrop-blur">
            <span className="size-1.5 rounded-full bg-grad-primary animate-pulse-dot" />
            8 месяцев продуктивности
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Привет, Даня{" "}
            <span className="inline-block animate-float" aria-hidden="true">
              👋
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/60">
            Твои копилки бьют рекорды — уже{" "}
            <b className="font-black text-foreground">{formatEuro(totalSaved)}</b> в пути.
          </p>
        </div>

        <Button
          size="lg"
          className="bg-grad-primary px-8 shadow-[0_24px_48px_-16px_rgba(124,58,237,.8)] transition-all hover:-translate-y-0.5 active:scale-[.97]"
        >
          ＋ Новая цель
        </Button>
      </header>

      <section className="relative z-10 mt-10 sm:mt-12">
        <GoalHeroCarousel goals={goals} active={active} onActiveChange={setActive} />
      </section>

      <section className="goalup-rise goalup-delay-1 relative z-10 mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <StatChip
          emoji="💎"
          emojiBg="linear-gradient(135deg, rgba(139,92,246,.22), rgba(139,92,246,.08))"
          label="Всего накоплено"
          value={formatEuro(totalSaved)}
          note="+960 € за последний месяц"
        />
        <StatChip
          emoji="⚡"
          emojiBg="linear-gradient(135deg, rgba(56,189,248,.24), rgba(56,189,248,.08))"
          label="Средний темп"
          value={`${formatEuro(WEEKLY)}/нед`}
          note="держись — темп растёт"
        />
        <StatChip
          emoji="🎯"
          emojiBg="linear-gradient(135deg, rgba(244,114,182,.24), rgba(244,114,182,.08))"
          label="Ближайший дедлайн"
          value="ноя 2026"
          note="до «Гитары Fender»"
        />
      </section>

      <section className="goalup-rise goalup-delay-2 relative z-10 mt-10 grid gap-5 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-7">
          <WhatIf
            goal={{ name: activeGoal.name, target: activeGoal.target, saved: activeGoal.saved }}
            pace={WEEKLY}
          />
        </div>
        <div className="lg:col-span-5">
          <RecentOperations />
        </div>
      </section>

      <section className="goalup-rise goalup-delay-3 relative z-10 mt-10 overflow-hidden rounded-[30px] bg-grad-primary p-6 shadow-[0_30px_70px_-30px_rgba(124,58,237,.8)] sm:p-8">
        <span className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/15 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-28 -left-14 size-64 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div className="relative grid gap-6 sm:grid-cols-[1.15fr_1fr] sm:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/70">
              Мотивация
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
              Крупные цели — это просто маленькие, к которым ты возвращаешься каждую неделю.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              Ты уже накопил {formatEuro(totalSaved)} из {formatEuro(19700)} — на 34% пути.
              Один взнос в неделю, и каждый месяц — новый рубеж.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-white/60">
              <span>Динамика накоплений</span>
              <span>{formatEuro(totalSaved)}</span>
            </div>
            <MiniProgressChart />
            <p className="mt-3 text-center text-sm font-bold text-white">
              {Math.round((totalSaved / 19700) * 100) > 30 ? "Так держать" : "Вперёд"} 🎸
            </p>
          </div>
        </div>
      </section>

      <p className="relative z-10 mt-12 text-center text-xs text-foreground/40">
        Демо-данные. Подключение к API — на этапе Foundation.
      </p>
    </main>
  );
}