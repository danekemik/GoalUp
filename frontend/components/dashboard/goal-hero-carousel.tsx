"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatEuro } from "@/lib/format";
import { GoalArt } from "@/components/dashboard/goal-art";
import type { AuroraTheme } from "@/components/dashboard/aurora-background";

export type GoalStatus = "success" | "warning" | "neutral";

export interface GoalWorld {
  headerBg: string;
  accent: string;
  accentSoft: string;
  ringGlow: string;
  barGrad: string;
  buttonGrad: string;
  statusDot: string;
  statusLabel: string;
  caption: string;
  icon: string;
  aurora: AuroraTheme;
  blobs: { c: string; x: string; y: string; s: string; o?: number }[];
}

export interface HeroGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
  forecast: string;
  world: GoalWorld;
}

const GAP = 30;

interface RingProps {
  world: GoalWorld;
  pct: number;
  size?: number;
  milestone?: boolean;
}

function ProgressRing({ world, pct, size = 118, milestone = false }: RingProps) {
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      className="relative shrink-0"
      style={
        { width: size, height: size, "--ring-glow": world.ringGlow } as React.CSSProperties
      }
    >
      {milestone && (
        <span
          className="goalup-burst absolute inset-0 rounded-full"
          style={{ background: `radial-gradient(circle, ${world.accent}55 0%, transparent 70%)` }}
          aria-hidden="true"
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="goalup-ring-glow -rotate-90"
      >
        <defs>
          <linearGradient id={`${world.icon}-ringfill`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={world.accent} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(23,23,43,.08)"
          strokeWidth="14"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${world.icon}-ringfill)`}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset .9s cubic-bezier(.22,1,.36,1)" }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="text-center leading-none">
          <span className="block text-[30px] font-black tabular-nums" style={{ color: world.accent }}>
            {pct}
          </span>
          <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-widest text-foreground/50">
            %
          </span>
        </span>
      </span>
      {milestone && (
        <span
          className="absolute -right-1.5 -top-1.5 grid size-7 place-items-center rounded-full text-[13px] text-white"
          style={{ background: world.accent, boxShadow: `0 6px 16px ${world.ringGlow}` }}
          aria-hidden="true"
        >
          ✦
        </span>
      )}
    </div>
  );
}

export function GoalHeroCarousel({
  goals,
  active,
  onActiveChange,
}: {
  goals: HeroGoal[];
  active: number;
  onActiveChange: (index: number) => void;
}) {
  const [containerW, setContainerW] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const grab = useRef<{ startX: number; moved: boolean }>({ startX: 0, moved: false });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setContainerW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onActiveChange(Math.max(0, active - 1));
      if (e.key === "ArrowRight") onActiveChange(Math.min(goals.length - 1, active + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goals.length, onActiveChange]);

  const cardW = useMemo(() => {
    if (containerW <= 0) return 440;
    return containerW <= 700
      ? containerW - 28
      : Math.min(440, Math.max(300, containerW - 120));
  }, [containerW]);

  const ringSize = cardW <= 340 ? 100 : 118;

  const goPrev = () => onActiveChange(Math.max(0, active - 1));
  const goNext = () => onActiveChange(Math.min(goals.length - 1, active + 1));

  const offsetFor = (i: number): number => {
    const d = i - active;
    const dx = drag ?? 0;
    if (d === 0) return dx;
    const stepPending = cardW + GAP;
    if (d === 1) return stepPending + dx;
    if (d === -1) return -stepPending + dx;
    return d > 0 ? (d + 1) * stepPending : (d - 1) * stepPending;
  };

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
      if (dx < -60) goNext();
      else if (dx > 60) goPrev();
    }
    grab.current = { startX: 0, moved: false };
    setDrag(null);
  };
  const onPointerCancel = () => {
    grab.current = { startX: 0, moved: false };
    setDrag(null);
  };

  return (
    <div className="relative">
      <div
        ref={stageRef}
        className="relative mx-auto touch-pan-y select-none"
        style={{ height: cardW <= 340 ? 606 : 640 }}
        role="group"
        aria-roledescription="карусель"
        aria-label="Цели накопления"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {containerW > 0 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Предыдущая цель"
              disabled={active === 0}
              className="absolute z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/60 text-foreground/70 shadow-[0_14px_36px_-16px_rgba(23,23,43,.4)] backdrop-blur-md transition-all hover:-translate-y-[calc(50%+4px)] hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:grid"
              style={{ left: (containerW - cardW) / 2 - 58, top: "50%" }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Следующая цель"
              disabled={active === goals.length - 1}
              className="absolute z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/60 text-foreground/70 shadow-[0_14px_36px_-16px_rgba(23,23,43,.4)] backdrop-blur-md transition-all hover:-translate-y-[calc(50%+4px)] hover:text-foreground active:scale-95 disabled:pointer-events-none disabled:opacity-0 md:grid"
              style={{ left: (containerW + cardW) / 2 + 10, top: "50%" }}
            >
              →
            </button>
          </>
        )}
        {goals.map((g, i) => {
          const dist = Math.abs(i - active);
          const isActive = i === active;
          const pct = Math.round((g.saved / g.target) * 100);
          const left = Math.max(0, g.target - g.saved);
          const milestone = pct >= 75;
          const visibleDuringDrag = drag !== null && dist === 1;

          return (
            <div
              key={g.id}
              className="absolute left-1/2 top-0"
              style={{
                width: cardW,
                marginLeft: -cardW / 2,
                transform: `translateX(${offsetFor(i)}px) scale(${isActive ? 1 : 0.86})`,
                opacity: isActive || visibleDuringDrag ? 1 : 0,
                transition:
                  drag === null
                    ? "transform .65s cubic-bezier(.22,1,.36,1), opacity .45s ease"
                    : "none",
                zIndex: isActive ? 3 : dist === 1 ? 2 : 1,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <article
                className="relative h-full overflow-hidden rounded-[36px] border border-white/70 bg-white shadow-[0_50px_110px_-38px_rgba(23,23,43,.5)] transition-shadow duration-500 hover:shadow-[0_60px_130px_-34px_rgba(23,23,43,.56)]"
                style={{ height: cardW <= 340 ? 606 : 640 }}
              >
                <div
                  className="goalup-animate-gradient relative overflow-hidden"
                  style={{
                    background: g.world.headerBg,
                    backgroundSize: "170% 170%",
                    height: cardW <= 340 ? 210 : 252,
                  }}
                >
                  {g.world.blobs.map((b, bi) => (
                    <span
                      key={bi}
                      className={`absolute rounded-full blur-2xl ${bi % 2 === 0 ? "goalup-float-slow" : ""}`}
                      style={{
                        width: b.s,
                        height: b.s,
                        left: b.x,
                        top: b.y,
                        background: b.c,
                        opacity: b.o ?? 0.55,
                      }}
                      aria-hidden="true"
                    />
                  ))}

                  <div className="absolute inset-0 grid place-items-center pb-2">
                    <GoalArt id={g.id} />
                  </div>

                  <span
                    className="absolute left-5 top-5 grid size-12 place-items-center rounded-2xl border border-white/40 bg-white/20 text-2xl shadow-lg backdrop-blur-md"
                    aria-hidden="true"
                  >
                    {g.world.icon}
                  </span>
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/20 px-3 py-1.5 text-[11px] font-extrabold text-white shadow-sm backdrop-blur-md">
                    <span className={`size-1.5 rounded-full ${g.world.statusDot} animate-pulse-dot`} />
                    {g.world.statusLabel}
                  </span>

                  <span
                    className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[115%] -translate-x-1/2 rounded-[50%] bg-white/90 blur-2xl"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative flex flex-col p-6 sm:p-7" style={{ height: cardW <= 340 ? 396 : 388 }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-[22px] font-black tracking-tight sm:text-[24px]">
                        {g.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] font-semibold leading-snug text-foreground/55">
                        {g.world.caption}
                      </p>
                    </div>
                    <ProgressRing world={g.world} pct={pct} size={ringSize} milestone={milestone} />
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-widest text-foreground/55">
                        Накоплено
                      </p>
                      <p className="mt-1 text-2xl font-black tabular-nums tracking-tight sm:text-[26px]">
                        {formatEuro(g.saved)}
                      </p>
                    </div>
                    <p className="text-right text-sm leading-5 text-foreground/55">
                      Цель
                      <span className="block text-lg font-black tabular-nums text-foreground">
                        {formatEuro(g.target)}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="h-4 w-full overflow-hidden rounded-full bg-foreground/[.06]">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${pct}%`,
                          background: g.world.barGrad,
                          boxShadow: `0 0 20px ${g.world.ringGlow}`,
                        }}
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs font-semibold">
                      <span className="text-foreground/55">
                        Осталось{" "}
                        <b className="text-foreground tabular-nums">{formatEuro(left)}</b>
                      </span>
                      <span className="text-foreground/55">до {g.forecast}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-auto h-[52px] w-full rounded-2xl pt-px text-[16px] font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_var(--btn-glow)] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={
                      {
                        background: g.world.buttonGrad,
                        boxShadow: `0 16px 36px -16px ${g.world.ringGlow}`,
                        "--btn-glow": g.world.ringGlow,
                      } as React.CSSProperties
                    }
                  >
                    ＋ Добавить операцию
                  </button>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        {goals.map((g, i) => (
          <button
            key={g.id}
            type="button"
            aria-label={`Показать цель «${g.name}»`}
            onClick={() => onActiveChange(i)}
            className={`relative h-2.5 rounded-full transition-all duration-300 focus-visible:h-3.5 ${
              i === active ? "w-9" : "w-2.5 opacity-35 hover:opacity-70"
            }`}
            style={
              i === active
                ? { background: g.world.barGrad, boxShadow: `0 0 14px ${g.world.ringGlow}` }
                : { background: "rgba(23,23,43,.3)" }
            }
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-semibold text-foreground/50" aria-hidden="true">
        листай стрелками · свайпом или перетаскиванием
      </p>

      <div className="sr-only" aria-live="polite">
        Активная цель: {goals[active].name} —{" "}
        {Math.round((goals[active].saved / goals[active].target) * 100)}% накоплено.
      </div>
    </div>
  );
}