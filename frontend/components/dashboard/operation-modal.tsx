"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AddOperationButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"in" | "out">("in");

  return (
    <>
      <Button onClick={() => setOpen(true)}>＋ Добавить операцию</Button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-[18px] bg-card p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold">Добавить операцию</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:text-foreground"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("in")}
                className={`h-10 rounded-[10px] text-[13px] font-bold transition-colors ${
                  type === "in"
                    ? "bg-grad-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground"
                }`}
              >
                Пополнение
              </button>
              <button
                type="button"
                onClick={() => setType("out")}
                className={`h-10 rounded-[10px] text-[13px] font-bold transition-colors ${
                  type === "out"
                    ? "bg-grad-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground"
                }`}
              >
                Снятие
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Сумма
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <Input type="number" defaultValue={10_000} placeholder="Сумма" />
                  <span className="shrink-0 text-sm font-bold text-muted-foreground">
                    ₽
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Дата
                </label>
                <Input type="date" defaultValue="2026-09-17" className="mt-1.5" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">
                  Комментарий (необязательно)
                </label>
                <Input placeholder="Зарплата" className="mt-1.5" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_1.2fr] gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button onClick={() => setOpen(false)}>Добавить</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}