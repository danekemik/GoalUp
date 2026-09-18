import { formatEuro } from "@/lib/format";

interface Op {
  id: string;
  label: string;
  goal: string;
  date: string;
  amount: number;
  kind: "in" | "out";
}

const ops: Op[] = [
  { id: "op-1", label: "Пополнение", goal: "MacBook Pro", date: "12 сен", amount: 170, kind: "in" },
  { id: "op-2", label: "Пополнение", goal: "Отпуск в Японии", date: "9 сен", amount: 310, kind: "in" },
  { id: "op-3", label: "Пополнение", goal: "Новая машина", date: "2 сен", amount: 480, kind: "in" },
  { id: "op-4", label: "Снятие", goal: "Обучение", date: "28 авг", amount: 120, kind: "out" },
];

export function RecentOperations() {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_60px_-30px_rgba(80,30,180,.25)] backdrop-blur-xl sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Последние операции
        </h2>
        <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-[11px] font-extrabold text-violet-600">
          {ops.length}
        </span>
      </div>

      <ul className="mt-5 flex flex-col divide-y divide-border/70">
        {ops.map((op) => (
          <li key={op.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm ${
                op.kind === "in"
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-rose-500/10 text-rose-500"
              }`}
              aria-hidden="true"
            >
              {op.kind === "in" ? "↓" : "↑"}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{op.goal}</span>
              <span className="block text-[12px] text-muted-foreground">
                {op.label} · {op.date}
              </span>
            </span>
            <span
              className={`shrink-0 text-sm font-black tabular-nums ${
                op.kind === "in" ? "text-emerald-600" : "text-foreground"
              }`}
            >
              {formatEuro(op.kind === "in" ? op.amount : -op.amount, true)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}