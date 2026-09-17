import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { BalanceChart } from "@/components/dashboard/balance-chart";

export default function DesignPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Выбор визуального направления
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Варианты дизайна
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Переключите тему в шапке и посмотрите, как выглядят основные
            элементы. Палитра и скругления заданы CSS-токенами, поэтому выбранный
            вариант легко дорабатывается.
          </p>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Средства</CardTitle>
              <p className="text-xs text-muted-foreground">Карточки-показатели</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">Сейчас в кошельке</p>
                <p className="text-xl font-extrabold">216 000 ₽</p>
              </div>
              <div className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">Всего накоплено</p>
                <p className="text-xl font-extrabold">216 000 ₽</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Прогресс и статусы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium">MacBook Pro</span>
                  <span className="text-muted-foreground">100%</span>
                </div>
                <Progress value={100} />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="font-medium">Подушка безопасности</span>
                  <span className="text-muted-foreground">64%</span>
                </div>
                <Progress value={64} />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Активная
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Покрыта
                </span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Почти успеваю
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Формы и действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Сумма</label>
                <Input placeholder="20000" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button>Пополнить</Button>
                <Button variant="secondary">Новая цель</Button>
                <Button variant="danger">Удалить</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>График баланса</CardTitle>
          </CardHeader>
          <CardContent>
            <BalanceChart />
          </CardContent>
        </Card>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Определитесь с вариантом — отметьте его здесь или просто скажите, и я
          зафиксирую выбор в <Link href="/" className="underline">документации</Link>.
        </p>
      </main>
    </>
  );
}