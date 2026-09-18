"use client";

import { useMemo, useState } from "react";
import { formatEuro } from "@/lib/format";

const MONTHS = [
  "янв", "фев", "мар", "апр", "май", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];

function addDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const WEEK = 7;

export function WhatIf({
  goal,
  pace,
}: {
  goal: { name: string; target: number; saved: number };
  pace: number;
}) {
  const [extra, setExtra] = useState(15);

  const left = Math.max(0, goal.target - goal.saved);
  const fast = pace + extra;

  const { baseDays, fastDays, savedDays } = useMemo(() => {
    if (left <= 0) return { baseDays: 0, fastDays: 0, savedDays: 0 };
    const baseDays = Math.ceil((left / pace) * WEEK);
    const fastDays = Math.ceil((left / fast) * WEEK);
    return { baseDays, fastDays, savedDays: baseDays - fastDays };
  }, [left, pace, fast]);

  const effect =
    extra <= 0
      ? null
      : savedDays <= 0
        ? { label: "дата не меняется", tone: "text-white/80" }
        : {
            label:
              savedDays >= 14
                ? `на ${Math.floor(savedDays / 7)} нед ${savedDays % 7 ? `${savedDays % 7} дн` : ""} раньше`
                : `на ${savedDays} дн${savedDays % 10 === 1 && savedDays % 100 !== 11 ? "ь" : "ей"} раньше`,
            tone: "text-white",
          };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_60px_-30px_rgba(80,30,180,.25)] backdrop-blur-xl sm:p-8">
      <span className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 -left-10 size-44 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
        Что если
      </p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Немного больше в неделю
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Добавь к виртуальному взносу ещё немного — и «{goal.name}» приедет раньше.
        Реальные данные не меняются.
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label htmlFor="whatif" className="text-sm font-bold text-muted-foreground">
            Взнос в неделю
          </label>
          <span className="rounded-xl bg-grad-primary px-3 py-1 text-sm font-extrabold text-primary-foreground tabular-nums">
            +{formatEuro(extra)}
          </span>
        </div>
        <input
          id="whatif"
          type="range"
          min={0}
          max={60}
          step={5}
          value={extra}
          onChange={(e) => setExtra(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[var(--primary)]"
        />
        <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
          <span>+0 €</span>
          <span>+60 €</span>
        </div>
      </div>

      <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Текущий темп · {formatEuro(pace)}/нед
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight tabular-nums">
            {left > 0 ? addDays(baseDays) : "уже собрано"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {left > 0 ? `~ ${Math.ceil(baseDays / WEEK)} мес` : "цель достигнута"}
          </p>
        </div>
        <div className="rounded-2xl bg-grad-primary p-4 text-primary-foreground shadow-[0_16px_36px_-18px_rgba(124,58,237,.7)]">
          <p className="text-xs font-bold uppercase tracking-wide opacity-90">
            С +{formatEuro(extra)}/нед
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight tabular-nums">
            {left > 0 ? addDays(fastDays) : "уже собрано"}
          </p>
          <p className={`mt-1 text-xs font-bold ${effect?.tone ?? "text-white/80"}`}>
            {effect?.label ?? "подвигай ползунок →"}
          </p>
        </div>
      </div>
    </div>
  );
}