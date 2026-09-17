import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const demoGoals = [
  { name: "MacBook Pro", sum: "96 000 ₽", percent: 100, done: true },
  { name: "Отпуск в Грузии", sum: "120 000 ₽", percent: 100, done: true },
  { name: "Подушка безопасности", sum: "300 000 ₽", percent: 64, done: false },
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <section className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              Goal-oriented finance · простая финансовая цель
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Копите в одном месте.
              <br />
              Достигайте целей{" "}
              <span className="text-primary">по очереди</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Пополняйте общий кошелёк, а GoalUp по приоритету закрывает ваши
              цели: показывает, сколько накоплено, какой темп нужен и когда цель
              будет достигнута.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/register">
                <Button size="lg">Начать бесплатно</Button>
              </Link>
              <Link href="/design">
                <Button size="lg" variant="secondary">
                  Посмотреть дизайн
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Card className="p-6">
              <CardContent className="p-0">
                <p className="text-sm font-medium text-muted-foreground">
                  Сейчас в кошельке
                </p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight">
                  216 000 ₽
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Всего накоплено: <span className="font-semibold">216 000 ₽</span>
                </p>
                <div className="mt-6 space-y-5">
                  {demoGoals.map((g) => (
                    <div key={g.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{g.name}</span>
                        <span className="text-muted-foreground">
                          {g.percent === 100 ? "✓ закрыта" : `${g.percent}% · ${g.sum}`}
                        </span>
                      </div>
                      <Progress value={g.percent} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Один кошелёк, приоритетная очередь
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Деньги копятся в одном месте и распределяются по целям по порядку:
            сначала закрывается главное, потом — следующее.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Пополняйте вручную",
                text: "Вносите суммы, когда удобно. Никаких банков и подключений.",
              },
              {
                title: "Следите за прогрессом",
                text: "Каждая цель показывает процент покрытия — понятно, что уже сделано.",
              },
              {
                title: "Успевайте к дедлайну",
                text: "Честный прогноз и нужный темп: откладывайте столько, чтобы успеть.",
              },
            ].map((f) => (
              <Card key={f.title} className="p-6">
                <CardContent className="p-0">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-20 text-center">
          <p className="text-sm text-muted-foreground">
            Суммы вводятся вручную и не подтверждают наличие денег на счете.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 GoalUp</span>
          <span>Копите на важное — по одной цели за раз.</span>
        </div>
      </footer>
    </>
  );
}