"use client";

import { useRef } from "react";
import { formatRubles } from "@/lib/format";

export type CarouselGoalStatus = "active" | "covered" | "queued";

export interface CarouselGoal {
  order: number;
  icon: string;
  name: string;
  target: number;
  saved: number;
  status: CarouselGoalStatus;
  deadline?: string;
  forecast?: string;
}

const pct = (g: CarouselGoal) =>
  Math.max(0, Math.min(100, Math.round((g.saved / g.target) * 100)));

const chip: Record<CarouselGoalStatus, { label: string; cls: string }> = {
  active: { label: "успеваешь", cls: "bg-success/10 text-success" },
  covered: { label: "покрыта", cls: "bg-success/10 text-success" },
  queued: { label: "в очереди", cls: "bg-warning/10 text-warning" },
};

const barFill: Record<CarouselGoalStatus, string> = {
  active: "bg-grad-primary",
  covered: "bg-success",
  queued: "bg-warning/70",
};

const pctColor: Record<CarouselGoalStatus, string> = {
  active: "text-primary",
  covered: "text-success",
  queued: "text-warning",
};

function GoalCard({ g }: { g: CarouselGoal }) {
  const done = g.status === "covered";
  const rest = Math.max(0, g.target - g.saved);
  const when = done ? "цель закрыта ✓" : g.deadline ? `до ${g.deadline}` : g.forecast ? `прогноз ${g.forecast}` : undefined;

  return (
    <div
      className={`flex aspect-square w-[340px] flex-none snap-start flex-col rounded-[var(--radius-card)] border bg-card p-6 ${
        g.status === "active" ? "border-primary/50 ring-2 ring-accent" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex size-6 items-center justify-center rounded-full text-[12px] font-extrabold ${
            g.status === "active"
              ? "bg-grad-primary text-primary-foreground"
              : "bg-border text-muted-foreground"
          }`}
        >
          {g.order}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${chip[g.status].cls}`}>
          {chip[g.status].label}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center py-2">
        <span
          className={`flex size-36 items-center justify-center rounded-[26px] text-8xl ${
            g.status === "active" ? "bg-accent" : "bg-muted"
          }`}
          aria-hidden="true"
        >
          {g.icon}
        </span>
      </div>

      <p className="truncate text-lg font-extrabold leading-tight">{g.name}</p>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ${barFill[g.status]}`}
            style={{ width: `${pct(g)}%` }}
          />
        </div>
        <span className={`shrink-0 text-lg font-extrabold tabular-nums ${pctColor[g.status]}`}>
          {pct(g)}%
        </span>
      </div>

      <p className="mt-3 text-sm font-bold tabular-nums">
        {formatRubles(g.saved)} <span className="font-semibold text-muted-foreground">из {formatRubles(g.target)}</span>
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {done ? (when ?? "") : `осталось ${formatRubles(rest)}${when ? ` · ${when}` : ""}`}
      </p>

      {g.status === "active" && (
        <button
          type="button"
          className="mt-4 h-11 w-full rounded-xl bg-grad-primary text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Цель достигнута 🎉
        </button>
      )}
    </div>
  );
}

export function GoalCarousel({ goals }: { goals: CarouselGoal[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * 270, behavior: "smooth" });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold tracking-tight">Очередь целей</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Назад"
            className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Вперёд"
            className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {goals.map((g) => (
          <GoalCard key={g.order} g={g} />
        ))}
      </div>
    </div>
  );
}