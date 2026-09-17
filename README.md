# GoalUp

Адаптивное веб-приложение для накопления на финансовые цели: один общий кошелёк, приоритетная очередь целей и понятный прогноз.

Документация:

- [PROJECT_SPEC.md](./PROJECT_SPEC.md) — единая спецификация продукта;
- [docs/DECISIONS.md](./docs/DECISIONS.md) — журнал решений;
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — архитектура;
- [docs/API.md](./docs/API.md) — API-контракт.

## Стек

- Frontend: Next.js, React, TypeScript, Tailwind CSS (npm).
- Backend: Python, FastAPI, SQLAlchemy, Alembic (uv).
- Database: PostgreSQL.
- Локально: Docker Compose для PostgreSQL.

## Требования

- Node.js ≥ 20, npm
- Python ≥ 3.12, uv
- Docker + Docker Compose (для PostgreSQL) или локальный PostgreSQL

## Быстрый старт

```bash
# 1. Скопировать окружение
cp .env.example .env

# 2. Запустить PostgreSQL
docker compose up -d db

# 3. Backend
cd backend
uv sync
cp ../.env.example .env        # при необходимости
uv run alembic upgrade head     # когда появятся миграции
uv run uvicorn app.main:app --reload --port 8000

# 4. Frontend
cd ../frontend
npm install
npm run dev

# 5. Проверка
curl http://localhost:8000/health
```

## Переменные окружения

Минимальный набор описан в `.env.example`: подключение к БД, auth-секрет, URL frontend, CORS-источники, имя окружения, уровень логирования.

## Этап

Актуальный статус — см. раздел Roadmap в `PROJECT_SPEC.md`.