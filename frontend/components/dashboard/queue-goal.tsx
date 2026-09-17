import { Button } from "@/components/ui/button";
import { formatRubles } from "@/lib/format";

export type GoalStatus = "active" | "covered" | "queued";

export interface QueueGoalProps {
  order: number;
  icon: string;
  name: string;
  meta: string;
  target: number;
  saved: number;
  status: GoalStatus;
  pace?: number;
  deadline?: string;
  forecast?: string;
  cascadeNext?: string;
}

const progress = (g: QueueGoalProps) =>
  Math.max(0, Math.min(100, Math.round((g.saved / g.target) * 100)));

const statusChip: Record<GoalStatus, { label: string; cls: string }> = {
  active: { label: "успеваешь", cls: "bg-success/10 text-success" },
  covered: { label: "покрыта на 100%", cls: "bg-success/10 text-success" },
  queued: { label: "далеко", cls: "bg-warning/10 text-warning" },
};

const barFill: Record<GoalStatus, string> = {
  active: "bg-grad-primary",
  covered: "bg-success",
  queued: "bg-warning/70",
};

export function QueueGoal(g: QueueGoalProps) {
  const pct = progress(g);
  const chip = statusChip[g.status];
  const pctColor =
    g.status === "active"
      ? "text-primary"
      : g.status === "covered"
        ? "text-success"
        : "text-warning";

  return (
    <div
      className={`mb-3 rounded-[var(--radius-card)] border bg-card p-5 ${
        g.status === "active"
          ? "border-primary/50 ring-2 ring-accent"
          : "border-border"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`relative flex size-16 flex-none items-center justify-center rounded-2xl text-4xl ${
            g.status === "active" ? "bg-accent" : "bg-muted"
          }`}
        >
          <span aria-hidden="true">{g.icon}</span>
          <span
            className={`absolute -left-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full text-[11px] font-extrabold ${
              g.status === "active"
                ? "bg-grad-primary text-primary-foreground"
                : "bg-border text-muted-foreground"
            }`}
          >
            {g.order}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <div className="min-w-0">
              <p className="text-lg font-extrabold leading-tight">{g.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{g.meta}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${chip.cls}`}
            >
              {chip.label}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ${barFill[g.status]}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span
              className={`shrink-0 text-xl font-extrabold tabular-nums ${pctColor}`}
            >
              {pct}%
            </span>
          </div>

          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-muted-foreground">
            {g.status !== "covered" ? (
              <span>
                цель <b className="font-bold text-foreground">{formatRubles(g.target)}</b>
                {" "}· собрано{" "}
                <b className="font-bold text-foreground">{formatRubles(g.saved)}</b>
                {" "}· осталось{" "}
                <b className="font-bold text-foreground">
                  {formatRubles(Math.max(0, g.target - g.saved))}
                </b>
              </span>
            ) : (
              <span>
                цель <b className="font-bold text-foreground">{formatRubles(g.target)}</b>
                {" "}· собрано{" "}
                <b className="font-bold text-foreground">{formatRubles(g.saved)}</b>
              </span>
            )}
            {g.pace && (
              <span>
                темп <b className="font-bold text-foreground">{formatRubles(g.pace)}/нед</b>
              </span>
            )}
            {g.deadline && (
              <span>
                дедлайн{" "}
                <b className="font-bold text-foreground">{g.deadline}</b>
              </span>
            )}
            {g.forecast && (
              <span>
                прогноз{" "}
                <b className="font-bold text-foreground">{g.forecast}</b>
              </span>
            )}
          </div>
        </div>
      </div>

      {g.status === "active" && (
        <div className="mt-3 flex flex-col gap-2.5">
          <Button size="sm" className="self-start bg-grad-primary">
            Цель достигнута 🎉
          </Button>
          <div className="rounded-xl bg-accent/70 px-3.5 py-2.5 text-[12.5px] text-accent-foreground">
            Каскад: после закрытия цели свободный остаток{" "}
            <b>{formatRubles(g.target - g.saved)}</b> перетечёт на следующую по
            очереди — <b>«{g.cascadeNext}»</b>
          </div>
        </div>
      )}

      {g.status === "covered" && (
        <p className="mt-2.5 text-xs text-muted-foreground">
          будет наполняться после цели №1 (каскад)
        </p>
      )}
    </div>
  );
}