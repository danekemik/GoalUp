# GoalUp API

REST API, JSON, префикс `/api/v1`. Контракт описан в `PROJECT_SPEC.md` (§10).

- Единый формат ошибок: `{"detail": "..."}` с корректным HTTP-кодом.
- Приватные маршруты требуют авторизации (JWT в httpOnly cookie).
- Объекты проходят object-level authorization.
- Суммы — целые рубли (RUB).

## Health

`GET /api/v1/health`

```json
{ "status": "ok", "app": "GoalUp API", "env": "development" }
```

## Статус реализации

| Группа | Статус | Этап |
| --- | --- | --- |
| Health | ✅ реализовано | 1 — Foundation |
| Auth | ⏳ запланировано | 2 — Authentication |
| Wallet | ⏳ запланировано | 4 — Wallet |
| Goals | ⏳ запланировано | 3 — Goals |
| Cascade/forecast | ⏳ запланировано | 5 — Cascade and forecast |

Дочерняя OpenAPI-документация доступна после запуска backend: `http://localhost:8000/docs`.