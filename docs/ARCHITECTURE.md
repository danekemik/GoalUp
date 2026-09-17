# GoalUp Architecture

## Общая схема

```text
Пользователь
    ↓ HTTPS
Frontend: Next.js + React + TypeScript   (Vercel, app.<домен>)
    ↓ HTTPS / REST API / JSON
Backend: Python + FastAPI                 (Render, api.<домен>)
    ↓ SQL
PostgreSQL                                (Neon)
```

## Принципы

- Modular monolith: domain-модули `auth`, `users`, `wallet`, `goals`, `allocations`, `calculations`, `statistics`, `notifications`, `achievements`.
- Backend — источник истины для баланса, покрытия, прав и прогноза. Frontend только отображает результат и делает мгновенную валидацию форм.
- Расчёты вынесены в отдельные модули (`allocations`, `calculations`) и покрыты unit-тестами.
- Frontend проксирует `/api/*` на backend через `next.config.ts` (rewrites) при разработке.

## Backend (Python/FastAPI)

```
backend/
├── app/
│   ├── main.py            # FastAPI app, CORS
│   ├── core/
│   │   ├── config.py      # pydantic-settings
│   │   ├── database.py    # SQLAlchemy engine/session
│   │   └── security.py    # auth (Этап 2)
│   ├── api/
│   │   ├── router.py      # сборка маршрутов
│   │   └── v1/            # маршруты версии API
│   ├── auth/ users/ wallet/ goals/ allocations/
│   │   calculations/ statistics/ notifications/ achievements/
│   ├── models/ schemas/ repositories/ services/
├── migrations/            # Alembic
└── tests/                 # unit/, integration/, fixtures/
```

Слои: маршруты (api) → сервисы (бизнес-логика) → репозитории (доступ к данным) → модели.

## Frontend (Next.js)

```
frontend/
├── app/
│   ├── (public)/       # landing, design
│   ├── (auth)/         # login, register
│   └── (dashboard)/    # приложение: /dashboard
├── components/
│   ├── ui/             # button, card, input, progress, logo
│   ├── auth/ wallet/ goals/ dashboard/
│   ├── theme/          # темы (Mint / Pulse / Amber)
│   └── layout/
├── lib/                # утилиты (форматирование)
├── services/           # клиент API (Этап 2+)
└── types/              # типы домена
```

## Темы

Визуальные варианты — CSS-токены (`--color-*`, `--radius`) в `app/globals.css` и переключатель `data-theme` на `<html>`. Выбор фиксируется в `docs/DECISIONS.md` (D-011).

## Инфраструктура

- Локально: Docker Compose (PostgreSQL), `backend` на 8000, `frontend` на 3000.
- Прод: Vercel + Render + Neon, поддомены `app.` / `api.`.
- CI: не настроен (Этап 1, решение D-013); добавляется позже.