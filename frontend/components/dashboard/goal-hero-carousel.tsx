"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { formatRubles } from "@/lib/format";

export type GoalState = "ahead" | "onTime" | "push";

export interface HeroGoal {
  id: string;
  emoji: string;
  name: string;
  target: number;
  saved: number;
  state: GoalState;
  stateLabel: string;
  forecast: string;
  gradient: string;
  accent: string;
  glow: string;
  shape: string;
}

const CARD = 340;
const GAP = 28;

const stateChip: Record<GoalState, string> = {
  ahead: "bg-emerald-500/15 text-emerald-600 ring-emerald-500/30",
  onTime: "bg-amber-500/15 text-amber-600 ring-amber-500/30",
  push: "bg-rose-500/15 text-rose-600 ring-rose-500/30",
};

function ProgressRing({ pct, accent, size = 88 }: { pct: number; accent: string; size?: number }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,0,0,.07)" strokeWidth="8" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        style={{ transition: "stroke-dashoffset .7s ease" }}
      />
    </svg>
  );
}

export function GoalHeroCarousel({ goals }: { goals: HeroGoal[] }) {
  const [active, setActive] = useState(0);
  const [containerW, setContainerW] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const grab = useRef<{ startX: number; moved: boolean }>({ startX: 0, moved: false });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setContainerW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = active * (CARD + GAP);
  const baseShift = Math.max(0, containerW / 2 - CARD / 2);
  const trackStyle = {
    transform: `translateX(${baseShift - step + (drag ?? 0)}px)`,
    transition: drag === null ? "transform .55s cubic-bezier(.22,1,.36,1)" : "none",
  } as const;

  const onClickDelta = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => Math.min(goals.length - 1, Math.max(0, a + dir))),
    [goals.length],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    grab.current = { startX: e.clientX, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (grab.current.startX === 0) return;
    const dx = e.clientX - grab.current.startX;
    if (Math.abs(dx) > 6) grab.current.moved = true;
    setDrag(dx);
  };
  const onPointerUp = () => {
    const dx = drag ?? 0;
    if (grab.current.moved) {
      if (dx < -70) onClickDelta(1);
      else if (dx > 70) onClickDelta(-1);
    }
    grab.current = { startX: 0, moved: false };
    setDrag(null);
  };
  const onPointerCancel = () => {
    grab.current = { startX: 0, moved: false };
    setDrag(null);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Карусель целей
          </p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Куда копишь
          </h2>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => onClickDelta(-1)}
            aria-label="Назад"
            className="grid size-10 place-items-center rounded-full border border-border bg-card/80 text-lg text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground disabled:opacity-40"
            disabled={active === 0 && !drag}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => onClickDelta(1)}
            aria-label="Вперёд"
            className="grid size-10 place-items-center rounded-full bg-grad-primary text-lg text-primary-foreground shadow-[0_10px_24px_-8px_rgba(124,58,237,.6)] transition-opacity hover:opacity-90 disabled:opacity-40"
            disabled={active === goals.length - 1 && !drag}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="mt-7 w-full touch-pan-y select-none overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className="flex items-center"
          style={{ ...trackStyle, width: `max-content` }}
        >
          {goals.map((g, i) => {
            const dist = Math.abs(i - active);
            const pct = Math.round((g.saved / g.target) * 100);
            const left = Math.max(0, g.target - g.saved);
            const isActive = i === active;
            return (
              <div
                key={g.id}
                className="flex-none"
                style={{
                  marginRight: GAP,
                  transform: `scale(${1 - Math.min(dist, 2) * 0.055})`,
                  opacity: isActive ? 1 : dist === 1 ? 0.5 : 0.18,
                  transition: "transform .55s cubic-bezier(.22,1,.36,1), opacity .55s ease",
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <article
                  className={`relative overflow-hidden rounded-[30px] border border-white/70 bg-card shadow-[0_30px_60px_-30px_rgba(80,30,180,.35)] ${isActive ? "" : "grayscale-[35%]"}`}
                  style={{ width: CARD }}
                >
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${g.gradient}`}>
                    <span className="absolute -right-10 -top-12 size-44 rounded-full bg-white/20 blur-2xl" />
                    <span className="absolute -left-12 bottom-0 size-36 rounded-full bg-black/15 blur-xl" />
                    <span className={`absolute inset-6 rounded-[24px] border ${g.shape}`} />
                    <span className="absolute right-10 top-6 text-[15rem] font-black leading-none opacity-[.18]">
                      {g.emoji}
                    </span>
                    <span
                      className="absolute left-5 top-5 grid size-14 place-items-center rounded-2xl border border-white/40 bg-white/25 text-3xl backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      {g.emoji}
                    </span>
                    <span
                      className={`absolute right-5 top-5 rounded-full px-2.5 py-1 text-[11px] font-extrabold ring-1 backdrop-blur ${stateChip[g.state]}`}
                    >
                      {g.stateLabel}
                    </span>
                    <span className={`absolute -bottom-3 -right-3 rounded-full p-4 ${g.glow}`} />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-xl font-extrabold tracking-tight">
                          {g.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          до {g.forecast}
                        </p>
                      </div>
                      <ProgressRing pct={pct} accent={g.accent} />
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                          Накоплено
                        </p>
                        <p className="text-2xl font-extrabold tabular-nums tracking-tight">
                          {formatRubles(g.saved)}
                        </p>
                      </div>
                      <p className="text-right text-sm leading-5 text-muted-foreground">
                        Цель
                        <span className="block font-extrabold text-foreground tabular-nums">
                          {formatRubles(g.target)}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-muted/40 px-3.5 py-2.5">
                      <span className="text-xs text-muted-foreground">
                        Осталось
                      </span>
                      <span className="text-sm font-extrabold tabular-nums text-foreground">
                        {formatRubles(left)}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {goals.map((g, i) => (
          <button
            key={g.id}
            type="button"
            aria-label={`Цель ${g.name}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-8 bg-grad-primary"
                : "w-2 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}