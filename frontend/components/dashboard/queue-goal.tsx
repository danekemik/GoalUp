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

export function QueueGoal(g: QueueGoalProps) {
  const pct = progress(g);
  const chip = statusChip[g.status];

  return (
    <div
      className={`mb-3 rounded-[var(--radius-card)] border bg-card p-4 ${
        g.status === "active"
          ? "border-primary/50 ring-2 ring-accent"
          : "border-border"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`flex size-8 flex-none items-center justify-center rounded-full text-[13px] font-extrabold ${
            g.status === "active"
              ? "bg-grad-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {g.order}
        </span>
        <span className="text-xl">{g.icon}</span>
        <span className="min-w-0">
          <span className="block text-[15px] font-extrabold">{g.name}</span>
          <span className="block text-xs text-muted-foreground">{g.meta}</span>
        </span>
        <span className="ml-auto">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${chip.cls}`}
          >
            {chip.label}
          </span>
        </span>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            g.status === "queued" ? "bg-grad-primary" : "bg-success"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[12.5px] text-muted-foreground">
        <span>
          цель <b className="text-foreground">{formatRubles(g.target)}</b>
          {g.status !== "covered" && (
            <>
              {" "}
              · собрано <b className="text-foreground">{formatRubles(g.saved)}</b>
              {" "}
              · осталось{" "}
              <b className="text-foreground">
                {formatRubles(Math.max(0, g.target - g.saved))}
              </b>
            </>
          )}
        </span>
        {g.forecast && <span>прогноз <b className="text-foreground">{g.forecast}</b></span>}
        {g.status === "active" && (
          <Button size="sm" className="bg-grad-primary">
            Цель достигнута 🎉
          </Button>
        )}
      </div>

      {g.status === "covered" && (
        <p className="mt-2 text-xs text-muted-foreground">
          будет наполняться после цели №1 (каскад)
        </p>
      )}

      {g.status === "active" && (
        <div className="mt-3 rounded-xl bg-accent/70 px-3.5 py-2.5 text-[12.5px] text-accent-foreground">
          Каскад: после закрытия цели свободный остаток{" "}
          <b>{formatRubles(g.target - g.saved)}</b> перетечёт на следующую по
          очереди — <b>«{g.cascadeNext}»</b>
        </div>
      )}
    </div>
  );
}