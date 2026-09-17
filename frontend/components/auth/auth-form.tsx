"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const isLogin = mode === "login";

  return (
    <Card className="w-full max-w-md p-6">
      <CardContent className="p-0">
        <h1 className="text-2xl font-bold tracking-tight">
          {isLogin ? "Вход в GoalUp" : "Создать аккаунт"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isLogin
            ? "С возвращением! Рады видеть ваши накопления."
            : "Один кошелёк и приоритетная очередь целей — бесплатно."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">Имя</label>
              <Input name="name" placeholder="Как вас зовут?" autoComplete="name" required />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Пароль</label>
            <Input
              name="password"
              type="password"
              placeholder="Минимум 8 символов"
              autoComplete={isLogin ? "current-password" : "new-password"}
              minLength={8}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            {isLogin ? "Войти" : "Создать аккаунт"}
          </Button>
        </form>

        {submitted && (
          <p className="mt-4 rounded-xl bg-accent px-4 py-3 text-sm text-accent-foreground">
            Авторизация появится на этапе Authentication. Сейчас форма — только
            визуальная часть.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Нет аккаунта?{" "}
              <Link href="/register" className="font-semibold text-primary">
                Зарегистрироваться
              </Link>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <Link href="/login" className="font-semibold text-primary">
                Войти
              </Link>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}