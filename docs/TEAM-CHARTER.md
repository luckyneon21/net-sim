# TEAM CHARTER — net-sim v1.0

> Дата: 2026-11-18

## 1. Состав команды

| Роль | Агент | Пакеты |
|------|-------|--------|
| **chief** | Kimi №1 | `packages/contracts` (только chief), `packages/sim-core` (только chief), `docs/DECISIONS.md`, golden-master harness |
| **sub-A** | Kimi №2 | `packages/client` — React SPA, Canvas, HUD, Wireshark-lite |
| **sub-B** | ChatGPT | `packages/server` — Gateway, Worker, WebSocket, Docker Compose |

## 2. Структура репозитория

```
repo/
├── packages/
│   ├── contracts/      # JSON-схемы, типы WS-сообщений, снапшотов, Action — ТОЛЬКО chief
│   ├── sim-core/       # Движок симуляции — ТОЛЬКО chief
│   ├── client/         # React SPA — sub-A
│   └── server/         # Gateway + Worker — sub-B
├── docs/               # Архитектурный документ, хартия, журнал решений
├── docker-compose.yml
└── package.json        # npm workspaces / Turborepo
```

- TypeScript strict во всех пакетах.
- Общие зависимости через `@net-sim/contracts` и `@net-sim/sim-core`.

## 3. Технические ограничения

1. **Детерминизм:** `mulberry32` — единственный источник случайности. Запрет `Math.random()` и `Date.now()` внутри `sim-core`.
2. **Целевая частота:** 20 тиков/с (50 мс на тик), 2 мс CPU-time на тик.
3. **Капасити:** 31 устройство + 10 сессий на один worker.
4. **Транспорт:** WebSocket + MessagePack (fallback JSON), heartbeat 5 с.
5. **Хранилище:** PostgreSQL 16 (состояние), Redis 7 (pub/sub, mapping).
6. **1 worker = 1 сессия**.

## 4. План спринтов (MVP)

| Спринт | Содержание | Владелец |
|--------|-----------|----------|
| 1 | `sim-core` скелет, CLI golden-master harness | chief |
| 2 | ARP + ICMP, MAC-таблицы, ping | chief |
| 3 | VLAN 802.1Q | chief |
| 4 | IP/VLAN, client ping | sub-A |
| 5 | DHCP | chief |
| 6 | RIP | chief |
| 7 | OSPF | chief |
| 8 | NAT + DNS + ACL | chief |
| 9 | Интеграция, нагрузка 10 000 ping | все |

## 5. Definition of Done (DoD)

- `tsc --strict` проходит без ошибок.
- Без `as any` и `@ts-ignore`.
- Unit-тесты зелёные.
- Документация в `docs/` (если меняется архитектура).
- PR в `main` с описанием.

## 6. Процесс принятия решений

- Chief владеет `docs/DECISIONS.md`.
- Если sub-A или sub-B хотят поменять контракт (`packages/contracts`) — через PR к chief.
- Chief апрувит и пишет решение в `DECISIONS.md`.

## 7. Стиль кода

- ESLint + Prettier.
- Conventional Commits.
- PR обязателен для любого изменения.
