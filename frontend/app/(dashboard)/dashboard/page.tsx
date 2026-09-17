import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QueueGoal, type QueueGoalProps } from "@/components/dashboard/queue-goal";
import { WalletSummary } from "@/components/dashboard/wallet-summary";
import { formatRubles } from "@/lib/format";

const wallet = {
  balance: 216_000,
  saved: 216_000,
  delta30: 8_000,
};

const goals: QueueGoalProps[] = [
  {
    order: 1,
    icon: "🛟",
    name: "Подушка безопасности",
    meta: "порядок №1 · активная цель",
    target: 300_000,
    saved: 192_000,
    status: "active",
    pace: 9_000,
    deadline: "10 дек 2026",
    forecast: "к 1 дек",
    cascadeNext: "Отпуск в Грузии",
  },
  {
    order: 2,
    icon: "🏖️",
    name: "Отпуск в Грузии",
    meta: "порядок №2 · в ожидании каскада",
    target: 120_000,
    saved: 120_000,
    status: "covered",
  },
  {
    order: 3,
    icon: "🚗",
    name: "Автомобиль",
    meta: "порядок №3 · в очереди",
    target: 1_800_000,
    saved: 0,
    status: "queued",
    forecast: "янв 2029",
  },
];

const operations = [
  { label: "Пополнение", amount: 8_000, kind: "in" },
  { label: "Снятие · такси", amount: -3_000, kind: "out" },
  { label: "Завершение · Отпуск", amount: -120_000, kind: "complete" },
  { label: "Завершение · MacBook", amount: -96_000, kind: "complete" },
];

function StatCard({ k, v, d }: { k: string; v: string; d: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{k}</p>
        <p className="mt-1.5 text-[22px] font-extrabold tracking-tight tabular-nums">{v}</p>
        <p className="mt-1.5 text-xs font-bold text-muted-foreground">{d}</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const freeRemainder = wallet.balance - 192_000;

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold text-muted-foreground">Главная</p>
          <Button>＋ Пополнить</Button>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
          Привет, Даня! 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          В кошельке {formatRubles(wallet.balance)}. Остаток каскада пойдёт на
          активную цель.
        </p>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            k="Кошелёк сейчас"
            v={formatRubles(wallet.balance)}
            d={`${formatRubles(wallet.delta30, true)} за 30 дней`}
          />
          <StatCard k="Активная цель" v="1" d="из 3 в очереди" />
          <StatCard k="Свободный остаток" v={formatRubles(freeRemainder)} d="идёт на активную" />
          <StatCard k="Ближайший дедлайн" v="10.12" d="успеваешь" />
        </section>

        <div className="mt-7 flex items-center justify-between">
          <h2 className="text-base font-extrabold tracking-tight">Очередь целей</h2>
          <span className="text-[13px] font-bold text-primary">
            Как работает очередь →
          </span>
        </div>

        <section className="mt-3">
          {goals.map((g) => (
            <QueueGoal key={g.order} {...g} />
          ))}
        </section>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Демо-данные. Подключение к API — на этапе Foundation.
        </p>
      </div>

      <aside className="space-y-4">
        <WalletSummary
          label="Всего накоплено"
          value={formatRubles(wallet.saved)}
          delta={`${formatRubles(wallet.delta30, true)} за 30 дней`}
        />

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-extrabold">Последние операции</h3>
            <div>
              {operations.map((op, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border py-2 text-[12.5px] last:border-0"
                >
                  <span className="text-foreground">{op.label}</span>
                  <span
                    className={`font-extrabold tabular-nums ${
                      op.kind === "in"
                        ? "text-success"
                        : op.kind === "complete"
                          ? "text-primary"
                          : "text-danger"
                    }`}
                  >
                    {formatRubles(op.amount, true)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="border-dashed border-border p-4 text-xs leading-relaxed text-muted-foreground">
            <p className="mb-1 font-bold text-foreground">Правило каскада.</p>
            Все пополнения автоматически добегают до ближайшей незакрытой цели.
            Порядок меняется перетаскиванием. Снятие — только в пределах
            кошелька.
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}