"use client";

import { useState } from "react";
import { formatRubles } from "@/lib/format";

const MONTHS = [
  "янв", "фев", "мар", "апр", "май", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];

function addMonths(months: number) {
  const d = new Date();
  const m = d.getMonth() + months;
  return `${MONTHS[m % 12]} ${d.getFullYear() + Math.floor(m / 12)}`;
}

export function WhatIf({
  goalName,
  target,
  saved,
  pace,
}: {
  goalName: string;
  target: number;
  saved: number;
  pace: number;
}) {
  const [extra, setExtra] = useState(4000);

  const left = Math.max(0, target - saved);
  const baseMonths = Math.max(1, Math.ceil(left / pace));
  const fastMonths = Math.max(1, Math.ceil(left / (pace + extra)));

  const monthsSaved = baseMonths - fastMonths;

  const effect =
    extra <= 0
      ? null
      : monthsSaved <= 0
        ? { label: "без изменений", tone: "text-white/80" }
        : {
            label: monthsSaved > 1 ? `раньше на ${monthsSaved} мес` : "на месяц раньше",
            tone: "text-white",
          };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-card p-6 shadow-[0_30px_60px_-30px_rgba(80,30,180,.25)] sm:p-8">
      <span className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
      <span className="absolute -bottom-24 -left-10 size-44 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
        Интерактив
      </p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Что если?
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Добавь к ежемесячному темпу ещё немного — и посмотри, как ускорится цель
        «{goalName}».
      </p>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <label
            htmlFor="whatif"
            className="text-sm font-bold text-muted-foreground"
          >
            Дополнительно в месяц
          </label>
          <span className="rounded-xl bg-grad-primary px-3 py-1 text-sm font-extrabold text-primary-foreground tabular-nums">
            +{formatRubles(extra)}
          </span>
        </div>
        <input
          id="whatif"
          type="range"
          min={0}
          max={20000}
          step={1000}
          value={extra}
          onChange={(e) => setExtra(Number(e.target.value))}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[var(--primary)]"
        />
        <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
          <span>0 ₽</span>
          <span>+20 000 ₽</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Текущий темп · {formatRubles(pace)}
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight tabular-nums">
            {addMonths(baseMonths)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">~ через {baseMonths} мес</p>
        </div>
        <div className="rounded-2xl bg-grad-primary p-4 text-primary-foreground shadow-[0_16px_36px_-18px_rgba(124,58,237,.7)]">
          <p className="text-xs font-bold uppercase tracking-wide opacity-90">
            С +{formatRubles(extra)}/мес
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight tabular-nums">
            {addMonths(fastMonths)}
          </p>
          <p className={`mt-1 text-xs font-bold ${effect?.tone ?? "text-white/80"}`}>
            {effect?.label ?? "подвигай ползунок →"}
          </p>
        </div>
      </div>
    </div>
  );
}